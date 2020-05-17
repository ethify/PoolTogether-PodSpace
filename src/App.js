import React from "react";
import "./App.scss";
import Toolbar from "./components/Toolbar/Toolbar";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <Toolbar></Toolbar>
      <Home></Home>
    </div>
  );
}

export default App;
