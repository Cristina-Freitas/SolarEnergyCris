import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Menu from "./Menu";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

function renderComponent() {
  render(
    <BrowserRouter>
      <Menu />
    </BrowserRouter>
  );

  const logo = screen.getByAltText(/logo/i);
  const dashboardButton = screen.getByRole("button", { name: /dashboard/i });
  const unitsButton = screen.getByRole("button", { name: /unidade consumidora/i });
  const registrationButton = screen.getByRole("button", { name: /cadastro de energia gerada/i });

  return { logo, dashboardButton, unitsButton, registrationButton };
}

describe("Menu", () => {
  test("se o componente é renderizado corretamente: com logo e 3 botões", () => {
    const { logo, dashboardButton, unitsButton, registrationButton } =
      renderComponent();

    expect(logo).toBeInTheDocument();
    expect(dashboardButton).toBeInTheDocument();
    expect(unitsButton).toBeInTheDocument();
    expect(registrationButton).toBeInTheDocument();

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(3);
  });

  test("se o botão da rota default inicia selecionado e os demais não selecionados", () => {
    const { dashboardButton, unitsButton, registrationButton } =
      renderComponent();

    expect(dashboardButton).toHaveClass("selected");
    expect(unitsButton).not.toHaveClass("selected");
    expect(registrationButton).not.toHaveClass("selected");
  });

  test("se a rota é alterada corretamente quando clica em algum botão", () => {
    const { unitsButton, registrationButton } = renderComponent();

    userEvent.click(unitsButton);
    expect(mockNavigate).toHaveBeenCalledWith("/unidades");

    userEvent.click(registrationButton);
    expect(mockNavigate).toHaveBeenCalledWith("/cadastro");

    userEvent.click(screen.getByText(/dashboard/i));
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  test("se a rota é alterada para a default quando clica no logo", () => {
    const { logo } = renderComponent();

    userEvent.click(logo);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});

