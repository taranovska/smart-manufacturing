import logo from "./logo.svg";
import "./App.css";
import NewFactoryForm from "./components/NewFactoryForm";
import Latlng from "react-input-latlng";
import FactoriesList from "./components/FactoriesList";

// https://my.api.mockaroo.com/smart_manufacturing.json?key=a252b490

function App() {
  return (
    <div>
      <FactoriesList />
      <NewFactoryForm />
    </div>
  );
}

export default App;
