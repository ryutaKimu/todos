import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuthStore } from "../store/authStore";

export const LoginPage: React.FC = () => {
	const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const response = await api.post("/login", {
				email,
				password,
			});

			if (response.status === 200) {
				const token = response.data.token;
				localStorage.setItem("authToken", token);
				setAuthenticated(true);
				navigate("/todos");
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="flex justify-center items-center h-screen bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
				<h2 className="text-2xl font-bold mb-6 text-center text-gray-800">ログイン画面</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
					>
						ログイン
					</button>
				</form>
			</div>
		</div>
	);
};
