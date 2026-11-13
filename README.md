# ☀️ Solar Energy

Aplicação web para **gerenciamento de unidades geradoras de energia solar**: cadastro das unidades, lançamento da geração mensal em kW e um dashboard com indicadores e gráfico de evolução.

Projeto desenvolvido no módulo M3S1 do **FuturoDEV [Ingleses] — SENAI-SC**.

🔗 **Acesse online:** https://solarenergycris.onrender.com/

> Hospedado no plano gratuito da Render: se o site estiver sem acessos há algum tempo, o primeiro carregamento pode levar até 1 minuto. Os dados de demonstração voltam ao estado original sempre que o servidor reinicia, então fique à vontade para cadastrar, editar e remover.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-4-646CFF?logo=vite&logoColor=white)
![Jest](https://img.shields.io/badge/Testes-Jest%20%2B%20Testing%20Library-C21325?logo=jest&logoColor=white)
![License](https://img.shields.io/badge/licença-MIT-green)

---

## 📸 Telas

### Dashboard
Cards com o total de unidades, unidades ativas e inativas e a média de energia gerada. Ao clicar em um card, o gráfico é filtrado pelas unidades correspondentes.

![Dashboard](docs/dashboard.png)

### Unidades
Listagem das unidades geradoras com as opções de editar, remover e cadastrar uma nova unidade.

![Lista de unidades](docs/unidades.png)

### Lançamento de geração mensal
Formulário para registrar quanto cada unidade gerou em determinado mês.

![Lançamento de geração](docs/cadastro-geracao.png)

---

## ✨ Funcionalidades

- **CRUD completo de unidades geradoras** (criar, listar, editar e remover) consumindo uma API REST
- **Lançamento de geração mensal** vinculado a uma unidade, com validação de campos obrigatórios
- **Dashboard com indicadores** calculados a partir dos dados da API
- **Gráfico de linha** com o total de energia gerada nos últimos 6 meses, usando Chart.js
- **Filtro interativo**: os cards do dashboard filtram o gráfico por unidades ativas, inativas ou todas
- **Navegação SPA** com React Router e destaque do item ativo no menu
- **Testes automatizados** de componentes com Jest e Testing Library

---

## 🛠️ Tecnologias

| Camada | Ferramentas |
| --- | --- |
| Interface | React 18, Vite, CSS |
| Rotas | React Router DOM 6 |
| Gráficos | Chart.js + react-chartjs-2 |
| API simulada | JSON Server (usado como módulo Node, junto com o site) |
| Deploy | Render |
| Requisições | Fetch API |
| Testes | Jest, Testing Library (React, User Event, Jest DOM), Babel |
| Qualidade | ESLint |

---

## 🧱 Arquitetura

Os componentes foram organizados seguindo o **Atomic Design**, do menor para o maior nível de composição:

```
src/
├── components/
│   ├── atomos/        # Button, Input
│   ├── moleculas/     # Card, Menu
│   ├── organismos/    # Cards, Chart, UnitList, UnitRegister
│   └── templates/     # Container (layout base das páginas)
├── pages/             # Dashboard, Unidades, Geracoes
├── utils/             # Requisições e agrupamento dos dados por mês
└── assets/            # Logo e ícones
backend/
└── db.json            # Base de dados do JSON Server
server.js              # Servidor único: API em /api + site compilado
```

Essa organização facilita o reaproveitamento: o mesmo `Button` e o mesmo `Input` são usados em todos os formulários, e o `Container` garante o layout padrão de todas as páginas.

---

## 🔌 API

A API é simulada com o **JSON Server**, a partir do arquivo `backend/db.json`. O arquivo `server.js` usa o JSON Server como módulo para entregar a API em `/api` e o site compilado no mesmo endereço. Assim, o projeto inteiro roda em um único serviço, sem configuração de CORS.

| Método | Endpoint | Descrição |
| --- | --- | --- |
| GET | `/api/unidades` | Lista as unidades |
| POST | `/api/unidades` | Cadastra uma unidade |
| PUT | `/api/unidades/:id` | Atualiza uma unidade |
| DELETE | `/api/unidades/:id` | Remove uma unidade |
| GET | `/api/geracoes` | Lista os lançamentos de geração |
| POST | `/api/geracoes` | Registra a geração mensal de uma unidade |

<details>
<summary>Exemplo de dados</summary>

```json
{
  "unidades": [
    {
      "id": "abc",
      "apelido": "Unidade 1",
      "local": "Rua 123",
      "marca": "Marca 1",
      "modelo": "Modelo 1",
      "ativa": true
    }
  ],
  "geracoes": [
    {
      "id": "123",
      "unidade": "abc",
      "data": "2023-01",
      "total": 100
    }
  ]
}
```

</details>

---

## 🚀 Como rodar

**Pré-requisito:** Node.js 22.

```bash
# 1. Clone o repositório
git clone https://github.com/Cristina-Freitas/SolarEnergyCris.git
cd SolarEnergyCris

# 2. Instale as dependências
npm install
```

Em seguida, abra **dois terminais** na pasta do projeto:

```bash
# Terminal 1 — API (http://localhost:3333/api)
npm run server
```

```bash
# Terminal 2 — aplicação (http://localhost:5173)
npm run dev
```

Acesse `http://localhost:5173` no navegador. Em desenvolvimento, o Vite redireciona as chamadas de `/api` para o servidor local.

Para testar a versão de produção, com tudo em um único endereço:

```bash
npm run build
npm start
# acesse http://localhost:3333
```

### Testes

```bash
npm test
```

Os testes cobrem a renderização e a navegação do menu, a listagem de unidades e o formulário de cadastro de unidades.

---

## 📚 O que aprendi

- Componentizar uma interface com **Atomic Design** e reaproveitar componentes entre páginas
- Consumir uma **API REST** com `fetch`, usando os métodos GET, POST, PUT e DELETE
- Gerenciar estado e efeitos com os hooks `useState` e `useEffect`
- Transformar dados brutos em informação visual (agrupamento por mês e gráfico com Chart.js)
- Escrever **testes de componentes** com Jest e Testing Library, praticando TDD
- Estruturar rotas de uma SPA com React Router
- Publicar frontend e API juntos em um único serviço na nuvem

---

## 🔭 Próximos passos

- [ ] Tela de login com autenticação
- [ ] Ordenar o gráfico por mês **e ano**, e não apenas pelo mês
- [ ] Mensagens de sucesso e de erro nas requisições
- [ ] Layout responsivo para telas menores
- [ ] Ampliar a cobertura de testes para o dashboard e o lançamento de geração

---

## 👩‍💻 Autora

**Cristina Freitas**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/cristina-freitas-fln/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white)](https://github.com/Cristina-Freitas)

---

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
