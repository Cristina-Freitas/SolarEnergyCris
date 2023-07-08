import { useState } from "react";
import { Cards, Container, Chart } from "../../components";

export default function Dashboard() {
  const [filter, setFilter] = useState("all");

  return (
    <Container title="Dasboard">
       <Cards setFilter={setFilter} />

      <Chart filter={filter} />
    </Container>
  )
}