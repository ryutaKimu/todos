import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export const LoginPage: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const response = await api.post("/login", {
				email,
				password,
			});

			if (response.status === 200) {
				localStorage.setItem("authToken", response.data.token);
				navigate('/todos')
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<h2>ログイン</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Email:</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div>
					<label>Password:</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button type="submit">ログイン</button>
			</form>
		</div>
	);
};
