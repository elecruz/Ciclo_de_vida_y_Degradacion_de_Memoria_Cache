import { compile } from 'mathjs';

export interface Point { x: number; y: number; }

export function solveRK4(
  derivativeEq: string, x0: number, y0: number, stepSize: number = 0.1, numSteps: number = 100
): Point[] {
  const points: Point[] = [];
  try {
    const f = compile(derivativeEq);
    let x = x0; let y = y0;
    points.push({ x, y });

    for (let i = 0; i < numSteps; i++) {
      const scope = { x, y };
      const k1 = stepSize * f.evaluate(scope);
      const k2 = stepSize * f.evaluate({ x: x + stepSize / 2, y: y + k1 / 2 });
      const k3 = stepSize * f.evaluate({ x: x + stepSize / 2, y: y + k2 / 2 });
      const k4 = stepSize * f.evaluate({ x: x + stepSize, y: y + k3 });

      y = y + (k1 + 2 * k2 + 2 * k3 + k4) / 6;
      x = x + stepSize;

      if (!isFinite(y) || isNaN(y)) break;
      points.push({ x: Number(x.toFixed(4)), y: Number(y.toFixed(4)) });
    }
  } catch (error) {
    console.error("RK4 Error:", error);
  }
  return points;
}
