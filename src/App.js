import "./App.css";
import React, { useEffect, useState } from "react";
import { GiAbstract015 } from "react-icons/gi";
function App() {
  const [advice, setAdvice] = useState();
  const [login, setLogin] = useState(true);
  async function dataFetchHandler() {
    try {
      await fetch("https://api.adviceslip.com/advice")
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          setAdvice([data]);
          setLogin(false);
        });
    } catch (error) {
      console.log("error");
    }
  }
  useEffect(() => {
    dataFetchHandler();
  }, []);

  const clickHandler = (e) => {
    e.preventDefault();
    dataFetchHandler();
  };

  return (
    <div className="App">
      {login && (
        <div>
          <p>Login...</p>
        </div>
      )}
      {!login &&
        advice?.map((item) => {
          return (
            <div className="card" key={item.slip.id}>
              <h5 className="title">Advice : {item.slip.id}</h5>
              <p>{item.slip.advice}</p>
              <button onClick={clickHandler}>
                <GiAbstract015 />
              </button>
            </div>
          );
        })}
    </div>
  );
}

export default App;
