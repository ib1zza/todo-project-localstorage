import { NavLink } from "react-router-dom";
import s from "./Navigation.module.scss";
import React, { useEffect, useState } from "react";
import { AppRoutes } from "../../constants";
import Wrapper from "../../UI/Wrapper/Wrapper";
import MobileNav from "./MobileNav";

const setStyles = ({ isActive }: { isActive: any }) => {
  return isActive ? s.link_active : s.link;
};

const Navigation: React.FC = () => {
  const [pageWidth, setPageWidth] = useState(
    document.documentElement.scrollWidth
  );

  useEffect(() => {
    function listener() {
      setPageWidth(document.documentElement.scrollWidth);
    }
    window.addEventListener(`resize`, listener);
    return () => window.removeEventListener("resize", listener);
  }, []);
  return (
    <div className={s.container}>
      <Wrapper>
        {pageWidth < 570 && <MobileNav />}
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
