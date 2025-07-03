import { useState, type FormEvent } from "react";
import { createLog } from "../api/APIUtils";


function LogCreatorForm() {

  const [error, setError] = useState("");
  
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
   
    event.preventDefault();
   //récupérer les données du formulaire
    const form = event.target as HTMLFormElement;
    const formData = new FormData(event.target as HTMLFormElement);
    const name_service  = formData.get("name_service");
    const message = formData.get("message");
    const level = formData.get("level");

    // Vérifier si les champs sont remplis
    if( name_service && message && level !== "[niveau]") {
    
    const  request_body = JSON.stringify({
      service:name_service,
      message: message,
      level:level,
      timestamp: new Date().toISOString()
    });

    
    console.log(request_body);

//Appeler l'API pour envoyer les données du formulaire
      createLog(request_body);

    form.reset();
    setError(""); 
    }
    // Si un des champs est vide, afficher un message d'erreur
    else{
      setError("Veuillez remplir tous les champs du formulaire.");
    
    }

  }
  return (
    <>

        <form className="flex flex-col gap-4 p-4  bg-white rounded-lg shadow-md dark:bg-gray-800" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Créer un log
        </h2>

         {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
        <input
          type="text"
          name="name_service"
          id="name_service"
          className="block min-w-0 py-1.5 pr-3 pl-1 text-base  bg-gray-50 rounded-lg border   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="nom du service"
        />

        <textarea
          name="message"
          id="message"
          className="block p-2.5 grow w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Message du service..."
        ></textarea>

        <select
          name="level"
          id="level"
          className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 "
        >
          <option selected>[niveau]</option>
          <option value="INFO">INFO</option>
          <option value="DEBUG">DEBUG</option>
          <option value="ERROR">ERROR</option>
          <option value="WARNING">WARNING</option>
        </select>

        <button
          type="submit"
          className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Envoyer
        </button>
      </form>
    
    
    
    </>
  );
}

export default LogCreatorForm;