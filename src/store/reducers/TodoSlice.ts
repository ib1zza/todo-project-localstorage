import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { SortType, Todo } from "../../types";
export enum LocalStorageKey {
  TODOS = "todos",
  COMPLETED = "todosCompleted",
}
const getLocalUncompleted = (): Todo[] => {
  return JSON.parse(localStorage.getItem(LocalStorageKey.TODOS) || "[]");
};
const getLocalCompleted = (): Todo[] => {
  return JSON.parse(localStorage.getItem(LocalStorageKey.COMPLETED) || "[]");
};

const setLocalUncompleted = (props: Todo[]) => {
  return localStorage.setItem(LocalStorageKey.TODOS, JSON.stringify(props));
};
const setLocalCompleted = (props: Todo[]) => {
  return localStorage.setItem(LocalStorageKey.COMPLETED, JSON.stringify(props));
};
const getLocalSortUncompleted = (): SortType | null => {
  return localStorage.getItem("sort") as SortType;
};
const getLocalSortCompleted = () => {
  return localStorage.getItem("completedSort") as SortType;
};

type TodoState = {
  list: Array<Todo>;
  completedList: Array<Todo>;
  currentSortUncompleted: SortType;
  currentSortCompleted: SortType;
  searchQuery: string;
  error: null | string;
};

const initialState: TodoState = {
  list: getLocalUncompleted() || [],
  completedList: getLocalCompleted() || [],
  currentSortUncompleted: getLocalSortUncompleted() || ("title" as SortType),
  currentSortCompleted: getLocalSortCompleted() || ("title" as SortType),
  searchQuery: "",
  error: null,
};

const TodoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    createTodo: (state, action: PayloadAction<Todo>) => {
      state.list.push(action.payload);
      setLocalUncompleted(state.list);
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((el) => el._id !== action.payload);
      setLocalUncompleted(state.list);
    },
    completeTodo: (state, action: PayloadAction<string>) => {
      state.completedList.push(
        state.list.filter((el) => el._id === action.payload)[0]
      );
      state.list = state.list.filter((el) => el._id !== action.payload);
      setLocalUncompleted(state.list);
      setLocalCompleted(state.completedList);
    },
    editTodo: (state, action: PayloadAction<Todo>) => {
      const edited = action.payload;
      const elIndex = state.list.findIndex(
        (el) => el._id === action.payload._id
      );
      state.list[elIndex] = edited;

      setLocalUncompleted(state.list);
    },

    setCurrentSort: (state, action: PayloadAction<SortType >) => {
      if(action.payload !== "current") state.currentSortUncompleted = action.payload;
      console.log(state.currentSortUncompleted );
      switch (state.currentSortUncompleted) {
        case SortType.DATE:
          state.list.sort((a, b) => Number(b.createdAt) - Number(a.createdAt));
          return;
        case SortType.DATE_REV:
          state.list.sort((a, b) => Number(a.createdAt) - Number(b.createdAt));
          return;
        case SortType.TITLE:
          state.list.sort((a, b) =>
            a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1
          );
          return;
        case SortType.TITLE_REV:
          state.list.sort((a, b) =>
            a.title.toLowerCase() > b.title.toLowerCase() ? -1 : 1
          );
          return;
        case SortType.PRIORITY:
          state.list.sort((a, b) => a.priority - b.priority);
          return;
      }
    },
    clearState: (state) => {
      state.list = [];
      setLocalUncompleted(state.list);
      setLocalCompleted(state.completedList);
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  createTodo,
  deleteTodo,
  completeTodo,
  editTodo,
  setSearchQuery,
  setCurrentSort,
} = TodoSlice.actions;
export default TodoSlice.reducer;
