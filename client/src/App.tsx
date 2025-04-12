import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { LoginPage } from "./page/LoginPage";

const App: React.FC = () => {
	const isAuthenticated = false;
	return (
		<Router>
			<Routes>
				<Route path="/" element={<LoginPage />} />
			</Routes>
		</Router>
	);
};

export default App;
