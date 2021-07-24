import React from "react";
import ReactDOM from "react-dom";
import InteractiveList from "./InteractiveList.js";
import "./styles.css";


function App() {

  const checkInput = (input) => input.length > 3;

  return (
    <div className="App">
      <InteractiveList error={!true} readOnly={!true} regexValidation={new RegExp(/[a-z]/g)} customValidation={checkInput}/>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
