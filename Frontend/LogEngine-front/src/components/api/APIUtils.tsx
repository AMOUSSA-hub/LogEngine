import axios from "axios"; 

export const createLog  = async (logData : any) => {

    //Récupérer les variables d'environnement pour l'URL et le port de l'API
    const apiPort = import.meta.env.VITE_API_PORT;
  //const apiHost = import.meta.env.VITE_API_HOST; // L'erreur CORS n'est pas encore réglé donc on ne peut pas utiliser la vrai URL de l'API
    
  
    const response = await axios.post(
      'http://localhost:'+apiPort+'/logs', 
      logData
    )
    .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
    alert("Erreur lors de la création du log : "+ error.message);
  });

  return response;

    
  
}