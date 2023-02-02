import React, { useContext, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import s from "./Burger.module.scss";
import MenuToggle from "./MenuToggle/MenuToggle";
import { Navigation } from "./Navigation/Navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import Button from "../Button/Button";
import { NavLink, useLocation } from "react-router-dom";
import { AppRoutes } from "../../constants";

import { useModalContext } from "../../context/ModalContext";

const NavLinkVariants = {
  visible: (custom: number) => ({
    opacity: 1,
    transition: {
      delay: 0.2 * custom,
    },
  }),
  hidden: (custom: number) => ({
    opacity: 0,
    transition: {
      delay: 0.15 * custom,
    },
  }),
};

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at calc(100% - 20px) 25px)`,

    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(20px at calc(100% - 30px) 30px)",

    transition: {
      delay: 0,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const overlayVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const links = [
  { name: "home", to: AppRoutes.todos },
  { name: "completed", to: AppRoutes.completed },
  { name: "plans", to: AppRoutes.not_found },
  { name: "goals", to: AppRoutes.not_found },
];

const Burger: React.FC = () => {
  const { pathname } = useLocation();
  const {
    menu: isOpened,
    setMenu: setIsOpened,
    setModal: showModal,
  } = useModalContext();
  const toggle = () => setIsOpened(!isOpened);

  useEffect(() => {
    setIsOpened(false);
  }, [pathname, setIsOpened]);

  return (
    <div>
      <motion.div
        className={s.header__burger}
        animate={isOpened ? "open" : "closed"}
      >
        <motion.div
          initial={false}
          className={s.burger__background}
          variants={sidebar}
          style={{ position: "fixed" }}
        />
        <MenuToggle toggle={toggle} />

        <AnimatePresence mode="wait">
          {isOpened && (
            <>
              <Navigation>
                <Button
                  className={s.header__burger__createTask}
                  onClick={() => {
                    showModal(true);
                    setIsOpened(false);
                  }}
                >
                  <span>Create new task</span>
                  <FontAwesomeIcon icon={faPlus} fontSize={"30px"} />
                </Button>

                {links.map((link, i) => (
                  <motion.div
                    key={link.name}
                    custom={i}
                    variants={NavLinkVariants}
                    animate={"visible"}
                    initial={"hidden"}
                    exit={"hidden"}
                    className={s.header__burger__nav__link}
                  >
                    <NavLink
                      className={({ isActive }) => (isActive ? s.active : "")}
                      to={link.to}
                    >
                      {link.name}
                    </NavLink>
                  </motion.div>
                ))}
              </Navigation>

              <motion.div
                onClick={() => setIsOpened(false)}
                className={s.header__burger__overlay}
                variants={overlayVariants}
                initial={"hidden"}
                animate={"visible"}
                exit={"hidden"}
                transition={{ duration: 0.3 }}
              />
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Burger;
