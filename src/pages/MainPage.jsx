import React from "react";
import AddNewFactoryButton from "../components/AddNewFactoryBtn";
import FactoriesList from "../components/FactoriesList";
import SearchFactoryInput from "../components/SearchFactoryInput";

const MainPage = () => {
  return (
    <>
      <AddNewFactoryButton />
      <SearchFactoryInput />
      <FactoriesList />
    </>
  );
};

export default MainPage;
