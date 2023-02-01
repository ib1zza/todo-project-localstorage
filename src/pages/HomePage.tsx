import React, { useContext, useEffect, useState } from "react";
import TodoList from "../components/TodoList";

import Button from "../UI/Button";
import Wrapper from "../UI/Wrapper";
import s from "../css/HomePage.module.scss";
import SortSelect from "../components/SortSelect";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import SearchBar from "../UI/SearchBar";
import { setCurrentSort, setSearchQuery } from "../store/reducers/TodoSlice";

import { SortOptions, SortType } from "../types";
import { useModalContext } from "../context/ModalContext";

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { setModal } = useModalContext();
  const [pageWidth, setPageWidth] = useState(
    document.documentElement.scrollWidth
  );
  const searchQuery = useAppSelector((state) => state.todo.searchQuery);
  const sort = useAppSelector((state) => state.todo.currentSortUncompleted);
  useEffect(() => {
    function listener() {
      setPageWidth(document.documentElement.scrollWidth);
    }
    window.addEventListener(`resize`, listener);
    return () => window.removeEventListener("resize", listener);
  }, []);
  return (
    <Wrapper className={s.wrapper}>
      <div className={s.HomePageWrapper}>
        <div className={s.todoBlock}>
          <TodoList />
        </div>

        <div className={s.todoFilters}>
          <SearchBar
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              dispatch(setSearchQuery(e.target.value))
            }
          />
          <SortSelect
            sort={sort}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              dispatch(setCurrentSort(e.target.value as SortType));
            }}
          >
            {SortOptions.map((el) => (
              <option value={el} key={el}>
                by {el}
              </option>
            ))}
          </SortSelect>

          {pageWidth > 570 && (
            <Button
              className={s.button__new}
              style={{ borderRadius: "50%" }}
              onClick={() => setModal(true)}
            >
              <FontAwesomeIcon icon={faPlus} fontSize={"30px"} />
            </Button>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default HomePage;
