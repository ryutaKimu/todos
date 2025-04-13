import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from "react-router-dom";
import { LoginPage } from "./page/LoginPage";
import { TodoPage } from "./page/TodoPage";
import { useEffect, useState } from "react";

const App: React.FC = () => {
	const [authenticated, setAuthenticated] = useState<boolean>(false);
	useEffect(() => {
		const token = localStorage.getItem("authToken");
		setAuthenticated(!!token);
	}, []);
	
	return (
		<Router>
			<Routes>
				<Route path="/" element={<LoginPage setAuthenticated = {setAuthenticated} />} />
				<Route
					path="/todos"
					element={
						authenticated ? (
							<TodoPage setAuthenticated={setAuthenticated} />
						) : (
							<Navigate to="/" />
						)
					}
				/>
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</Router>
	);
};

export default App;
