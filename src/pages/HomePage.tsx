import React, { useState } from "react";
import TodoList from "../components/TodoList";
import CreateTaskForm from "../components/CreateTaskForm";
import Modal from "../UI/Modal";
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


const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();


  const searchQuery = useAppSelector((state) => state.todo.searchQuery);
  const sort = useAppSelector((state) => state.todo.currentSortUncompleted);

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
            <div>
              {/*<Button*/}
              {/*  style={{ borderRadius: "50%" }}*/}
              {/*  onClick={() => setModal((modal) => !modal)}*/}
              {/*>*/}
              {/*  <FontAwesomeIcon icon={faPlus} fontSize={"30px"} />*/}
              {/*</Button>*/}
            </div>
          </div>



          {/*<Burger isActive={menu} hideF={() => setMenu(!menu)}>*/}
          {/*  <h1 className={s.header}>sort & search</h1>*/}
          {/*  <SearchBar*/}
          {/*    value={searchQuery}*/}
          {/*    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>*/}
          {/*      dispatch(setSearchQuery(e.target.value))*/}
          {/*    }*/}
          {/*  />*/}
          {/*  <SortSelect*/}
          {/*    sort={sort}*/}
          {/*    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {*/}
          {/*      dispatch(setCurrentSort(e.target.value as SortType));*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    {SortOptions.map((el) => (*/}
          {/*      <option value={el} key={el}>*/}
          {/*        by {el}*/}
          {/*      </option>*/}
          {/*    ))}*/}
          {/*  </SortSelect>*/}
          {/*  <div>*/}
          {/*    <Button*/}
          {/*      style={{ borderRadius: "50%" }}*/}
          {/*      onClick={() => {*/}
          {/*         setMenu(!menu);*/}
          {/*        setModal((modal) => !modal)*/}
          {/*      }}*/}
          {/*    >*/}
          {/*      <FontAwesomeIcon icon={faPlus} fontSize={"30px"} />*/}
          {/*    </Button>*/}
          {/*  </div>*/}
          {/*</Burger>*/}
        </div>
      </Wrapper>


  );
};

export default HomePage;
