// Servidor único: entrega a API (json-server) em /api e o frontend já compilado (pasta dist).
// Em produção (Render), tudo roda em um só endereço.
const fs = require("fs");
const path = require("path");
const jsonServer = require("json-server");

const PORT = process.env.PORT || 3333;
const DIST_PATH = path.join(__dirname, "dist");
const INDEX_HTML = path.join(DIST_PATH, "index.html");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "backend", "db.json"));
const middlewares = jsonServer.defaults({ static: DIST_PATH });

server.use(middlewares);
server.use("/api", router);

// Qualquer outra rota (/unidades, /cadastro...) devolve o index.html,
// para o React Router cuidar da navegação, inclusive ao recarregar a página.
server.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) return next();
  if (!fs.existsSync(INDEX_HTML)) {
    return res
      .status(404)
      .send("Frontend não compilado. Rode `npm run build` ou use `npm run dev`.");
  }
  res.sendFile(INDEX_HTML);
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando em http://localhost:${PORT} (API em /api)`);
});
