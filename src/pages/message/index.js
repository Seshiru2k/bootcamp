import Head from "next/head";
import Content from "@components/title/content";
import { useState } from "react";


export default function Calculator() {
  const [result, setResult] = useState("");

  const handleButtonClick = (value) => {
    setResult(result + value);
  };

  const handleClearClick = () => {
    setResult("");
  };

  const handleEqualClick = () => {
    setResult(eval(result));
  };

  return (
    <>
      <Head>
        <title>Calculator</title>
      </Head>
      <div style={{ display: "flex", justifyContent: "center", backgroundImage: "linear-gradient(to top, #f7f4f4, #f7296d)"}}>
        <Content name="Calculator" />
        <div>
        <br>
         </br>
          <p>Result: {result}</p>
          <div>
            <button onClick={() => handleButtonClick("7")}>7</button>
            <button onClick={() => handleButtonClick("8")}>8</button>
            <button onClick={() => handleButtonClick("9")}>9</button>
            <button onClick={() => handleButtonClick("/")}>/</button>
          </div>
          <div>
            <button onClick={() => handleButtonClick("4")}>4</button>
            <button onClick={() => handleButtonClick("5")}>5</button>
            <button onClick={() => handleButtonClick("6")}>6</button>
            <button onClick={() => handleButtonClick("*")}>*</button>
          </div>
          <div>
            <button onClick={() => handleButtonClick("1")}>1</button>
            <button onClick={() => handleButtonClick("2")}>2</button>
            <button onClick={() => handleButtonClick("3")}>3</button>
            <button onClick={() => handleButtonClick("-")}>-</button>
          </div>
          <div>
            <button onClick={() => handleButtonClick("0")}>0</button>
            <button onClick={() => handleButtonClick("+")}>+</button>
            <button onClick={() => handleEqualClick()}>=</button>
          </div>
          <button onClick={() => handleClearClick()}>Clear</button>
        </div>
      </div>
    </>
  );
}
