import React, {useState} from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./nullstyle.css";
import HomePage from "./pages/HomePage";
import Navigation from "./components/Navigation";
import CompletedPage from "./pages/CompletedPage";
// import { PersistGate } from "redux-persist/integration/react";
// import { persistor } from "./store/store";
import { AppRoutes } from "./constants";
import NewBurger from "./UI/Burger/NewBurger";
import Modal from "./UI/Modal";
import CreateTaskForm from "./components/CreateTaskForm";


function App() {
    const [menu, setMenu] = useState(false);
    const [modal, setModal] = useState(false);
  return (
    <div className={"App"}>
      <Navigation />
        <NewBurger flag={menu} onChange={setMenu} showModal={(modal: boolean) => setModal(modal)}/>
      <Routes>
        <Route path={AppRoutes.todos} element={<HomePage />} />
        <Route path={AppRoutes.completed} element={<CompletedPage />} />
      </Routes>

        {modal && (
            <Modal

                hideF={() => setModal((modal) => !modal)}
            >
                <CreateTaskForm hideModal={() => setModal((modal) => !modal)} />
            </Modal>
        )}
    </div>
  );
}

export default App;
