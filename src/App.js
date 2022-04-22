import logo from "./logo.svg";
import "./App.css";
import NewFactoryForm from "./components/NewFactoryForm";
import Latlng from "react-input-latlng";

// https://my.api.mockaroo.com/smart_manufacturing.json?key=a252b490

function App() {
  return (
    <div>
      <NewFactoryForm />
    </div>
  );
}

export default App;
