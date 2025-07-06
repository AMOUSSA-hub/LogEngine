import axios from "axios"; 

//Sera utile lorsque le front sera déployé dans une machine exclusive à lui avec son propre navigateur 
// const apiPort = import.meta.env.VITE_API_PORT;
// const apiHost = import.meta.env.VITE_API_HOST;
/**
 * Fonction pour envoyer un log à l'API.
 * @param logData 
 * @returns response
 */
export const createLog = async (logData: any) => {
  try {
    const response = await axios.post(`http://localhost:8000/logs`, logData);
    alert("log créé avec succès !")
    console.log("Log créé :", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Erreur lors de la création du log :", error.message);
    alert("Erreur lors de la création du log : " + error.message);
    return null;
  }
};


/**
 * Fonction de recherche de log avec l'API.
 * @param logSearch 
 * @returns logs
 */
export const getLogs = async (logSearch : any) => {

  try {
    const response = await axios.get(`http://localhost:8000/logs/search`+logSearch.toString());
    console.log("Les logs reçus :", response.data);
    const logs = response.data;
    return logs;
  } catch (error) {
    console.error("Erreur lors de la récupération des logs :", error);
    alert("Erreur lors de la récupération des logs : " + error);
    return null;
  }
};




