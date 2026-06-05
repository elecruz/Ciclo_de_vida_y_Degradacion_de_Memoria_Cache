"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ChartProps {
  dataPoints: { x: number; y: number }[];
}

export default function MemoryChart({ dataPoints }: ChartProps) {
  const chartData = {
    labels: dataPoints.map(p => p.x.toFixed(1)),
    datasets: [
      {
        label: 'Degradación de Caché (y)',
        data: dataPoints.map(p => p.y),
        borderColor: '#E61C8C', // fucsia-lab
        backgroundColor: 'rgba(163, 36, 158, 0.15)', // violeta-lab con opacidad
        borderWidth: 2,
        pointBackgroundColor: '#FF5C33', // naranja-lab
        pointBorderColor: '#000000',
        pointHoverBackgroundColor: '#E61C8C',
        pointHoverBorderColor: '#FFFFFF',
        pointRadius: 3,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#888' },
        title: { display: true, text: 'Páginas Activas (x)', color: '#A3249E' }
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#888' },
        title: { display: true, text: 'Bloques Corruptos (y)', color: '#FF5C33' }
      }
    },
    plugins: {
      legend: { labels: { color: '#e2e8f0', font: { family: 'monospace' } } },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#E61C8C',
        bodyColor: '#fff',
        borderColor: '#A3249E',
        borderWidth: 1,
        titleFont: { family: 'monospace' }
      }
    }
  };

  return <Line data={chartData} options={options} />;
}
