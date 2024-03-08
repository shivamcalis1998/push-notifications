import logo from "./firebase.png";
import "./App.css";
import { useEffect, useState } from "react";
import { ganerateToken } from "./notification/firebase";
import { onMessage } from "firebase/messaging";
import { messaging } from "./notification/firebase";

function App() {
  const [formData1, setFormData1] = useState({
    title: "",
    body: "",
    image: "",
    token: "",
  });

  const [formData2, setFormData2] = useState({
    title: "",
    body: "",
    image: "",
  });

  const handleChangeForm1 = (e) => {
    const { name, value } = e.target;
    setFormData1((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeForm2 = (e) => {
    const { name, value } = e.target;
    setFormData2((prevData) => ({
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
      const res = await fetch(
        "https://push-notifications-backend.onrender.com/notificationPost",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        }
      );

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
      console.log("Notification sent successfully:", data);
    } catch (error) {
      console.error("Error sending notification:", error.message);
    }
  };

  const handleSubmitForm1 = (e) => {
    e.preventDefault();
    postNotification(formData1);
  };

  const getToken = async (formData2) => {
    const res = await fetch(
      "https://push-notifications-backend.onrender.com/token"
    );
    const data = await res.json();
    data.map(async (el) => {
      const newObj = {
        title: formData2.title,
        image: formData2.image,
        body: formData2.body,
        token: el.token,
      };
      await postNotification(newObj);
    });
  };

  const handleSubmitForm2 = (e) => {
    e.preventDefault();
    getToken(formData2);
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

      <div className="formDiv">
        <div>
          <h2>Form-1 With Token</h2>
          <form onSubmit={handleSubmitForm1}>
            <div>
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={formData1.title}
                onChange={handleChangeForm1}
              />
            </div>
            <div>
              <label>Body:</label>
              <input
                type="text"
                name="body"
                value={formData1.body}
                onChange={handleChangeForm1}
              />
            </div>
            <div>
              <label>Image URL:</label>
              <input
                type="text"
                name="image"
                value={formData1.image}
                onChange={handleChangeForm1}
              />
            </div>
            <div>
              <label>Token:</label>
              <input
                type="text"
                name="token"
                value={formData1.token}
                onChange={handleChangeForm1}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
        <div>
          <h2>Form-2 Without Token</h2>
          <form onSubmit={handleSubmitForm2}>
            <div>
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={formData2.title}
                onChange={handleChangeForm2}
              />
            </div>
            <div>
              <label>Body:</label>
              <input
                type="text"
                name="body"
                value={formData2.body}
                onChange={handleChangeForm2}
              />
            </div>
            <div>
              <label>Image URL:</label>
              <input
                type="text"
                name="image"
                value={formData2.image}
                onChange={handleChangeForm2}
              />
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
