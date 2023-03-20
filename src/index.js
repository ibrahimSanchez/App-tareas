import './style.css';

import { TodoList } from './classes';
import { crearTodo } from './js/componentes';

export const todoList = new TodoList();

todoList.todos.forEach( todo => crearTodo(todo));
