// import { useState } from 'react'

import "./App.css";
import LogCreatorForm from "./components/forms/LogCreatorForm";
import LogSearch from "./components/LogSearch";

function App() {
  return (
    <>
    {/* Titre */}
      <div className="flex  justify-center items-center p-5 bg-gray-100 dark:bg-gray-900">
        
        <img
          className="h-auto max-w-20"
          src="LogEngine_logo.png"
          alt="image description"
        />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          LogEngine
        </h1>
      </div>

   <div className="flex mask_contain  gap-10 p-20 bg-gray-100 dark:bg-gray-900">   
      {/* Section pour ajouter un log */}
      <LogCreatorForm />    
       {/* Section pour chercher un log */}
      <LogSearch/>
    </div>
    </>
  );
}

export default App;
