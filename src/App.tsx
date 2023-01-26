import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./nullstyle.css";
import HomePage from "./pages/HomePage";
import Navigation from "./components/Navigation";
import CompletedPage from "./pages/CompletedPage";
// import { PersistGate } from "redux-persist/integration/react";
// import { persistor } from "./store/store";
import { AppRoutes } from "./constants";


function App() {
  return (
    <div className={"App"}>
      <Navigation />
      <Routes>
        <Route path={AppRoutes.todos} element={<HomePage />} />
        <Route path={AppRoutes.completed} element={<CompletedPage />} />

      </Routes>
    </div>
  );
}

export default App;
