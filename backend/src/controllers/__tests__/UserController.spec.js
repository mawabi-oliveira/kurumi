// DESCRIBE -> bloco de testes - tests suites
// IT or TEST -> declara um único teste unitário - tests cases
// EXPECT -> asserções dos resultados - validar resultados
//
// Os testes usam um banco SQLite em memória (ver src/database/dbConnection.js),
// então não alteram o banco de desenvolvimento.
const request = require("supertest");
const app = require("../../app/app");
const { sequelize } = require("../../database/dbConnection");

const validUser = {
	nickname: "JohnDoe",
	email: "john.doe@example.com",
	password: "Senha123!",
	cep: "57000123",
	street: "Rua Example",
	neighborhood: "Centro",
	city: "Maceió",
	state: "Alagoas",
};

const createUser = (overrides = {}) =>
	request(app).post("/users").send({ ...validUser, ...overrides });

describe("User Tests", () => {
	beforeEach(async () => {
		await sequelize.sync({ force: true });
	});

	afterAll(async () => {
		await sequelize.close();
	});

	test("Should create a new user", async () => {
		const response = await createUser();

		expect(response.status).toBe(201);
		expect(response.body.message).toBe("Usuário cadastrado com sucesso.");
		expect(response.body.user).toHaveProperty("id");
		expect(response.body.user.nickname).toBe(validUser.nickname);
		expect(response.body.user.email).toBe(validUser.email);
		expect(response.body.user).not.toHaveProperty("password");
	});

	test("Should store the state as its abbreviation (UF)", async () => {
		const response = await createUser({ state: "Alagoas" });

		expect(response.status).toBe(201);
		expect(response.body.user.state).toBe("AL");
	});

	test("Should accept the state abbreviation too", async () => {
		const response = await createUser({ state: "pe" });

		expect(response.status).toBe(201);
		expect(response.body.user.state).toBe("PE");
	});

	test("Shouldn't create a new user with a invalid nickname", async () => {
		const response = await createUser({ nickname: "johnny doe" });

		expect(response.status).toBe(400);
		expect(response.body[0].message).toBe("O apelido não pode conter espaços.");
	});

	test("Shouldn't create a new user with a invalid nickname minlength", async () => {
		const response = await createUser({ nickname: "Jo" });

		expect(response.status).toBe(400);
		expect(response.body[0].message).toBe("O apelido deve conter pelo menos 3 caracteres.");
	});

	test("Shouldn't create a new user with a invalid nickname maxlength", async () => {
		const response = await createUser({ nickname: "JohnDoe123456789012345678901234567890" });

		expect(response.status).toBe(400);
		expect(response.body[0].message).toBe("O apelido deve conter no máximo 30 caracteres.");
	});

	test("Shouldn't create a new user with a invalid email", async () => {
		const response = await createUser({ email: "john.doe" });

		expect(response.status).toBe(400);
		expect(response.body[0].message).toBe("E-mail inválido.");
	});

	test("Shouldn't create a new user with a invalid password", async () => {
		const response = await createUser({ password: "123456" });

		expect(response.status).toBe(400);
		expect(response.body[0].message).toBe("Senha inválida.");
	});

	test("Shouldn't create a new user with a invalid state", async () => {
		const response = await createUser({ state: "Atlântida" });

		expect(response.status).toBe(400);
		expect(response.body[0].message).toBe("Estado inválido.");
	});

	test("Shouldn't create two users with the same email", async () => {
		await createUser();
		const response = await createUser({ nickname: "OutroApelido" });

		expect(response.status).toBe(400);
		expect(response.body.error).toBe("E-mail já cadastrado.");
	});

	test("Shouldn't create two users with the same nickname", async () => {
		await createUser();
		const response = await createUser({ email: "outro@example.com" });

		expect(response.status).toBe(400);
		expect(response.body.error).toBe("Apelido já está em uso.");
	});

	test("Should login and return a token", async () => {
		await createUser();

		const response = await request(app)
			.post("/users/login")
			.send({ email: validUser.email, password: validUser.password });

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("token");
		expect(response.body.user.email).toBe(validUser.email);
		expect(response.body.user).not.toHaveProperty("password");
	});

	test("Shouldn't login with a wrong password", async () => {
		await createUser();

		const response = await request(app)
			.post("/users/login")
			.send({ email: validUser.email, password: "SenhaErrada1!" });

		expect(response.status).toBe(400);
		expect(response.body.error).toBe("E-mail ou senha inválidos.");
	});

	test("Shouldn't access the profile without a token", async () => {
		const response = await request(app).get("/users/profile");

		expect(response.status).toBe(401);
	});

	test("Should update the profile using the state abbreviation", async () => {
		await createUser();
		const login = await request(app)
			.post("/users/login")
			.send({ email: validUser.email, password: validUser.password });
		const auth = { Authorization: `Bearer ${login.body.token}` };

		const update = await request(app)
			.put("/users")
			.set(auth)
			.send({ state: "AL", city: "Arapiraca" });
		expect(update.status).toBe(200);

		const profile = await request(app).get("/users/profile").set(auth);
		expect(profile.body.state).toBe("AL");
		expect(profile.body.city).toBe("Arapiraca");
	});

	test("Shouldn't let the PUT change protected fields like id", async () => {
		await createUser();
		const login = await request(app)
			.post("/users/login")
			.send({ email: validUser.email, password: validUser.password });
		const auth = { Authorization: `Bearer ${login.body.token}` };

		await request(app).put("/users").set(auth).send({ id: 999, city: "Recife" });

		const profile = await request(app).get("/users/profile").set(auth);
		expect(profile.body.id).toBe(login.body.user.id);
		expect(profile.body.city).toBe("Recife");
	});
});
