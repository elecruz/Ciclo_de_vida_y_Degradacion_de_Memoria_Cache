import { validateEquationSyntax, normalizeDerivative } from './math-engine';
import { solveRK4, Point } from './solver';

export interface SimulationResult { success: boolean; data: Point[]; error?: string; }

export function runSimulation(equation: string, x0: number, y0: number): SimulationResult {
  if (!validateEquationSyntax(equation)) {
    return { success: false, data: [], error: "Sintaxis de ecuación inválida." };
  }
  const normalizedEq = normalizeDerivative(equation);
  const points = solveRK4(normalizedEq, x0, y0, 0.1, 50);
  return { success: true, data: points };
}
