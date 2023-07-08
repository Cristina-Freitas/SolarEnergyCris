import { useEffect, useState } from "react";
import { Card } from "../../index";

import { getData } from "../../../utils"

export default function Cards({ setFilter }) {
  const [units, setUnits] = useState([]);
  const [generation, setGeneration] = useState([]);

  useEffect(() => {
    getData("unidades", setUnits);
    getData("geracoes", setGeneration);
  }, []);

  const unitsTotal = units?.length;
  const activeUnits = units?.filter((unit) => unit.ativa).length;
  const inactiveUnits = unitsTotal - activeUnits;

  const generationMean =
    generation?.reduce((acc, gen) => acc + gen.total, 0) / units?.length;

  const cards = [
    {
      id: "all",
      title: "Total de unidades",
      value: unitsTotal,
      clickable: true,
    },
    {
      id: "active",
      title: "Unidades ativas",
      value: activeUnits,
      clickable: true,
    },
    {
      id: "inactive",
      title: "Unidades inativas",
      value: inactiveUnits,
      clickable: true,
    },

    {
      id: "mean",
      title: "Média de energia",
      value: generationMean.toFixed(2),
      clickable: false,
    },
  ];

  return (
    <section style={{ display: "flex", justifyContent: "space-between" }}>
      {cards.map((card) => (
        <Card
          key={card.id}
          onClick={() => {
            if (card.id === "mean") return;
            setFilter(card.id);
          }}
          {...card}
        />
      ))}
    </section>
  );
}
