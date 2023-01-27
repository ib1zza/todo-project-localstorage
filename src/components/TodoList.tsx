import * as React from "react";
import TodoItem from "./TodoItem";
import s from "../css/TodoList.module.scss";
import { Todo } from "../types";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useEffect, useMemo } from "react";

import { AnimatePresence } from "framer-motion";

const TodoList: React.FC = () => {
  const {
    list,
    currentSortUncompleted: sort,
    searchQuery,
  } = useAppSelector((state) => state.todo);

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

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("useEffectWorking");
    // dispatch(fetchSortedTodos(sort));
  }, [dispatch, sort, list.length]);
  const AnimationVariants = {
    hidden: { opacity: 0, y: 0 },
    visible: { opacity: 1, y: 0 },
    exit: { x: -200, opacity: 0 },
  };
  return (
    <div className={s.todolistContainer}>

      {list.length ? null : <div className={s.errorMsg}>no todos found</div>}
      <AnimatePresence>
        {searchedMas.map((el) => {
          return el.status ? null : (
            <TodoItem
              viewport={{ amount: 0.3 }}
              initial={"hidden"}
              whileInView={"visible"}
              exit={"exit"}
              transition={{ duration: 0.2 }}
              variants={AnimationVariants}
              todo={el as Todo}
              key={el._id}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default TodoList;
