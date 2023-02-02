import React, { ForwardedRef, forwardRef, useState } from "react";
import { useAppDispatch } from "../store/hooks/hooks";
import s from "./TodoItem/TodoItem.module.scss";
import Button from "../UI/Button/Button";
import { Todo } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faTrash } from "@fortawesome/free-solid-svg-icons";
import TodoDescription from "./TodoDescription/TodoDescription";
import { deleteCompletedTodo } from "../store/reducers/TodoSlice";
import { format } from "date-fns";
import { LayoutGroup, motion } from "framer-motion";

interface TodoItemCompletedProps {
  todo: Todo;
}

const TodoItemCompleted: React.FC<TodoItemCompletedProps> = forwardRef(
  ({ todo }, ref: ForwardedRef<HTMLDivElement>) => {
    const dispatch = useAppDispatch();
    const [isDescriptionOpened, setIsDescriptionOpened] = useState(false);
    let wrapperClasses = s.todoContainer;

    switch (todo.priority) {
      case 1:
        wrapperClasses += " " + s.p1;
        break;
      case 2:
        wrapperClasses += " " + s.p2;
        break;
      case 3:
        wrapperClasses += " " + s.p3;
        break;
      case 4:
        wrapperClasses += " " + s.p4;
        break;
    }

    return (
      <div className={wrapperClasses} ref={ref}>
        <LayoutGroup id={"a"}>
          <motion.div layout className={s.todo_block__description_completed}>
            <TodoDescription todo={todo} />
            {isDescriptionOpened && (
              <motion.div className={s.other_info}>
                <div>
                  <span>Date of creation:</span>{" "}
                  {format(new Date(Number(todo.createdAt)), "Pp")}{" "}
                </div>
                <div>
                  <span>Date of completion:</span>{" "}
                  {format(new Date(Number(todo.updatedAt)), "Pp")}
                </div>
              </motion.div>
            )}
          </motion.div>

          <div className={s.buttons}>
            <Button onClick={() => setIsDescriptionOpened((p) => !p)}>
              <FontAwesomeIcon icon={faInfo} />
            </Button>
            <Button onClick={() => dispatch(deleteCompletedTodo(todo._id))}>
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </div>
        </LayoutGroup>
      </div>
    );
  }
);

export default motion(TodoItemCompleted);
