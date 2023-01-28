import React, { ForwardedRef, useMemo, useState } from "react";
import { useAppDispatch } from "../hooks/hooks";
import s from "../css/TodoItem.module.scss";
import Button from "../UI/Button";

import EditForm from "./EditForm";
import { Todo } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleCheck,
    faPenToSquare,
    faInfo,
    faXmark, faTrash,
} from "@fortawesome/free-solid-svg-icons";
import MouseOver from "../UI/MouseOver";
import TodoDescription from "./TodoDescription";
import { LayoutGroup, motion } from "framer-motion";
import { forwardRef } from "react";
import { completeTodo, deleteTodo } from "../store/reducers/TodoSlice";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = forwardRef(
  ({ todo }, ref: ForwardedRef<HTMLDivElement>) => {
    const [editMode, setEditMode] = useState(false);
    const dispatch = useAppDispatch();

    const wrapperClasses = useMemo(() => {
      let wp = s.todoContainer;

      if (editMode) {
        return wp + " " + s.todoContainer_Editing;
      }
      switch (todo.priority) {
        case 1:
          wp += " " + s.p1;
          break;
        case 2:
          wp += " " + s.p2;
          break;
        case 3:
          wp += " " + s.p3;
          break;
        case 4:
          wp += " " + s.p4;
          break;
      }
      return wp;
    }, [todo.priority, editMode]);

    const handleCompleteTodo = () => {
      dispatch(completeTodo(todo._id));
    };

    return (
      <div ref={ref}>
        <LayoutGroup id={"a"}>
          <motion.div layout className={wrapperClasses}>
            <motion.div layout className={s.todo_block__description}>


              {editMode ? (

                  <EditForm
                    prevTodo={todo}
                    onAbort={() => setEditMode(false)}
                  />

              ) : (
                  <>
                      <button
                          disabled={editMode}
                          className={s.completeButton}
                          onClick={handleCompleteTodo}
                      >
                          <FontAwesomeIcon icon={faCircleCheck} />
                      </button>
                      <TodoDescription todo={todo} />
                  </>
              )}
            </motion.div>

            <div className={s.buttons}>
              {!editMode && (
                <>
                  <Button onClick={() => setEditMode((editMode) => !editMode)}>
                    <div className={s.buttonEdit}>Edit</div>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </Button>

                  {/*<MouseOver*/}
                  {/*  text={*/}
                  {/*    "Date of creation: " +*/}
                  {/*    todo.createdAt.slice(0, 10) +*/}
                  {/*    " " +*/}
                  {/*    todo.createdAt.slice(11, 19)*/}
                  {/*  }*/}
                  {/*>*/}
                  {/*  <FontAwesomeIcon icon={faInfo} />*/}
                  {/*</MouseOver>*/}
                  <Button className={s.button__delete} onClick={() => dispatch(deleteTodo(todo._id))}>
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        </LayoutGroup>
      </div>
    );
  }
);

export default motion(TodoItem);
