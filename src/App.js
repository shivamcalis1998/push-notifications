import logo from "./firebase.png";
import "./App.css";
import { useEffect, useState } from "react";
import { ganerateToken } from "./notification/firebase";
import { getMessaging, onMessage } from "firebase/messaging";
import { messaging } from "./notification/firebase";
function App() {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    image: "",
    token: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const postNotification = async (formData) => {
    const obj = {
      title: formData.title,
      image: formData.image,
      body: formData.body,
      token: formData.token,
    };
    try {
      const res = await fetch("https://push-notifications-backend.onrender.com/notificationPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
      console.log("Notification sent successfully:", data);
    } catch (error) {
      console.error("Error sending notification:", error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postNotification(formData);
    // setFormData({
    //   title: "",
    //   body: "",
    //   image: "",
    //   token: "",
    // });
  };

  useEffect(() => {
    ganerateToken();

    onMessage(messaging, (payload) => {
      console.log(payload);
      const { title, body, image } = payload.notification;
      const notificationOptions = {
        body,
        icon: image,
      };
      new Notification(title, notificationOptions);
    });
  }, []);

  return (
    <div className="App">
      <h1 style={{ fontWeight: "700", fontSize: "40px" }}>
        Firebase Push notification
      </h1>

      <img src={logo} className="App-logo" alt="logo" />

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Body:</label>
          <input
            type="text"
            name="body"
            value={formData.body}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Token:</label>
          <input
            type="text"
            name="token"
            value={formData.token}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
