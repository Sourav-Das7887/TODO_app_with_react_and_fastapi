import axios from "axios";

const API = "http://localhost:8000";

export const getTodos = () => axios.get(`${API}/todos`);
export const toggleTodo = (id) => axios.patch(`${API}/todos/${id}`);
export const deleteTodo = (id) => axios.delete(`${API}/todos/${id}`);
export const addTodo = (title, deadline) => {
  return axios.post(`${API}/todos`, { title, deadline });
};