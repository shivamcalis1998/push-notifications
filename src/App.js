import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import { ganerateToken } from "./notif/firebase";
import { getMessaging, onMessage } from "firebase/messaging";

function App() {
  useEffect(() => {
    ganerateToken();

    onMessage(getMessaging, (payload) => {
      console.log(payload);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
