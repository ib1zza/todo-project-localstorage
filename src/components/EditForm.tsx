import React, { useEffect, useRef, useState } from "react";
import Button from "../UI/Button";
import { useAppDispatch } from "../hooks/hooks";

import { Todo } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCheck, faRotateLeft, faTrash} from "@fortawesome/free-solid-svg-icons";

import s from "../css/EditForm.module.scss";
import {deleteTodo, editTodo} from "../store/reducers/TodoSlice";

interface EditFormProps {
  prevTodo: Todo;
  onAbort: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ prevTodo, onAbort }) => {
  const [data, setData] = useState({
    title: prevTodo.title,
    description: prevTodo.description,
    priority: prevTodo.priority,
  });
  const dispatch = useAppDispatch();
  const titleInput = useRef<HTMLTextAreaElement>(null);

  const submitHandler = () => {
    dispatch(
      editTodo({
        ...prevTodo,
        _id: prevTodo._id,
        title: data.title,
        description: data.description ? data.description : "",
        priority: data.priority,
        status: prevTodo.status,
      })
    );
    // dispatch(fetchSortedTodos(sorting));
    onAbort();
  };

  useEffect(() => {
    if (titleInput.current !== null) {
      titleInput.current.focus();
    }
  }, []);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [currentValue, setCurrentValue ] = useState("");

    useEffect(() => {
        if(!textareaRef.current)  return
        textareaRef.current.style.height = "0px";
        const scrollHeight = textareaRef.current.scrollHeight;
        textareaRef.current.style.height = scrollHeight + "px";
    }, [currentValue, data.description]);
  useEffect(() => {
    if(!titleInput.current)  return
    titleInput.current.style.height = "0px";
    const scrollHeight = titleInput.current.scrollHeight;
    titleInput.current.style.height = scrollHeight + "px";
  }, [titleInput, data.description]);

    return (
    <div className={s.form_wrapper}>
      <div className={s.inputs_field}>
        <textarea
          ref={titleInput}
          className={s.input_title}
          placeholder={"Title"}
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          maxLength={30}
        />
        <textarea
            ref={textareaRef}
          className={s.input_description}
          placeholder={"Description"}
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
            maxLength={100}
        />
        <div className={s.priority_block}>
          <p>Priority:</p>
          {[1, 2, 3, 4].map((el) => (
            <button
              className={
                s.priority_btn + " " + (el === data.priority ? s.active : "")
              }
              onClick={() => setData({ ...data, priority: el })}
            >
              {el}
            </button>
          ))}
        </div>
      </div>
      <div className={s.buttons}>
        <Button className={s.buttons__submit} onClick={submitHandler}>
          <span> Submit </span>
          <FontAwesomeIcon icon={faCheck} />
        </Button>
        <Button className={s.buttons__cancel} onClick={onAbort}>
          <span> Cancel </span>
          <FontAwesomeIcon icon={faRotateLeft} />
        </Button>
        <Button className={s.buttons__delete} onClick={() => {
          dispatch(deleteTodo(prevTodo._id));
          onAbort();
        }
        }>

          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </div>
    </div>
  );
};

export default EditForm;
