import logo from "./firebase.png";
import "./App.css";
import { useEffect } from "react";
import { ganerateToken } from "./notification/firebase";
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
      <h1 style={{ fontWeight: "700", fontSize: "40px" }}>
        Firebase Push notification
      </h1>

      <img src={logo} className="App-logo" alt="logo" />
    </div>
  );
}

export default App;
