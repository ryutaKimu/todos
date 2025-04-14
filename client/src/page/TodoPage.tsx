import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

type Todo = {
	id: number;
	title: string;
};

export const TodoPage: React.FC = () => {
	const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
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

	const deleteTodo = async (id: number) => {
		try {
			await api.delete(`/todo/${id}`);
			setTodos((prev) => prev.filter((todo) => todo.id !== id));
		} catch (error) {
			console.error(error);
		}
	};

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
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-6">Todo一覧</h1>
			<form onSubmit={insertTodo} className="mb-6">
				<label className="block text-lg mb-2">Todo追加</label>
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className="w-1/2 p-2 border border-gray-300 rounded-md"
				/>
				<button
					type="submit"
					className=" w-32 mt-1 ml-2 p-2 bg-blue-500 text-white rounded-md"
				>
					登録
				</button>
			</form>
			<ul className="space-y-2">
				{todos.map((todo) => (
					<li
						key={todo.id}
						className="flex w-1/2 justify-start items-center p-2 border border-gray-300 rounded-md mb-2"
					>
						{editId === todo.id ? (
							<>
								<input
									type="text"
									value={editTitle}
									onChange={(e) => setEditTitle(e.target.value)}
									className="w-1/2 p-1 border border-gray-300 rounded-md"
								/>
								<button
									onClick={() => updateTodo(todo.id)}
									className="w-16 ml-2 p-2  bg-green-500 text-white rounded-md"
								>
									保存
								</button>
								<button
									onClick={() => setEditId(null)}
									className="ml-2 p-2 bg-gray-300 text-white rounded-md"
								>
									キャンセル
								</button>
							</>
						) : (
							<>
								<span className="w-full">{todo.title}</span>
								<button
									onClick={() => handleEdit(todo)}
									className="w-16 ml-4 p-2 bg-yellow-500 text-white rounded-md"
								>
									編集
								</button>
							</>
						)}
						<button
							onClick={() => deleteTodo(todo.id)}
							className=" w-16 ml-2 p-2 bg-red-500 text-white rounded-md"
						>
							削除
						</button>
					</li>
				))}
			</ul>
			<button
				type="button"
				onClick={handleLogout}
				className="mt-6 p-2 bg-red-600 text-white rounded-md"
			>
				ログアウト
			</button>
		</div>
	);
};
