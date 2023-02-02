import React, { useEffect } from "react";
import s from "./Navigation.module.scss";
import { NavLink, useLocation } from "react-router-dom";
import { AppRoutes } from "../../constants";

const MobileNav = () => {
  const { pathname } = useLocation();
  useEffect(() => {}, [pathname]);
  return (
    <div className={s.mobileNav}>
      <NavLink to={AppRoutes.todos}>{pathname.slice(1).toUpperCase()}</NavLink>
    </div>
  );
};

export default MobileNav;
