import React, {createContext, Dispatch, SetStateAction, useContext, useState} from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./nullstyle.css";
import HomePage from "./pages/HomePage";
import Navigation from "./components/Navigation";
import CompletedPage from "./pages/CompletedPage";

import { AppRoutes } from "./constants";
import NewBurger from "./UI/Burger/NewBurger";
import Modal from "./UI/Modal";
import CreateTaskForm from "./components/CreateTaskForm";
import {AnimatePresence} from "framer-motion";
import ModalProvider, { useModalContext} from "./context/ModalContext";



function App() {
    const {modal} = useModalContext();
    console.log(modal);
  return (
    <div className={"App"}>

      <Navigation />
        <NewBurger/>
      <Routes>
        <Route path={AppRoutes.todos} element={<HomePage />} />
        <Route path={AppRoutes.completed} element={<CompletedPage />} />
      </Routes>

        <AnimatePresence>
            {modal && (
                <Modal>
                    <CreateTaskForm   />
                </Modal>
            )}
        </AnimatePresence>


    </div>
  );
}

export default App;
