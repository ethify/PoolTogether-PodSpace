import React from "react";
import "./App.scss";
import Toolbar from "./components/Toolbar/Toolbar";
import Home from "./components/Home";
import Modal from "./components/Modal";

function App() {
  return (
    <div className="App">
      <Modal />
      <Toolbar></Toolbar>
      <Home></Home>
    </div>
  );
}

export default App;
