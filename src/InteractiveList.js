import React, { useState } from "react";
import Item from "./Item";
import NewInteractiveForm from "./NewInteractiveForm";
import uuid from "uuid";
import "./InteractiveList.css";

function InteractiveList({regexValidation, customValidation, error, readOnly}) {
  const [items, setItems] = useState([]);

  const create = (newItem) => {
    setItems([...items, newItem]);
  };

  const remove = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const update = (id, updtedText) => {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        return { ...item, text: updtedText };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const checkValidation = (input) => {
    if(regexValidation && (regexValidation instanceof RegExp)){
      if(!regexValidation.test(input)) return false;
    }
    if(!!customValidation && typeof customValidation === "function"){
      if(!customValidation(input)) return false;
    }
    return true;
  }

  const itemsList = items.map(item => (
    <Item
      update={update}
      remove={remove}
      key={item.id}
      item={item}
      readOnly={readOnly}
      checkValidation={checkValidation}
    />
  ));

  return (
    <div className={"InteractiveList " + (error ? "redBorder" : "grayBorder")}>
      <h1>Interactive List</h1>
      {!readOnly && <NewInteractiveForm 
        createItem={create} 
        regexValidation={regexValidation}
        customValidation={customValidation}
        isListEmpty={itemsList.length === 0}
        checkValidation={checkValidation}
      />}
      {itemsList.length > 0 ? <ul>{itemsList}</ul> : <h5><i>No Network / IP Address / IP range or Domain Added just yet</i></h5>}
    </div>
  );
}

export default InteractiveList;
