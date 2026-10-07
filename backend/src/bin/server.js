"use strict";

require("dotenv").config();

// Sem essas variáveis o login/cadastro não funciona de forma segura, então paramos logo na inicialização.
const missing = ["SALT", "JWT_PASS"].filter((name) => !process.env[name]);
if (missing.length > 0) {
	console.error(
		`Variáveis de ambiente ausentes: ${missing.join(", ")}. ` +
			"Copie o arquivo .env.example para .env e preencha os valores."
	);
	process.exit(1);
}

const app = require("../app/app");
const { connectDB, sequelize } = require("../database/dbConnection");

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("Kurumi API - documentação em /api-docs"));

const startServer = async () => {
	try {
		await connectDB();
		await sequelize.sync(); // Cria a tabela Users automaticamente se ainda não existir

		app.listen(PORT, () => {
			console.log(`Server running on http://localhost:${PORT}/api-docs`);
		});
	} catch (error) {
		console.error("Erro ao iniciar o servidor:", error);
		process.exit(1);
	}
};

startServer();
