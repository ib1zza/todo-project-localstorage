import * as React from "react";
import s from "../css/TodoList.module.scss";
import { useAppSelector } from "../hooks/hooks";
import { useMemo } from "react";

import TodoItemCompleted from "./TodoItemCompleted";

const TodoListCompleted: React.FC<{ searchQuery: string }> = ({
  searchQuery,
}) => {
  const { completedList: list, currentSortUncompleted: sort } = useAppSelector(
    (state) => state.todo
  );

  const searchedMas = useMemo(
    () =>
      [...list].filter(
        (el) =>
          el.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (el.description &&
            el.description.toLowerCase().includes(searchQuery.toLowerCase()))
      ),
    [searchQuery, list]
  );

  return (
    <div className={s.todolistContainer}>
      {searchedMas.map((el) => (
        <TodoItemCompleted todo={el} key={el._id} />
      ))}
    </div>
  );
};

export default TodoListCompleted;
