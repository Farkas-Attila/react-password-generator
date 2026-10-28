import PasswordGenerator from "./components/PasswordGenerator/PasswordGenerator";
import "./App.css";

export default function App() {
  return (
    <div>
      <PasswordGenerator length={15}/>
    </div>
  );
}