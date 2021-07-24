import React, { useState } from "react";
import "./Item.css";

function Item({ item, remove, update, readOnly, checkValidation }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(item.text);
  const [inputError, setInputError] = useState(false);

  const handleClick = (evt) => {
    remove(evt.target.id);
  };

  const toggleFrom = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdate = (evt) => {
    evt.preventDefault();
    if(text.length > 0) {
      const isValid = checkValidation(text);
      if(isValid) {
        update(item.id, text);
        toggleFrom();
      } else {
        setInputError(true);
      }
    }
  };

  const handleChange = (evt) => {
    setInputError(false);
    setText(evt.target.value);
  };

  let result;
  if (isEditing) {
    result = (
      <div className="Item">
        <form className={"Item-edit-form " + (inputError ? 'error' : '')} onSubmit={handleUpdate}>
          <input onChange={handleChange} value={text} type="text" />
          {!inputError ? <button>Save</button> : <span><i className="fas fa-exclamation-circle"></i></span>}
        </form>
      </div>
    );
  } else {
    result = (
      <div className="Item">
        <li
          id={item.id}
          className="Item-text"
        >
          {item.text}
        </li>
        <div className="Item-buttons">
          <button className={readOnly ? "disableButton" : "cursorButton"} disabled={readOnly} onClick={toggleFrom}>
            <i className="fas fa-pen" />
            </button>
          <button className={readOnly ? "disableButton" : "cursorButton"} disabled={readOnly} onClick={handleClick}>
            <i id={item.id} className="fas fa-trash" />
          </button>
        </div>
      </div>
    );
  }
  return result;
}

export default Item;
