import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UnitList from "./UnitList";

const mockFetch = jest.fn();
global.fetch = mockFetch;

const mockSetOpenForm = jest.fn();
const mockSetSelectedUnit = jest.fn();

describe("UnitList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("se o componente é renderizado corretamente: com título 'Lista de Unidades'", () => {
    render(
      <UnitList setOpenForm={mockSetOpenForm} setSelectedUnit={mockSetSelectedUnit} />
    );

    const title = screen.getByRole("heading", { level: 2, name: /lista de unidades/i });
    expect(title).toBeInTheDocument();
  });

  test("se a tabela é renderizada com o cabeçalho correto", () => {
    render(
      <UnitList setOpenForm={mockSetOpenForm} setSelectedUnit={mockSetSelectedUnit} />
    );

    const tableHeaders = screen.getAllByRole("columnheader");
    expect(tableHeaders).toHaveLength(6);

    expect(screen.getByText(/ID/i)).toBeInTheDocument();
    expect(screen.getByText(/Apelido/i)).toBeInTheDocument();
    expect(screen.getByText(/Local/i)).toBeInTheDocument();
    expect(screen.getByText(/Marca/i)).toBeInTheDocument();
    expect(screen.getByText(/Modelo/i)).toBeInTheDocument();
    expect(screen.getByText(/Ações/i)).toBeInTheDocument();
  });

  test("se a primeira linha da tabela é renderizada corretamente (criar mock da API)", async () => {
    const mockUnidades = [
      {
        id: 1,
        apelido: "Unidade 1",
        local: "Local 1",
        marca: "Marca 1",
        modelo: "Modelo 1",
      },
    ];

    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockUnidades),
    });

    render(
      <UnitList setOpenForm={mockSetOpenForm} setSelectedUnit={mockSetSelectedUnit} />
    );

    await waitFor(() => {
      const unitRow = screen.getByRole("row", { name: /unidade 1/i });
      expect(unitRow).toBeInTheDocument();

      const unitCells = within(unitRow).getAllByRole("cell");
      expect(unitCells).toHaveLength(6);

      expect(unitCells[0]).toHaveTextContent("1");
      expect(unitCells[1]).toHaveTextContent("Unidade 1");
      expect(unitCells[2]).toHaveTextContent("Local 1");
      expect(unitCells[3]).toHaveTextContent("Marca 1");
      expect(unitCells[4]).toHaveTextContent("Modelo 1");

      const editButton = within(unitRow).getByRole("button", { name: /editar/i });
      expect(editButton).toBeInTheDocument();

      const removeButton = within(unitRow).getByRole("button", { name: /remover/i });
      expect(removeButton).toBeInTheDocument();
    });
  });

  test("testar comportamento do botão 'Editar'", async () => {
    const mockUnidades = [
      {
        id: 1,
        apelido: "Unidade 1",
        local: "Local 1",
        marca: "Marca 1",
        modelo: "Modelo 1",
      },
    ];

    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockUnidades),
    });

    render(
      <UnitList setOpenForm={mockSetOpenForm} setSelectedUnit={mockSetSelectedUnit} />
    );

    await waitFor(() => {
      const editButton = screen.getByRole("button", { name: /editar/i });
      userEvent.click(editButton);

      expect(mockSetSelectedUnit).toHaveBeenCalledTimes(1);
      expect(mockSetSelectedUnit).toHaveBeenCalledWith(mockUnidades[0]);
      expect(mockSetOpenForm).toHaveBeenCalledTimes(1);
      expect(mockSetOpenForm).toHaveBeenCalledWith(true);
    });
  });

  test("testar comportamento do botão 'Remover'", async () => {
    const mockUnidades = [
      {
        id: 1,
        apelido: "Unidade 1",
        local: "Local 1",
        marca: "Marca 1",
        modelo: "Modelo 1",
      },
    ];

    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockUnidades),
    });

    render(
      <UnitList setOpenForm={mockSetOpenForm} setSelectedUnit={mockSetSelectedUnit} />
    );

    await waitFor(() => {
      const removeButton = screen.getByRole("button", { name: /remover/i });
      userEvent.click(removeButton);

      expect(mockSetSelectedUnit).toHaveBeenCalledTimes(1);
      expect(mockSetSelectedUnit).toHaveBeenCalledWith(mockUnidades[0]);

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith("http://localhost:3333/unidades/1", {
        method: "DELETE",
      });
    });
  });

  test("testar comportamento do botão 'Nova Unidade'", () => {
    render(
      <UnitList setOpenForm={mockSetOpenForm} setSelectedUnit={mockSetSelectedUnit} />
    );

    const newUnitButton = screen.getByRole("button", { name: /nova unidade/i });
    userEvent.click(newUnitButton);

    expect(mockSetOpenForm).toHaveBeenCalledTimes(1);
    expect(mockSetOpenForm).toHaveBeenCalledWith(true);
  });
});
