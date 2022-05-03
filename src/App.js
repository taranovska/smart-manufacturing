import logo from "./logo.svg";
import "./App.css";
import NewFactoryForm from "./components/NewFactoryForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import { Provider } from "react-redux";
import { applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import reducer from "./reducer";
import EditFactoryForm from "./components/EditFactoryForm";
import NewLocationForm from "./components/NewLocationForm";

const store = configureStore({ reducer }, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="app">
          <Routes>
            <Route exact path="/:id" element={<EditFactoryForm />} />
            <Route exact path="/newFactory" element={<NewFactoryForm />} />
            <Route
              exact
              path="/newLocation/:id"
              element={<NewLocationForm />}
            />
            <Route exact path="/" element={<MainPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
