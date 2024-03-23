import React from "react";

const PersonForm = ({ nameRef, numberRef, handleSunmit }) => {
  return (
    <form onSubmit={handleSunmit}>
      <h2>Add a new Contact</h2>
      <p>
        name: <input name="name" ref={nameRef} required />{" "}
      </p>
      <p>
        number:{" "}
        <input name="number" ref={numberRef} required />{" "}
      </p>
      <button type="submit">add</button>
    </form>
  );
};

export default PersonForm;
