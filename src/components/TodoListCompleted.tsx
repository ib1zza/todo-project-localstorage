import * as React from "react";
import s from "./TodoList/TodoList.module.scss";
import { useAppSelector } from "../store/hooks/hooks";
import { useMemo } from "react";

import TodoItemCompleted from "./TodoItemCompleted";
import { AnimatePresence } from "framer-motion";
const AnimationVariants = {
  hidden: { opacity: 0, y: 0 },
  visible: { opacity: 1, y: 0 },
  exit: { x: -200, opacity: 0 },
};
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
      {list.length ? null : <div className={s.errorMsg}>no todos found</div>}
      <AnimatePresence>
        {searchedMas.map((el) => (
          <TodoItemCompleted
            viewport={{ amount: 0.3 }}
            initial={"hidden"}
            whileInView={"visible"}
            exit={"exit"}
            transition={{ duration: 0.2 }}
            variants={AnimationVariants}
            todo={el}
            key={el._id}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TodoListCompleted;
