import { useEffect, useState } from "react";
import api from "../api/axios";

export const TodoPage: React.FC = () => {
	type Todo = {
		id: number;
		title: string;
	};

	const [todos, setTodos] = useState<Todo[]>([]);

	const getTodo = async () => {
		try {
			const response = await api.get("/todo");
			setTodos(response.data.todos);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getTodo();
	}, [todos]);

	return (
		<>
			<h1>Todo一覧</h1>
			<ul>
				{todos.map((todo) => (
					<li key={todo.id}>{todo.title}</li>
				))}
			</ul>
		</>
	);
};
