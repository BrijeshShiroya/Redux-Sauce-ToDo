import {createReducer, createActions} from 'reduxsauce';
import list from '../TodoList.json';
export const initialState = {todoList: list};

const {Types, Creators} = createActions({
  addTodoSauce: ['todo'],
  deleteTodoSauce: ['todo'],
  updateTodoSauce: ['todo'],
});

export default Creators;

const addTodo = (state, action) => {
  return {todoList: [...state.todoList, action.todo]};
};

const deleteTodo = (state, action) => {
  let array = state.todoList.filter(x => x !== action.todo);
  return {todoList: array};
};

const updateTodo = (state, action) => {
  const arr = [...state.todoList];
  var index = arr.findIndex(x => x.id === action.todo.id);
  if (index > -1) {
    arr[index] = {...action.todo};
  }
  return {todoList: arr};
};

const Handlers = {
  [Types.ADD_TODO_SAUCE]: addTodo,
  [Types.DELETE_TODO_SAUCE]: deleteTodo,
  [Types.UPDATE_TODO_SAUCE]: updateTodo,
};

export const reduxSauceReducer = createReducer(initialState, Handlers);
