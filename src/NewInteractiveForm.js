import React, { useState, useReducer } from "react";
import uuid from "uuid";
import "./NewInteractiveForm.css";

function NewInteractiveForm({ createItem, isListEmpty, checkValidation }) {
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      text: ""
    }
  );

  const [inputError, setInputError] = useState(false);

  const handleChange = (evt) => {
    setInputError(false);
    setUserInput({ [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const newItem = { id: uuid(), text: userInput.text};
    const isValid = checkValidation(userInput.text);
    if(isValid) {
      createItem(newItem);
      setUserInput({ text: "" });
    } else {
      setInputError(true);
    }
  };

  return (
    <form className={"NewInteractiveForm " + (inputError ? 'error' : '')} onSubmit={handleSubmit}>
      <input
        value={userInput.text}
        onChange={handleChange}
        id="text"
        type="text"
        name="text"
        placeholder="(e.g: www.website.com/) use Enter or + to add it to list"
      />
      {!inputError ? 
        <button className={isListEmpty ? "lightGrayButton" : "transparentButton"}><i className="fas fa-plus"/></button> 
        :
        <span><i className="fas fa-exclamation-circle"></i></span>}
    </form>
  );
}

export default NewInteractiveForm;
