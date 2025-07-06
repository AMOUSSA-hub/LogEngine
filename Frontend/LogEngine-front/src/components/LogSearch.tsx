import { useEffect, useState } from "react";
import { getLogs } from "../api/APIUtils";
import DateRangePicker from "./DateRangePicker";
// import DateRangePicker from "./DateRangePicker";
/**
 * Composant représentant la section de "Rechercher un log".
 * @returns
 */
export default function LogSearch() {
  const [message, setMessage] = useState("");
  const [service, setService] = useState("");
  const [level, setLevel] = useState("");
  const [logs, setLogs] = useState<any[]>([]);
  const [socketAPICall, setsocketAPICall] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  //Mettre en place le WebSocket
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/ws");
    // à l'ouverture de la connexion avec l'API
    socket.onopen = () => console.log("Websocket connecté ! ");
    // lorsque je reçoit un message de l'API
    socket.onmessage = (event) => {
      console.log("message de l'API reçue:" + event.data);
      setsocketAPICall((prev) => prev + 1);
      console.log("Données locales mise à jour !");
    };
    // à la fermeture de l'API
    socket.onclose = () => console.log("Déconnexion du webSocket !");
   
  }, []);

  // Surveille les valeurs des champs de recherche et les appels Socket de l'API
  useEffect(() => {
    
    refreshLogs( buildFilter());
  }, [message, level, service, socketAPICall]);

  /**
   * Fonction qui appelle la méthode GET /logs de l'API et mets à jour le tableau de logs
   * @param logFilters 
   */
  async function refreshLogs(logFilters: string) {
    await getLogs(logFilters).then((data) => {
      setLogs(data);
     
    });

  }

  /**
   * Fonction qui assemble les filtres pour la requête GET
   * @returns query_params
   */
  const buildFilter = (pagination  =-1) => {
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
    if (pagination !== -1 && logs.length > 0) {
      logFilter = logFilter + "&p="+pagination;
    }
    if (logFilter == "?") {
      logFilter = "";
    }

    return logFilter;
  };
/**
 * Fonction qui gère le changement de Page.
 * @param direction 
 */
  const changePage = (direction: number) => {
    if (direction == -1 && currentPage > 1) {
      console.log("Tu veux reculer d'une page.");
      //TODO
      //  Revenir aux pages précédentes en appelant l'API avec une liste d'ancien id de sorting
         setCurrentPage(prev => prev-1)
    }

    if (direction == 1) {
      console.log("Tu veux avancer d'une page.");
      const lastElementIdSorting =logs[logs.length-1]["sort"][0] 
      refreshLogs(buildFilter(lastElementIdSorting));
      setCurrentPage(prev =>prev+1)
    }
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
              className=" p-3 text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            >
              <option>[niveau]</option>
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

        {/* Sélection de la tranche de date [PAS FONCTIONNEL] */}
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
      <div className="flex">
        {/* <!-- Previous Button --> */}
        <a
          onClick={() => changePage(-1)}
          className="flex items-center justify-center px-4 h-10 me-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <svg
            className="w-3.5 h-3.5 me-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 5H1m0 0 4 4M1 5l4-4"
            />
          </svg>
          {/* <!-- Next Button --> */}
        </a>
        <a
          onClick={() => changePage(1)}
          className="flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <svg
            className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
