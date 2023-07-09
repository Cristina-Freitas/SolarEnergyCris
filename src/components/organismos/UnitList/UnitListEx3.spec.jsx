import { render, screen } from "@testing-library/react";
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

  test("se o componente é renderizado corretamente: com título 'Unidades'", () => {
    render(
      <UnitList setOpenForm={mockSetOpenForm} setSelectedUnit={mockSetSelectedUnit} />
    );

    const title = screen.getByRole("heading", { level: 2, name: /lista de unidades/i });
    expect(title).toBeInTheDocument();
  });

  test("ao entrar na página deve renderizar a lista de unidades", () => {
    const mockUnidades = [
      {
        id: 1,
        apelido: "Unidade 1",
        local: "Local 1",
        marca: "Marca 1",
        modelo: "Modelo 1",
      },
      {
        id: 2,
        apelido: "Unidade 2",
        local: "Local 2",
        marca: "Marca 2",
        modelo: "Modelo 2",
      },
    ];

    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockUnidades),
    });

    render(
      <UnitList setOpenForm={mockSetOpenForm} setSelectedUnit={mockSetSelectedUnit} />
    );

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("http://localhost:3333/unidades");

    // Aguarda a resolução da chamada fetch para renderizar os dados
    return screen.findByText(/unidade 1/i).then(() => {
      const unitRows = screen.getAllByRole("row");
      expect(unitRows).toHaveLength(mockUnidades.length + 1); // +1 para o cabeçalho

      // Verifica se os dados das unidades estão sendo renderizados corretamente
      mockUnidades.forEach((unidade) => {
        expect(screen.getByText(unidade.apelido)).toBeInTheDocument();
        expect(screen.getByText(unidade.local)).toBeInTheDocument();
        expect(screen.getByText(unidade.marca)).toBeInTheDocument();
        expect(screen.getByText(unidade.modelo)).toBeInTheDocument();
      });
    });
  });

  test("ao clicar no botão 'Nova unidade' deve renderizar o cadastro de unidade", () => {
    render(
      <UnitList setOpenForm={mockSetOpenForm} setSelectedUnit={mockSetSelectedUnit} />
    );

    const newUnitButton = screen.getByRole("button", { name: /nova unidade/i });
    userEvent.click(newUnitButton);

    expect(mockSetOpenForm).toHaveBeenCalledTimes(1);
    expect(mockSetOpenForm).toHaveBeenCalledWith(true);
  });
});
