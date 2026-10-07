import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import googleIcon from "../assets/google.png";
import Api, { googleLoginEnabled } from "../Api";
import { API_URL } from "../config";
import { saveSession } from "../utils/auth";

const Login: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setMessage("");
		setLoading(true);
		try {
			const res = await fetch(`${API_URL}/users/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});
			const data = await res.json().catch(() => ({}));
			if (res.ok) {
				saveSession(data.token, data.user.nickname);
				history.push("/game");
			} else {
				setMessage(data.error || data.message || "Falha no login");
			}
		} catch (error) {
			console.error(error);
			setMessage("Não foi possível conectar ao servidor. Você pode jogar como convidado.");
		} finally {
			setLoading(false);
		}
	};

	const actionLoginGoogle = async () => {
		setMessage("");
		const result = await Api.googleLogar();
		if (result?.user) {
			saveSession(null, result.user.displayName || result.user.email || "Jogador");
			history.push("/game");
		} else {
			setMessage("Erro ao fazer login com o Google");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-black to-gray-900 p-4">
			<form
				onSubmit={handleSubmit}
				className="w-full max-w-md p-6 rounded-lg shadow-md backdrop-blur-sm text-white"
				style={{ backgroundColor: "rgba(54, 54, 54, 0.1)" }}
			>
				<h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
				{message && <p className="text-red-400 mb-4 text-sm">{message}</p>}
				<input
					className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 text-white"
					type="email"
					placeholder="E-mail"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					autoComplete="email"
					required
				/>
				<div className="relative mb-6">
					<input
						className="w-full p-2 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 text-white"
						type={showPassword ? "text" : "password"}
						placeholder="Senha"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						autoComplete="current-password"
						required
					/>
					<button
						type="button"
						aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
						className="absolute inset-y-0 right-0 flex items-center pr-3"
						onClick={() => setShowPassword(!showPassword)}
					>
						{showPassword ? (
							<EyeSlashIcon className="h-5 w-5 text-gray-400" />
						) : (
							<EyeIcon className="h-5 w-5 text-gray-400" />
						)}
					</button>
				</div>
				<button
					type="submit"
					disabled={loading}
					className="w-full bg-red-800 hover:bg-red-700 disabled:opacity-60 text-white py-2 rounded"
				>
					{loading ? "Entrando..." : "Login"}
				</button>
				<p className="text-sm text-center mt-4">
					Não tem uma conta?{" "}
					<Link to="/register" className="text-red-400 hover:underline">
						Cadastre-se
					</Link>
				</p>
				<p className="text-sm text-center mt-2">
					<Link to="/game" className="text-gray-300 hover:underline">
						Jogar como convidado
					</Link>
				</p>
				{googleLoginEnabled && (
					<div className="flex justify-center mt-4">
						<button
							type="button"
							className="flex items-center justify-center p-2 rounded bg-white hover:bg-gray-100 transition-colors"
							onClick={actionLoginGoogle}
						>
							<img src={googleIcon} alt="" className="h-6 w-6" />
							<span className="ml-2 text-gray-700">Entrar com Google</span>
						</button>
					</div>
				)}
			</form>
		</div>
	);
};

export default Login;
