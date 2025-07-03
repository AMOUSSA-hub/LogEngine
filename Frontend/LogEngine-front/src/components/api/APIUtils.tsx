// import axios from "axios"; 

export const createLog  = async (logData : string) => {

    //Récupérer les variables d'environnement pour l'URL et le port de l'API
    const apiUrl = import.meta.env.VITE_API_PORT.valueOf;
    const apiHost = import.meta.env.VITE_API_HOST.valueOf;
    console.log( apiHost ); 
  
    // const response = await axios.get()

    
  
}