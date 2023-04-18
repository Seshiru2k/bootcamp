import { useState } from "react";

const Forms = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [age, setAge] = useState();
  const [display, setDisplay] = useState();

  const onSubmit = (e) => {
    e.preventDefault();
    setDisplay(`I'm ${firstName} ${lastName} and I'm ${age} years old`);
  };

  return (
    <div>
      <form>
        <label>First Name </label>
        <input
          type="string"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <br />
        <label>Last Name </label>
        <input
          type="string"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
        <br />
        <label>Age </label>
        <input
          type="number"
          value={age}
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
        <br />
        <br />
        <button
          onClick={(e) => {
            onSubmit(e);
          }}
        >
          Submit
        </button>
        <p>{display}</p>
      </form>
    </div>
  );
};

export default Forms;