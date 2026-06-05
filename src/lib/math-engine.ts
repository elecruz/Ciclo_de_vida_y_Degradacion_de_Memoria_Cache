import { parse } from 'mathjs';

export function validateEquationSyntax(equation: string): boolean {
  try {
    parse(equation);
    return true;
  } catch (error) {
    return false;
  }
}

export function normalizeDerivative(equation: string): string {
  return equation;
}
