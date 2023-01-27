import { NavLink } from "react-router-dom";
import s from "../css/Navigation.module.scss";
import React from "react";
import { AppRoutes } from "../constants";

const setStyles = ({ isActive }: { isActive: any }) => {
  return isActive ? s.link_active : s.link;
};

const Navigation: React.FC = () => {
  return (
    <div className={s.container}>
        <div className={s.mobileNav}>
        <NavLink to={AppRoutes.todos}>
          Home
        </NavLink>
        </div>
        <div className={s.pagesBlock}>
          <NavLink className={setStyles} to={AppRoutes.todos}>
            Home
          </NavLink>
          <NavLink className={setStyles} to={AppRoutes.completed}>
            Completed
          </NavLink>
        </div>
    </div>
  );
};

export default Navigation;
