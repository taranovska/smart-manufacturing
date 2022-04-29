import React from "react";
import AddNewFactoryButton from "../components/AddNewFactoryButton";
import FactoriesList from "../components/FactoriesList";
import SearchFactoryForm from "../components/SearchFactoryForm";

const MainPage = () => {
  return (
    <>
      <SearchFactoryForm />
      <FactoriesList /> <AddNewFactoryButton />
    </>
  );
};

export default MainPage;
