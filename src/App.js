import logo from "./logo.svg";
import "./App.css";
import NewFactoryForm from "./components/NewFactoryForm";
import Latlng from "react-input-latlng";
import FactoriesList from "./components/FactoriesList";
import SearchFactoryForm from "./components/SearchFactoryForm";
import AddNewFactoryButton from "./components/AddNewFactoryButton";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import MainPage from "./pages/MainPage";

// https://my.api.mockaroo.com/smart_manufacturing.json?key=a252b490

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route exact path="/newFactory" element={<NewFactoryForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
