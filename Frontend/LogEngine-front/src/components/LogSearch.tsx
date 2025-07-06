import { useEffect, useState } from "react";
import { getLogs } from "../api/APIUtils";
import DateRangePicker from "./DateRangePicker";
/**
 * Composant représentant la section de "Rechercher un log".
 * @returns 
 */
export default function LogSearch() {
  const [message, setMessage] = useState("");
  const [service, setService] = useState("");
  const [level, setLevel] = useState("");
  const [logs, setLogs] = useState<any[]>([]);
  const [socketAPICall,setsocketAPICall]= useState(0);
 

   useEffect(() => {
  const socket = new WebSocket('ws://localhost:8000/ws');
    // à l'ouverture de la connexion avec l'API 
    socket.onopen = () => console.log('Connected');
    // lorsque je reçoit un message de l'API
    socket.onmessage = (event) => {
      console.log("message de l'API reçue ! "+ event.data);
     setsocketAPICall(prev => prev + 1);
      console.log("données mis à jour")
    };
    // à la fermeture de l'API
    socket.onclose = () => console.log('Disconnected');
    
   
  
  }, []);

  

  // Surveille les valeurs des champs de recherche et les appels Socket de l'API
  useEffect(() => {
   const  logFilters = buildFilter();
    if (logFilters != "?") {
      getLogs(logFilters).then((data) => setLogs(data));
    } else {
      getLogs("").then((data) => setLogs(data));
    }
  }, [message, level, service,socketAPICall]);

  /**
   * Fonction qui assemble les filtres pour la requête GET
   * @returns query_params
   */
  const buildFilter = () => {
    let logFilter = "?";

    if (message.trim() !== "") {
      logFilter = logFilter + "q=" + message.trim() + "&";
    }
    if (service.trim() !== "") {
      logFilter = logFilter + "service=" + service.trim();
    }

    if (level != "[niveau]" && level != "") {
      logFilter = logFilter + "&level=" + level;
    }
    return logFilter;
  };

  return (
    <div className=" field-sizing-fixed  w-min[800px]  p-4  bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-2xl font-bold text-gray-900  dark:text-white">
        Rechercher un log
      </h2>

      {/* Section pour rechercher des logs */}
      <div>
        <div className="mt-3">
          <div className="flex  rounded-md bg-white pl-3 ">
            {/* Sélection niveau */}
            <select
              id="level"
              name="niveau"
              aria-label="level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              defaultValue="[niveau]"
              className=" p-3 text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            >
              <option selected>[niveau]</option>
              <option>INFO</option>
              <option>WARNING</option>
              <option>DEBUG</option>
              <option>ERROR</option>
            </select>

            {/* Champs pour rechercher avec le nom du service. */}
            <input
              type="text"
              name="service"
              id="service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="grid shrink-0 grid-cols-1 pl-3 text-gray-900 border-x-1 border-x-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
              placeholder="nom du service..."
            />

            {/* Champs pour rechercher avec le message du log. */}
            <input
              type="text"
              name="message"
              id="msg"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="block min-w-0 grow py-1.5 pl-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
              placeholder="message du log..."
            />
          </div>
        </div>

        
            {/* Sélection de la tranche de date */}
            <DateRangePicker/>         

      </div>
      {/* Tableau qui affiche les résultats des recherches de log. */}
      <div className=" overflow-scroll max-h-96">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
            <tr>
              <th scope="col" className="px-6 py-3">
                niveau
              </th>
              <th scope="col" className="px-6 py-3">
                service
              </th>
              <th scope="col" className="px-6 py-3">
                message
              </th>
              <th scope="col" className="px-6 py-3">
                Temps
              </th>
            </tr>
          </thead>
          <tbody className="field-sizing-fixed w-full h-full">
            {logs.map((log, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
              >
                <th className="px-6 py-4">{log["_source"].level}</th>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {log["_source"].service}
                </td>
                <td className="px-6 py-4">{log["_source"].message}</td>
                <td className="px-6 py-4">{log["_source"].timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
