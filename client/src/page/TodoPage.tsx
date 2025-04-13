import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

type TodoPageProps = {
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TodoPage: React.FC<TodoPageProps> = ({ setAuthenticated }) => {
	type Todo = {
		id: number;
		title: string;
	};

	const navigate = useNavigate()
	const [todos, setTodos] = useState<Todo[]>([]);
	const [title, setTitle] = useState<string>("");

	const getTodo = async () => {
		try {
			const response = await api.get("/todo");
			setTodos(response.data.todos);
		} catch (error) {
			console.log(error);
		}
	};

	const insertTodo = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await api.post("/todo", { title });
			setTitle("");
			getTodo();
		} catch (error) {
			console.error(error);
		}
	};

	const handleLogout = async()=>{
		try{
			await api.post("/logout")
			localStorage.removeItem('authToken')
			setAuthenticated(false)
			navigate('/')
		}catch(error){
			console.error('ログアウトに失敗しました', error)
		}
	}

	useEffect(() => {
		getTodo();
	}, []);

	return (
		<>
			<h1>Todo一覧</h1>
			<form onSubmit={insertTodo}>
				<label>Todo追加</label>
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<button type="submit">登録</button>
			</form>
			<ul>
				{todos.map((todo) => (
					<li key={todo.id}>{todo.title}</li>
				))}
			</ul>
			<button type="submit" onClick={handleLogout}>ログアウト</button>
		</>
	);
};
