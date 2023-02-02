import React, { useContext, useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../store/hooks/hooks";
import { createTodo } from "../../store/reducers/TodoSlice";
import Button from "../../UI/Button/Button";

import s from "./CreateTaskForm.module.scss";
import Select from "../../UI/Select/Select";

import { useModalContext } from "../../context/ModalContext";

const CreateTaskForm: React.FC = () => {
  const { setModal } = useModalContext();
  const hideF = () => setModal(false);
  const dispatch = useAppDispatch();
  const titleRef = useRef<HTMLInputElement>(null);

  //focus on input
  useEffect(() => {
    if (titleRef.current !== null) {
      titleRef.current.focus();
    }
  }, []);

  const [state, setState] = useState({
    title: "",
    description: "",
    priority: 0,
  });
  //функция проверяет записано ли чтото в заголовке нового туду и если да, то отправляет запрос на создание нового туду,
  // а также вызывает перерисовку списка для его корректного отображения.
  const check = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (state.title.trim()) {
      dispatch(
        createTodo({
          _id: Date.now().toString(),
          createdAt: Date.now().toString(),
          __v: 0,
          status: false,
          updatedAt: Date.now().toString(),
          title: state.title,
          description: state.description.trim() ? state.description : "",
          priority: state.priority === 0 ? 4 : state.priority,
        })
      );
      setState({
        title: "",
        description: "",
        priority: 0,
      });

      hideF();
    }
  };
  return (
    <div className={s.container}>
      <h2 className={s.heading}>Create new task</h2>
      <form
        action="src/components/CreateTaskForm"
        onSubmit={check}
        className={s.form}
      >
        <input
          className={s.input__title}
          style={{ fontWeight: "bold" }}
          type="text"
          placeholder="title"
          ref={titleRef}
          value={state.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setState((state) => {
              return { ...state, title: e.target.value };
            })
          }
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            e.key === "Enter" ? check() : null
          }
        />
        <input
          className={s.input__description}
          type="text"
          placeholder="description (optional)"
          value={state.description}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setState((state) => {
              return { ...state, description: e.target.value };
            })
          }
        />

        <Select
          className={s.select}
          value={state.priority}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setState({ ...state, priority: Number(e.target.value) });
          }}
        >
          <option
            selected={true}
            disabled
            value={0}
            style={{ display: "none" }}
          >
            select priority
          </option>
          <option value={"1"}>priority 1</option>
          <option value={"2"}>priority 2</option>
          <option value={"3"}>priority 3</option>
          <option value={"4"}>none</option>
        </Select>

        <Button className={s.button} type={"submit"}>
          Create task
        </Button>
      </form>
    </div>
  );
};

export default CreateTaskForm;
