import axios from "axios"; 

/**
 * Fonction pour envoyer un log à l'API.
 * @param logData 
 * @returns response
 */
export const createLog = async (logData: any) => {
  const apiPort = import.meta.env.VITE_API_PORT;
  const url = `http://localhost:${apiPort}/logs`;

  try {
    const response = await axios.post(url, logData);
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
  const apiPort = import.meta.env.VITE_API_PORT;


  try {
    const response = await axios.get(`http://localhost:${apiPort}/logs/search`+logSearch.toString());
    console.log("getLogs response:", response.data);
    const logs = response.data;
    return logs;
  } catch (error) {
    console.error("Erreur lors de la récupération des logs :", error);
    alert("Erreur lors de la récupération des logs : " + error);
    return null;
  }
};
