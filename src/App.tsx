import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import "./nullstyle.css";
import HomePage from "./pages/HomePage/HomePage";
import Navigation from "./components/Navigation/Navigation";
import CompletedPage from "./pages/CompletedPage/CompletedPage";

import { AppRoutes } from "./constants";
import Burger from "./UI/Burger/Burger";
import Modal from "./UI/Modal/Modal";
import CreateTaskForm from "./components/CreateTaskForm/CreateTaskForm";
import { AnimatePresence } from "framer-motion";
import { useModalContext } from "./context/ModalContext";

function App() {
  const { modal } = useModalContext();
  console.log(modal);
  const { pathname } = useLocation();

  const navigate = useNavigate();

  console.log(JSON.stringify(pathname));

  useEffect(() => {
    if (pathname !== AppRoutes.todos && pathname !== AppRoutes.completed) {
      navigate(AppRoutes.todos);
    }
  }, [pathname]);

  return (
    <div className={"App"}>
      <Navigation />
      <Burger />
      <Routes>
        <Route path={AppRoutes.todos} element={<HomePage />} />
        <Route path={AppRoutes.completed} element={<CompletedPage />} />
      </Routes>

      <AnimatePresence>
        {modal && (
          <Modal>
            <CreateTaskForm />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
