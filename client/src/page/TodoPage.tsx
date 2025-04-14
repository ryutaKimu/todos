import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

type Todo = {
	id: number;
	title: string;
};

export const TodoPage: React.FC = () => {
	const setAuthenticated = useAuthStore((state) => state.setAuthenticated)
	const navigate = useNavigate();
	const [todos, setTodos] = useState<Todo[]>([]);
	const [title, setTitle] = useState<string>("");
	const [editId, setEditId] = useState<number | null>(null);
	const [editTitle, setEditTitle] = useState<string>("");

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

	const deleteTodo = async (id:number)=>{
		try{
			await api.delete(`/todo/${id}`);
			setTodos(prev => prev.filter(todo => todo.id !== id))
		}catch(error){
			console.error(error)
		}
	}

	const handleLogout = async () => {
		try {
			await api.post("/logout");
			localStorage.removeItem("authToken");
			setAuthenticated(false);
			navigate("/");
		} catch (error) {
			console.error("ログアウトに失敗しました", error);
		}
	};

	const updateTodo = async (id: number) => {
		try {
			const response = await api.put(`/todo/${id}`, { title: editTitle });
			setEditId(null);
			setEditTitle("");
			const updatedTodo = response.data.todo;
			setTodos((prevTodos) => {
				return prevTodos.map((todo) =>
					todo.id === updatedTodo.id ? updatedTodo : todo
				);
			});
		} catch (error) {
			console.error(error);
		}
	};

	const handleEdit = (todo: Todo) => {
		setEditId(todo.id);
		setEditTitle(todo.title);
	};

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
					<li key={todo.id}>
						{editId === todo.id ? (
							<>
								<input
									type="text"
									value={editTitle}
									onChange={(e) => setEditTitle(e.target.value)}
								/>
								<button onClick={() => updateTodo(todo.id)}>保存</button>
								<button onClick={() => setEditId(null)}>キャンセル</button>
							</>
						) : (
							<>
								{todo.title}
								<button onClick={() => handleEdit(todo)}>編集</button>
							</>
						)}
						<button onClick={()=>deleteTodo(todo.id)}>削除</button>
					</li>
				))}
			</ul>
			<button type="submit" onClick={handleLogout}>
				ログアウト
			</button>
		</>
	);
};
