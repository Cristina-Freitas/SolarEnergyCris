import "./UnitRegister.css";
import { useState } from "react";
import { Button, Input } from "../../index";

export default function UnitRegister({
    setOpenForm, selectedUnit, setSelectedUnit
}){
  const emptyState = {
    apelido: "",
    local: "",
    marca: "",
    modelo: "",
    ativa: false
  };

  const [form, setForm] = useState(selectedUnit || emptyState);

  const createUnit = () => {
    fetch("http://localhost:3333/unidades", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  };

  const editUnit = () => {
    fetch(`http://localhost:3333/unidades/${selectedUnit.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  };

  const handleSave = (event) => {
    event.preventDefault();

    selectedUnit ? editUnit() : createUnit();

    setSelectedUnit(emptyState);
    setOpenForm(false);
  };

  return (
    <section className="unit-register">
      <h2>Cadastro de Unidade Geradora</h2>
      <form onSubmit={handleSave}>
        {["apelido", "local", "marca", "modelo"].map((campo) => (
          <div key={campo}>
            <label htmlFor={campo}>
              {/* primeira letra maiúscula */}
              {campo.charAt(0).toUpperCase() + campo.slice(1)}
            </label>
            <Input
              required
              type="text"
              name={campo}
              id={campo}
              value={form[campo]}
              onChange={(e) => {
                setForm({
                  ...form,
                  [campo]: e.target.value,
                });
              }}
            />
          </div>
        ))}

        <div className="checkbox">
          <Input
            type="checkbox"
            name="ativa"
            id="ativa"
            checked={form?.ativa}
            onChange={(e) => {
              setForm({
                ...form,
                ativa: e.target.checked,
              });
            }}
          />
          <label htmlFor="ativa">Ativo</label>
        </div>

        <Button classStyle="secondary" type="submit">
          Salvar
        </Button>
      </form>
    </section>
  );
}