import { NavLink, useLocation } from "react-router-dom";
import s from "./Navigation.module.scss";
import React, { useEffect } from "react";
import { AppRoutes } from "../../constants";
import Wrapper from "../../UI/Wrapper/Wrapper";

const setStyles = ({ isActive }: { isActive: any }) => {
  return isActive ? s.link_active : s.link;
};

const Navigation: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {}, [pathname]);
  return (
    <div className={s.container}>
      <Wrapper>
        <div className={s.mobileNav}>
          <NavLink to={AppRoutes.todos}>Home</NavLink>
        </div>
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
