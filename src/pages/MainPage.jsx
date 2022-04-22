import React from "react";
import AddNewFactoryButton from "../components/AddNewFactoryButton";
import FactoriesList from "../components/FactoriesList";
import SearchFactoryForm from "../components/SearchFactoryForm";

const MainPage = () => {
  return (
    <>
      <AddNewFactoryButton />
      <SearchFactoryForm />
      <FactoriesList />
    </>
  );
};

export default MainPage;
