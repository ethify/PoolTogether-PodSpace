import React, { useEffect } from "react";
import "./App.scss";
import Toolbar from "./components/Toolbar/Toolbar";
import Home from "./components/Home";
import Modal from "./components/Modal";
import { useLocation } from "react-router-dom";

function App() {
  let location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, []);
  return (
    <div className="App">
      <Modal />
      <Toolbar></Toolbar>
      <Home></Home>
    </div>
  );
}

export default App;
