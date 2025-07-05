import axios from "axios"; 

export const createLog = async (logData: any) => {
  const apiPort = import.meta.env.VITE_API_PORT;
  const url = `http://localhost:${apiPort}/logs`;

  try {
    const response = await axios.post(url, logData);
    console.log("Log créé :", response.data);
    return response.data; // retourne les données utiles
  } catch (error: any) {
    console.error("Erreur lors de la création du log :", error.message);
    alert("Erreur lors de la création du log : " + error.message);
    return null;
  }
};


export const getLogs = async () => {
  const apiPort = import.meta.env.VITE_API_PORT;

  try {
    const response = await axios.get(`http://localhost:${apiPort}/logs/search?`);
    console.log("getLogs response:", response.data);
    const logs = response.data;
    return logs;
  } catch (error) {
    console.error("Erreur lors de la récupération des logs :", error);
    alert("Erreur lors de la récupération des logs : " + error);
    return null;
  }
};
