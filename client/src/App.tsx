import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { LoginPage } from "./page/LoginPage";
import { TodoPage } from "./page/TodoPage";

const App: React.FC = () => {
	const isAuthenticated = !!localStorage.getItem('authToken');
	return (
		<Router>
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route
          path="/todos"
          element={isAuthenticated ? <TodoPage /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
			</Routes>
		</Router>
	);
};

export default App;
