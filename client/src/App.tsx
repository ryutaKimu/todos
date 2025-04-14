import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from "react-router-dom";
import { LoginPage } from "./page/LoginPage";
import { TodoPage } from "./page/TodoPage";
import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";

const App: React.FC = () => {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
	useEffect(() => {
		const token = localStorage.getItem("authToken");
		setAuthenticated(!!token);
	}, []);

	return (
		<Router>
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route
					path="/todos"
					element={isAuthenticated ? <TodoPage /> : <Navigate to="/" />}
				/>
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</Router>
	);
};

export default App;
