import "./Geracoes.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Input } from "../../components";
import { getData } from "../../utils";

export default function Geracoes() {
  const navigate = useNavigate();

  const emptyState = { unidade: undefined, data: undefined, total: undefined };
  const [formValue, setFormValue] = useState(emptyState);

  const [units, setUnits] = useState([]);

  useEffect(() => {
    getData("unidades", setUnits);
  }, []);

  const handleSave = (event) => {
    event.preventDefault();

    const value = {
      ...formValue,
      total: Number(formValue.total),
    };

    fetch("http://localhost:3333/geracoes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(value),
    }).then(() => {
      setFormValue(emptyState);
      navigate("/");
    });
  };

  return (
    <Container title="Lançamento de geração mensal">
      <form onSubmit={handleSave} className="GeneratedEnergyRegistration">
        <div>
          <label htmlFor="unidade">Unidade geradora:</label>
          <select
            required
            id="unidade"
            name="unidade"
            value={formValue.unidade}
            onChange={(event) =>
              setFormValue({ ...formValue, unidade: event.target.value })
            }
          >
            <option value="">Selecione uma unidade</option>
            {units?.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.apelido}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="data">Mês/ano:</label>
          <Input
            required
            type="month"
            id="data"
            name="data"
            value={formValue.data}
            onChange={(event) =>
              setFormValue({ ...formValue, data: event.target.value })
            }
          />
        </div>

        <div>
          <label htmlFor="total">Total kw gerado:</label>
          <Input
            required
            type="number"
            id="total"
            name="total"
            value={formValue.total}
            onChange={(event) =>
              setFormValue({ ...formValue, total: event.target.value })
            }
          />
        </div>

        <Button classStyle="secondary" type="submit">
          Cadastrar
        </Button>
      </form>
    </Container>
  );
}