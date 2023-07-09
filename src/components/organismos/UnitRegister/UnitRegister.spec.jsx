import { render, screen, fireEvent } from "@testing-library/react";
import UnitRegister from "./UnitRegister";
import {Geracoes} from "../../../pages/Geracoes/Geracoes";

const mockCreateUnit = jest.fn();
const mockEditUnit = jest.fn();
const mockSetOpenForm = jest.fn();
const mockSetSelectedUnit = jest.fn();

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: (initialState) => [initialState, jest.fn()],
}));

describe("UnitRegister", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("se o componente é renderizado corretamente: com título 'Cadastro de Unidade Geradora'", () => {
    render(
      <UnitRegister
        setOpenForm={mockSetOpenForm}
        selectedUnit={null}
        setSelectedUnit={mockSetSelectedUnit}
      />

    );

    const title = screen.getByRole("heading", { level: 2, name: /cadastro de unidade geradora/i });
    expect(title).toBeInTheDocument();
  });

  test("se algum campo obrigatório não estiver preenchido, ao clicar em 'Salvar', não deverá chamar a função de abrir/fechar formulário", () => {
    render(
      <UnitRegister
        setOpenForm={mockSetOpenForm}
        selectedUnit={null}
        setSelectedUnit={mockSetSelectedUnit}
      />
    );

    const saveButton = screen.getByRole("button", { name: /salvar/i });
    fireEvent.click(saveButton);

    expect(mockCreateUnit).not.toHaveBeenCalled();
    expect(mockEditUnit).not.toHaveBeenCalled();
    expect(mockSetSelectedUnit).not.toHaveBeenCalled();
    expect(mockSetOpenForm).not.toHaveBeenCalled();
  });

  test("se preencher todos os campos obrigatórios, ao clicar em 'Salvar', deverá chamar a função de abrir/fechar formulário com a opção correta", () => {
    render(
      <UnitRegister
        setOpenForm={mockSetOpenForm}
        selectedUnit={null}
        setSelectedUnit={mockSetSelectedUnit}
      />
    );

    const saveButton = screen.getByRole("button", { name: /salvar/i });

    const apelidoInput = screen.getByLabelText("Apelido");
    const localInput = screen.getByLabelText("Local");
    const marcaInput = screen.getByLabelText("Marca");
    const modeloInput = screen.getByLabelText("Modelo");

    fireEvent.change(apelidoInput, { target: { value: "Unidade 1" } });
    fireEvent.change(localInput, { target: { value: "Local 1" } });
    fireEvent.change(marcaInput, { target: { value: "Marca 1" } });
    fireEvent.change(modeloInput, { target: { value: "Modelo 1" } });

    fireEvent.click(saveButton);

    expect(mockCreateUnit).toHaveBeenCalled();
    expect(mockSetSelectedUnit).toHaveBeenCalledWith({
      apelido: "Unidade 1",
      local: "Local 1",
      marca: "Marca 1",
      modelo: "Modelo 1",
      ativa: false,
    });
    expect(mockSetOpenForm).toHaveBeenCalledWith(false);
  });

  test("se preencher todos os campos obrigatórios, ao clicar em 'Salvar', deverá limpar as informações do formulário", () => {
    render(
      <UnitRegister
        setOpenForm={mockSetOpenForm}
        selectedUnit={null}
        setSelectedUnit={mockSetSelectedUnit}
      />
    );

    const saveButton = screen.getByRole("button", { name: /salvar/i });

    const apelidoInput = screen.getByLabelText("Apelido");
    const localInput = screen.getByLabelText("Local");
    const marcaInput = screen.getByLabelText("Marca");
    const modeloInput = screen.getByLabelText("Modelo");

    fireEvent.change(apelidoInput, { target: { value: "Unidade 1" } });
    fireEvent.change(localInput, { target: { value: "Local 1" } });
    fireEvent.change(marcaInput, { target: { value: "Marca 1" } });
    fireEvent.change(modeloInput, { target: { value: "Modelo 1" } });

    fireEvent.click(saveButton);

    expect(apelidoInput.value).toBe("");
    expect(localInput.value).toBe("");
    expect(marcaInput.value).toBe("");
    expect(modeloInput.value).toBe("");
  });

  test("ao clicar no checkbox, seu estado deve ser alterado entre checado e não checado", () => {
    render(
      <UnitRegister
        setOpenForm={mockSetOpenForm}
        selectedUnit={null}
        setSelectedUnit={mockSetSelectedUnit}
      />
    );

    const checkbox = screen.getByLabelText("Ativo");

    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);

    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
  });

  test("quando não houver unidade selecionada, o formulário deverá iniciar com os campos vazios", () => {
    render(
      <UnitRegister
        setOpenForm={mockSetOpenForm}
        selectedUnit={null}
        setSelectedUnit={mockSetSelectedUnit}
      />
    );

    const apelidoInput = screen.getByLabelText("Apelido");
    const localInput = screen.getByLabelText("Local");
    const marcaInput = screen.getByLabelText("Marca");
    const modeloInput = screen.getByLabelText("Modelo");

    expect(apelidoInput.value).toBe("");
    expect(localInput.value).toBe("");
    expect(marcaInput.value).toBe("");
    expect(modeloInput.value).toBe("");
  });

  test("quando não houver unidade selecionada e ao preencher todos os campos obrigatórios, ao clicar em 'Salvar', deverá acontecer uma requisição do tipo POST na api", () => {
    render(
      <UnitRegister
        setOpenForm={mockSetOpenForm}
        selectedUnit={null}
        setSelectedUnit={mockSetSelectedUnit}
      />
    );

    const saveButton = screen.getByRole("button", { name: /salvar/i });

    const apelidoInput = screen.getByLabelText("Apelido");
    const localInput = screen.getByLabelText("Local");
    const marcaInput = screen.getByLabelText("Marca");
    const modeloInput = screen.getByLabelText("Modelo");

    fireEvent.change(apelidoInput, { target: { value: "Unidade 1" } });
    fireEvent.change(localInput, { target: { value: "Local 1" } });
    fireEvent.change(marcaInput, { target: { value: "Marca 1" } });
    fireEvent.change(modeloInput, { target: { value: "Modelo 1" } });

    fireEvent.click(saveButton);

    expect(mockCreateUnit).toHaveBeenCalledWith({
      apelido: "Unidade 1",
      local: "Local 1",
      marca: "Marca 1",
      modelo: "Modelo 1",
      ativa: false,
    });
  });

  test("quando houver unidade selecionada, o formulário deverá iniciar com os campos preenchidos com os valores da unidade selecionada", () => {
    const selectedUnit = {
      id: 1,
      apelido: "Unidade 1",
      local: "Local 1",
      marca: "Marca 1",
      modelo: "Modelo 1",
      ativa: true
    };

    render(
      <UnitRegister
        setOpenForm={mockSetOpenForm}
        selectedUnit={selectedUnit}
        setSelectedUnit={mockSetSelectedUnit}
      />
    );

    const apelidoInput = screen.getByLabelText("Apelido");
    const localInput = screen.getByLabelText("Local");
    const marcaInput = screen.getByLabelText("Marca");
    const modeloInput = screen.getByLabelText("Modelo");
    const ativaCheckbox = screen.getByLabelText("Ativo");

    expect(apelidoInput.value).toBe("Unidade 1");
    expect(localInput.value).toBe("Local 1");
    expect(marcaInput.value).toBe("Marca 1");
    expect(modeloInput.value).toBe("Modelo 1");
    expect(ativaCheckbox.checked).toBe(true);
  });

  test("quando houver unidade selecionada e ao preencher todos os campos obrigatórios, ao clicar em 'Salvar', deverá acontecer uma requisição do tipo PUT na api", () => {
    const selectedUnit = {
      id: 1,
      apelido: "Unidade 1",
      local: "Local 1",
      marca: "Marca 1",
      modelo: "Modelo 1",
      ativa: true
    };

    render(
      <UnitRegister
        setOpenForm={mockSetOpenForm}
        selectedUnit={selectedUnit}
        setSelectedUnit={mockSetSelectedUnit}
      />
    );

    const saveButton = screen.getByRole("button", { name: /salvar/i });

    const apelidoInput = screen.getByLabelText("Apelido");
    const localInput = screen.getByLabelText("Local");
    const marcaInput = screen.getByLabelText("Marca");
    const modeloInput = screen.getByLabelText("Modelo");

    fireEvent.change(apelidoInput, { target: { value: "Unidade Editada" } });
    fireEvent.change(localInput, { target: { value: "Local Editado" } });
    fireEvent.change(marcaInput, { target: { value: "Marca Editada" } });
    fireEvent.change(modeloInput, { target: { value: "Modelo Editado" } });

    fireEvent.click(saveButton);

    expect(mockEditUnit).toHaveBeenCalledWith({
      id: 1,
      apelido: "Unidade Editada",
      local: "Local Editado",
      marca: "Marca Editada",
      modelo: "Modelo Editado",
      ativa: true,
    });
  });
});
