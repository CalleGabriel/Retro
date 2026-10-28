import { useState } from 'react';

type Operator = '+' | '-' | '×' | '÷';

const MAX_DIGITS = 12;

// Redondea para evitar errores como 0.1 + 0.2 = 0.30000000000000004
const formatNumber = (value: number): string => {
  if (!Number.isFinite(value)) return 'Error';
  return String(parseFloat(value.toPrecision(12)));
};

// Agrega separadores de miles: 1234567.89 -> 1,234,567.89
const formatDisplay = (value: string): string => {
  if (value === 'Error' || value.includes('e')) return value;
  const negative = value.startsWith('-');
  const [integer, decimals] = value.replace('-', '').split('.');
  const withCommas = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${negative ? '-' : ''}${withCommas}${decimals !== undefined ? '.' + decimals : ''}`;
};

const calculate = (a: number, b: number, op: Operator): number => {
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '×': return a * b;
    case '÷': return b === 0 ? NaN : a / b;
  }
};

export function useCalculator() {
  const [current, setCurrent] = useState('0');
  const [previous, setPrevious] = useState<string | null>(null);
  const [operator, setOperator] = useState<Operator | null>(null);
  const [expression, setExpression] = useState('');
  const [overwrite, setOverwrite] = useState(false); // el próximo dígito reemplaza el valor actual
  const [waiting, setWaiting] = useState(false);     // se acaba de presionar un operador

  const isError = current === 'Error';

  const reset = () => {
    setCurrent('0');
    setPrevious(null);
    setOperator(null);
    setExpression('');
    setOverwrite(false);
    setWaiting(false);
  };

  const showError = () => {
    reset();
    setCurrent('Error');
    setOverwrite(true);
  };

  const inputDigit = (digit: string) => {
    if (overwrite || isError) {
      setCurrent(digit);
      setOverwrite(false);
      setWaiting(false);
      if (previous === null) setExpression('');
      return;
    }
    if (current === '0') {
      setCurrent(digit);
      return;
    }
    if (current.replace(/[-.]/g, '').length >= MAX_DIGITS) return;
    setCurrent(current + digit);
  };

  const inputDecimal = () => {
    if (overwrite || isError) {
      setCurrent('0.');
      setOverwrite(false);
      setWaiting(false);
      if (previous === null) setExpression('');
      return;
    }
    if (!current.includes('.')) setCurrent(current + '.');
  };

  const chooseOperator = (op: Operator) => {
    if (isError) return;

    // Si ya había un operador recién presionado, solo lo cambia
    if (waiting && previous !== null) {
      setOperator(op);
      setExpression(`${formatDisplay(previous)} ${op}`);
      return;
    }

    let base = formatNumber(parseFloat(current));

    // Encadena operaciones: 2 + 3 × ... calcula 2 + 3 primero
    if (previous !== null && operator) {
      const result = calculate(parseFloat(previous), parseFloat(current), operator);
      if (!Number.isFinite(result)) return showError();
      base = formatNumber(result);
      setCurrent(base);
    }

    setPrevious(base);
    setOperator(op);
    setExpression(`${formatDisplay(base)} ${op}`);
    setOverwrite(true);
    setWaiting(true);
  };

  const equals = () => {
    if (isError || previous === null || !operator) return;
    const b = parseFloat(current);
    const result = calculate(parseFloat(previous), b, operator);
    if (!Number.isFinite(result)) return showError();

    setExpression(`${formatDisplay(previous)} ${operator} ${formatDisplay(formatNumber(b))} =`);
    setCurrent(formatNumber(result));
    setPrevious(null);
    setOperator(null);
    setOverwrite(true);
    setWaiting(false);
  };

  // Funciones de un solo número: √, x², 1/x
  const applyUnary = (label: string, fn: (x: number) => number) => {
    if (isError) return;
    const x = parseFloat(current);
    const result = fn(x);
    if (!Number.isFinite(result)) return showError(); // raíz de negativo o 1/0

    if (!operator) setExpression(`${label}(${formatDisplay(formatNumber(x))})`);
    setCurrent(formatNumber(result));
    setOverwrite(true);
    setWaiting(false);
  };

  const percent = () => {
    if (isError) return;
    const c = parseFloat(current);
    const p = previous !== null ? parseFloat(previous) : null;
    // 200 + 10% = 200 + 20 ; en los demás casos, 10% = 0.1
    const result =
      p !== null && (operator === '+' || operator === '-') ? (p * c) / 100 : c / 100;
    setCurrent(formatNumber(result));
    setOverwrite(true);
    setWaiting(false);
  };

  const toggleSign = () => {
    if (isError || current === '0') return;
    setCurrent(current.startsWith('-') ? current.slice(1) : '-' + current);
  };

  const backspace = () => {
    if (isError || overwrite) return;
    if (current.length === 1 || (current.length === 2 && current.startsWith('-'))) {
      setCurrent('0');
    } else {
      setCurrent(current.slice(0, -1));
    }
  };

  // Único punto de entrada: la pantalla solo envía la tecla presionada
  const handlePress = (key: string) => {
    if (/^[0-9]$/.test(key)) return inputDigit(key);

    switch (key) {
      case '.': return inputDecimal();
      case '+':
      case '-':
      case '×':
      case '÷': return chooseOperator(key as Operator);
      case '=': return equals();
      case '%': return percent();
      case '√': return applyUnary('√', Math.sqrt);
      case 'x²': return applyUnary('sqr', (x) => x * x);
      case '1/x': return applyUnary('1/', (x) => 1 / x);
      case '+/-': return toggleSign();
      case '⌫': return backspace();
      case 'C': return reset();
    }
  };

  return {
    display: formatDisplay(current),
    expression,
    handlePress,
  };
}