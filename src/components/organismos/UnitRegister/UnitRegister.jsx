import "./UnitRegister.css";
import { useState } from "react";
import { Button, Input } from "../../index";
import { API_URL } from "../../../utils";

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
    return fetch(`${API_URL}/unidades`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  };

  const editUnit = () => {
    return fetch(`${API_URL}/unidades/${selectedUnit.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  };

  const handleSave = (event) => {
    event.preventDefault();

    const request = selectedUnit ? editUnit() : createUnit();

    // Só volta para a lista depois que a API confirmar,
    // e limpa a seleção para o próximo cadastro não virar uma edição.
    request.then(() => {
      setSelectedUnit(undefined);
      setOpenForm(false);
    });
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