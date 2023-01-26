import { NavLink } from "react-router-dom";
import s from "../css/Navigation.module.scss";
import React from "react";
import { AppRoutes } from "../constants";
import Wrapper from "../UI/Wrapper";

const setStyles = ({ isActive }: { isActive: any }) => {
  return isActive ? s.link_active : s.link;
};

const Navigation: React.FC = () => {
  return (
    <div className={s.container}>
      <Wrapper className={s.navigation}>
        <div className={s.pagesBlock}>
          <NavLink className={setStyles} to={AppRoutes.todos}>
            Home
          </NavLink>
          <NavLink className={setStyles} to={AppRoutes.completed}>
            Completed
          </NavLink>
        </div>
      </Wrapper>
    </div>
  );
};

export default Navigation;
