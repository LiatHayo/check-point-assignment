import React from "react";
import ReactDOM from "react-dom";
import InteractiveList from "./InteractiveList.js";
import "./styles.css";


function App() {

  return (
    <div className="App">
      <InteractiveList/>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
