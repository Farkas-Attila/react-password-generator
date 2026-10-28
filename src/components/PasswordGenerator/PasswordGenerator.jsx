import { useState } from "react";
import "./PasswordGenerator.css";

const MIN_LENGTH = 8;
const MAX_LENGTH = 20;
const DEFAULT_LENGTH = 12;

export default function PasswordGenerator({length = DEFAULT_LENGTH}) {
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const [passwordLength, setPasswordLength] = useState(
    length >= MIN_LENGTH &&
    length <= MAX_LENGTH
      ? length
      : DEFAULT_LENGTH
  );
  
  function createPassword() {
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxtz!@#$%^&*()_+?:{}[]ABCDEFGHIJKLMNOPQRSTUVWXTZ";
    let newPassword = "";

    for (let i = 0; i < passwordLength; i++) {
      const randomNum = Math.floor(Math.random() * chars.length);
      newPassword += chars.charAt(randomNum);
    }

    setPassword(newPassword);
  }

  function copyPassword() {
    if (!password) return;

    navigator.clipboard.writeText(password);
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  }

  return (
    <div className="password-container">
      <h1>Random Password Generator</h1>

      <div className="input-container">
        <input
          type="text"
          value={password}
          placeholder="Create Password"
          readOnly
          className="input"
        />
        <i className="fa-regular fa-copy fa-2x" onClick={copyPassword}></i>
      </div>

      <div className="length-container">
        <label htmlFor="length">
          Password Length (min={MIN_LENGTH}, max={MAX_LENGTH}):
        </label>
        <input
          id="length"
          type="number"
          min={MIN_LENGTH}
          max={MAX_LENGTH}
          value={passwordLength}
          onChange={(e) => {
            let value = Number(e.target.value);
            // input validation
            if (value < MIN_LENGTH) value = MIN_LENGTH;
            if (value > MAX_LENGTH) value = MAX_LENGTH;
            setPasswordLength(value);
          }}
        />
      </div>

      <button className="btn" onClick={createPassword}>
        Generate
      </button>

      <div className={`alert-container ${showAlert ? "" : "off-screen"}`}>
        Password copied!
      </div>
    </div>
  );
}