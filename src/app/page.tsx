"use client";

import { useState, useEffect } from "react";
import MemoryChart from "../components/charts/Chart";
import { runSimulation } from "../lib/engine";

export default function Dashboard() {
  const [equation, setEquation] = useState("(3 * y^2 - x^2) / (2 * x * y)");
  const [x0, setX0] = useState<number>(1);
  const [y0, setY0] = useState<number>(2);
  const [chartData, setChartData] = useState<{x: number, y: number}[]>([]);

  const [cValue, setCValue] = useState<string>("0");
  const [isIndeterminate, setIsIndeterminate] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

 useEffect(() => {
    setIsAnalyzing(true);
    const timer = setTimeout(() => {
      // Si x e y son iguales, es la solución singular (y = x)
      if (x0 === y0) {
        setCValue("∞ (Solución Singular y=x)");
        setIsIndeterminate(false);
      } else {
        const denominator = Math.pow(y0, 2) - Math.pow(x0, 2);

        if (denominator === 0) {
          setIsIndeterminate(true);
          setCValue("∞");
          setChartData([]);
        } else {
          setIsIndeterminate(false);
          const calculatedC = Math.pow(x0, 3) / denominator;

          if (Math.abs(calculatedC - 1/3) < 0.001) {
            setCValue("1/3");
          } else {
            setCValue(calculatedC.toFixed(4));
          }
        }
      }

      // Dejamos que RK4 corra libremente SIEMPRE (incluso con 1 y 1)
      if (!isIndeterminate || x0 === y0) {
        const result = runSimulation(equation, x0, y0);
        if (result.success && result.data) {
          setChartData(result.data);
        }
      }
      setIsAnalyzing(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [equation, x0, y0]);

  return (
    <main className="min-h-screen p-4 md:p-8 max-w-[1400px] mx-auto font-sans text-white">

      <header className="mb-8 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1 mb-4 rounded-full bg-[#A3249E]/20 border border-[#A3249E]/50 text-[#A3249E] text-xs font-mono font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(163,36,158,0.4)] animate-pulse">
          <span className="w-2 h-2 rounded-full bg-[#E61C8C]"></span>
          Sintaxis Lab :: Auditoría Core
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#E61C8C] via-[#A3249E] to-[#FF5C33] mb-2 drop-shadow-lg">
          Ciclo de Vida de Memoria
        </h1>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

        {/* PANEL IZQUIERDO: Inputs y Gráfica */}
        <div className="xl:col-span-6 flex flex-col gap-6">

          <div className="bg-black/80 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-xl flex gap-4 transition-all duration-300 hover:border-[#A3249E]/50 hover:shadow-[0_0_30px_rgba(163,36,158,0.15)] group">
            <div className="flex-1 bg-white/5 p-4 rounded-xl border border-white/5 group-hover:border-[#A3249E]/30 transition-colors">
              <label className="block text-xs font-mono font-bold text-[#A3249E] mb-2 uppercase">Auditoría (x)</label>
              <input
                type="number" step="1" value={x0}
                onChange={(e) => setX0(parseFloat(e.target.value) || 0)}
                className="w-full bg-black/60 border border-[#A3249E]/30 rounded-lg p-3 text-xl font-bold text-white focus:outline-none focus:border-[#E61C8C] focus:ring-1 focus:ring-[#E61C8C] transition-all"
              />
            </div>
            <div className="flex-1 bg-white/5 p-4 rounded-xl border border-white/5 group-hover:border-[#FF5C33]/30 transition-colors">
              <label className="block text-xs font-mono font-bold text-[#FF5C33] mb-2 uppercase">Corruptos (y)</label>
              <input
                type="number" step="1" value={y0}
                onChange={(e) => setY0(parseFloat(e.target.value) || 0)}
                className="w-full bg-black/60 border border-[#FF5C33]/30 rounded-lg p-3 text-xl font-bold text-white focus:outline-none focus:border-[#FF5C33] focus:ring-1 focus:ring-[#FF5C33] transition-all"
              />
            </div>
          </div>

          <div className="bg-black/90 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl flex flex-col h-[500px] relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#E61C8C]/10 blur-[80px] pointer-events-none"></div>

            <h3 className="text-lg font-bold text-white mb-4 z-10 flex items-center justify-between">
              <span>Espacio de Estados (RK4)</span>
              {isAnalyzing && <span className="text-xs font-mono text-[#E61C8C] animate-pulse">Glitch procesando...</span>}
            </h3>

            <div className="flex-1 flex items-center justify-center z-10 w-full h-full pb-4">
              {isIndeterminate ? (
                <div className="text-center transform transition-all hover:scale-105">
                  <div className="text-[#FF5C33] text-6xl mb-4 animate-bounce">⚠️</div>
                  <h3 className="text-2xl text-[#FF5C33] font-black tracking-tight">Colapso del Sistema</h3>
                  <p className="text-slate-400 text-sm mt-2 font-mono">1 = C(0) :: Asíntota detectada</p>
                </div>
              ) : isAnalyzing ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-[#A3249E]/30 border-t-[#E61C8C] rounded-full animate-spin"></div>
                  <p className="text-[#E61C8C] font-mono text-sm animate-pulse">Calculando RK4...</p>
                </div>
              ) : chartData.length > 0 ? (
                <div className="w-full h-full relative">
                  <MemoryChart dataPoints={chartData} />
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* PANEL DERECHO: Bitácora Analítica Detallada */}
        <div className="xl:col-span-6 bg-[#050505] border border-[#E61C8C]/30 p-6 rounded-2xl shadow-[0_0_40px_rgba(230,28,140,0.1)] font-mono text-xs md:text-sm flex flex-col relative overflow-hidden group max-h-[700px]">

          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0),rgba(255,255,255,0.02),rgba(255,255,255,0))] bg-[length:100%_4px] pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity"></div>

          <h3 className="text-[#E61C8C] font-bold mb-4 flex items-center gap-3 border-b border-[#E61C8C]/20 pb-4 text-base relative z-10">
            <span className="w-3 h-3 bg-[#E61C8C] shadow-[0_0_10px_#E61C8C] animate-pulse"></span>
            Bitácora de Integración Analítica
          </h3>

          <div className="space-y-6 overflow-y-auto pr-4 flex-1 relative z-10 custom-scrollbar">

            <div className={`transition-opacity duration-500 ${isAnalyzing ? 'opacity-30' : 'opacity-100'}`}>

              <div className="mb-4">
                <p className="text-slate-500 mb-1">// 1. Sustitución Lineal y = ux</p>
                <div className="bg-white/5 p-3 rounded text-slate-300 border-l-2 border-slate-700">
                  <p>(x² - 3(ux)²)dx + 2x(ux)(udx + xdu) = 0</p>
                  <p>(x² - 3u²x²)dx + 2ux²(udx + xdu) = 0</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-slate-500 mb-1">// 2. Factorización y Separación</p>
                <div className="bg-white/5 p-3 rounded text-slate-300 border-l-2 border-slate-700">
                  <p className="text-slate-400 text-xs">Dividimos entre x²:</p>
                  <p>(1 - 3u²)dx + 2u(udx + xdu) = 0</p>
                  <p className="text-slate-400 text-xs mt-2">Agrupamos dx y du:</p>
                  <p>(1 - u²)dx + 2uxdu = 0</p>
                  <p className="text-[#A3249E] font-bold mt-2">dx/x + (2u / (1-u²))du = 0</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-slate-500 mb-1">// 3. Proceso de Integración</p>
                <div className="bg-white/5 p-3 rounded text-slate-300 border-l-2 border-slate-700">
                  <p>∫(1/x)dx = ∫(2u/(u²-1))du</p>
                  <p>ln|x| = ln|u²-1| + ln|C|</p>
                  <p className="text-slate-400 text-xs mt-2">Propiedades de logaritmos e inversa (e^x):</p>
                  <p>x = C(u² - 1)</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-[#A3249E] mb-1 font-bold">// 4. Solución General Implícita</p>
                <div className="bg-[#A3249E]/10 p-3 rounded border border-[#A3249E]/30 text-center shadow-inner">
                  <p className="text-[#A3249E] font-bold text-lg">x³ = C(y² - x²)</p>
                </div>
              </div>

              <div className="mb-6 border-t border-white/10 pt-6">
                <p className="text-[#FF5C33] mb-2 font-bold flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#FF5C33] rounded-full"></span>
                  5. Evaluación del PVI (x={x0}, y={y0})
                </p>

                <div className="bg-black/60 p-4 rounded-xl border border-[#FF5C33]/20 space-y-2">
                  <p className="text-slate-300">({x0})³ = C(({y0})² - ({x0})²)</p>
                  <p className="text-slate-300">{Math.pow(x0, 3)} = C({Math.pow(y0, 2)} - {Math.pow(x0, 2)})</p>

                  {isIndeterminate ? (
                    <div className="mt-4 p-3 bg-[#FF5C33]/20 border border-[#FF5C33]/50 rounded-lg text-[#FF5C33] animate-pulse">
                      <p className="font-bold text-sm">¡Error de Continuidad!</p>
                      <p className="text-xs mt-1">El denominador se anula (1 = C(0)). El sistema entra en zona de indeterminación matemática.</p>
                    </div>
                  ) : (
                    <>
                      <p className="text-slate-300">{Math.pow(x0, 3)} = {Math.pow(y0, 2) - Math.pow(x0, 2)}C</p>
                      <div className="flex items-center gap-4 mt-4 border-t border-white/10 pt-4">
                        <span className="text-slate-500">Valor Constante:</span>
                        <span className="text-[#E61C8C] font-black text-xl bg-[#E61C8C]/10 px-3 py-1 rounded">C = {cValue}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {!isIndeterminate && (
                <div className="animate-fade-in-up pb-4">
                  <p className="text-[#E61C8C] mb-2 font-bold">// 6. Función del Espacio de Estados</p>
                  <div className="bg-gradient-to-r from-[#E61C8C]/20 to-transparent p-4 rounded-xl border-l-4 border-[#E61C8C]">
                    <p className="text-slate-300 mb-2">Despejando "y" para el renderizado gráfico (RK4):</p>
                    {cValue === "1/3" ? (
                      <div className="space-y-1 text-white font-bold">
                        <p>3x³ = y² - x²</p>
                        <p className="text-xl mt-2 drop-shadow-[0_0_8px_rgba(230,28,140,0.8)]">y = √(3x³ + x²)</p>
                      </div>
                    ) : (
                      <div className="space-y-1 text-white font-bold">
                        <p>x³/{cValue} + x² = y²</p>
                        <p className="text-xl mt-2 drop-shadow-[0_0_8px_rgba(230,28,140,0.8)]">y = √((x³/{cValue}) + x²)</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
