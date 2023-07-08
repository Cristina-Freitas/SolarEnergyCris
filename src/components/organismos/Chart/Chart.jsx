import "./Chart.css";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

import { getData, groupDataByMonth  } from "../../../utils/";

export default function Chart({ filter }) {
  const [units, setUnits] = useState([]);
  const [generation, setGeneration] = useState([]);

  useEffect(() => {
    getData("unidades", setUnits);
    getData("geracoes", setGeneration);
  }, []);

  const generationData = generation?.filter((gen) => {
    const unit = units?.find((unit) => unit.id === gen.unidade);
    if (filter === "all") return true;
    if (filter === "active") return unit?.ativa;
    if (filter === "inactive") return !unit?.ativa;
  });

  const groupedData = groupDataByMonth(generationData);

  const chartData = {
    labels: Object.keys(groupedData).slice(-6),
    datasets: [
      {
        label: "Energia gerada por mês",
        data: Object.values(groupedData).slice(-6),
        fill: false,
        borderColor: "#2196F3",
        lineTension: 0.5,
        pointRadius: 0,
      },
    ],
  };

  return (
    <section className="chart">
      <h2>Total de energia gerada por mês</h2>
      {chartData && (
        <Line
          data={chartData}
          options={{
            scales: {
              y: {
                beginAtZero: true,
                // max: 1000,
                position: "right",
              },
              x: {
                offset: true,
                grid: {
                  display: false,
                },
              },
            },
          }}
        />
      )}
    </section>
  );
}
