import React, { useState } from "react";
import Wrapper from "../../UI/Wrapper/Wrapper";
import SearchBar from "../../UI/SearchBar/SearchBar";
import s from "../HomePage/HomePage.module.scss";
import TodoListCompleted from "../../components/TodoListCompleted";

const CompletedPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Wrapper className={s.wrapper}>
      <div className={s.HomePageWrapper}>
        <div className={s.todoBlock}>
          <TodoListCompleted searchQuery={searchQuery} />
        </div>

        <div className={s.todoFilters}>
          <SearchBar
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default CompletedPage;
