import {ADD_TODO, DELETE_TODO, UPDATE_TODO} from './actionTypes';
import list from '../TodoList.json';

export const initialState = {
  todoList: list,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {todoList: [...state.todoList, action.payload]};
    case DELETE_TODO:
      let array = state.todoList.filter(x => x !== action.payload);
      return {todoList: array};
    case UPDATE_TODO:
      const arr = [...state.todoList];
      var index = arr.findIndex(x => x.id === action.payload.id);
      if (index > -1) {
        arr[index] = {...action.payload};
      }
      return {todoList: arr};
    default:
      return state;
  }
};
