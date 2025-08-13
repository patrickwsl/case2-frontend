import { useCaptadoUpdates } from "@/services/web_socket/data";
import { ClientCaptado } from "@/services/web_socket/interface";
import { useState } from "react";

const months = [
  { value: 1, label: "Janeiro" },
  { value: 2, label: "Fevereiro" },
  { value: 3, label: "Março" },
  { value: 4, label: "Abril" },
  { value: 5, label: "Maio" },
  { value: 6, label: "Junho" },
  { value: 7, label: "Julho" },
  { value: 8, label: "Agosto" },
  { value: 9, label: "Setembro" },
  { value: 10, label: "Outubro" },
  { value: 11, label: "Novembro" },
  { value: 12, label: "Dezembro" },
];

const currentYear = new Date().getFullYear();

export default function DashboardContent() {
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);

  const data = useCaptadoUpdates();

  // Agregar totais (exemplo simples, considerar filtros se precisar)
  const totalAnual = data.reduce((acc, c) => acc + c.captado_anual, 0);
  const totalSemestral = data.reduce((acc, c) => acc + c.captado_semestral, 0);
  const totalMensal = data.reduce((acc, c) => acc + c.captado_mensal, 0);
  const totalSemanal = data.reduce((acc, c) => acc + c.captado_semanal, 0);

  return (
    <div>
      {/* filtros */}
      <div className="flex gap-4 mb-6">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
          className="text-black dark:text-white p-2 border rounded bg-white dark:bg-black border-gray-400 dark:border-gray-600"
        >
          {months.map((m) => (
            <option key={m.value} value={m.value}>{m.label}</option>
          ))}
        </select>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="text-black dark:text-white p-2 border rounded bg-white dark:bg-black border-gray-400 dark:border-gray-600"
        >
          {Array.from({ length: 5 }).map((_, i) => {
            const y = currentYear - i;
            return <option key={y} value={y}>{y}</option>;
          })}
        </select>
      </div>

      {/* cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card title="Captado Anual" value={totalAnual} />
        <Card title="Captado Semestral" value={totalSemestral} />
        <Card title="Captado Mensal" value={totalMensal} />
        <Card title="Captado Semanal" value={totalSemanal} />
      </div>

      {/* tabela / lista dos clientes com seus valores */}
      <div className="overflow-x-auto bg-gray-300 dark:bg-gray-500 rounded shadow p-4">
        <table className="w-full table-auto text-black dark:text-white">
          <thead>
            <tr className="border-b border-gray-300 dark:border-gray-600">
              <th className="text-left p-2">Cliente</th>
              <th className="text-right p-2">Anual</th>
              <th className="text-right p-2">Semestral</th>
              <th className="text-right p-2">Mensal</th>
              <th className="text-right p-2">Semanal</th>
            </tr>
          </thead>
          <tbody>
            {data.map((c: ClientCaptado) => (
              <tr key={c.client_name} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900">
                <td className="p-2">{c.client_name}</td>
                <td className="p-2 text-right">{c.captado_anual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                <td className="p-2 text-right">{c.captado_semestral.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                <td className="p-2 text-right">{c.captado_mensal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                <td className="p-2 text-right">{c.captado_semanal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Card({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-gray-300 dark:bg-gray-500 text-black dark:text-white rounded p-4 shadow font-semibold text-center">
      <div className="text-lg">{title}</div>
      <div className="text-2xl mt-2">{value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
    </div>
  )
}
