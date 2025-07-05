import { useEffect, useState } from "react";
import { getLogs } from "../api/APIUtils";
function LogSearch() {

  
  
  const [message, setMessage] = useState('');
  const [service, setService] = useState('');
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    console.log("Composant LogSearch monté");
    getLogs().then((data) => setLogs(data));

  }, [message]);

  

  return (
   
    <div className="p-4  bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-2xl font-bold text-gray-900  dark:text-white">
          Rechercher un log
        </h2>
      
        {/* Section pour rechercher des logs */}
        <div>
          <div className="mt-3">
            <div className="flex  rounded-md bg-white pl-3 ">
              <select
                id="level"
                name="niveau"
                aria-label="level"
                className=" p-3 text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              >
                <option>[niveau]</option>
                <option>INFO</option>
                <option>WARNING</option>
                <option>DEBUG</option>
                <option>ERROR</option>
              </select>

              <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                <select
                  id="service"
                  name="service"
                  aria-label="service"
                  value={service}
                onChange={(e) => setService(e.target.value)}
                  className="  text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                >
                  <option>[service]</option>
                  <option>api-gateway</option>
                  <option>user-service</option>
                </select>
              </div>
              <input
                type="text"
                name="message"
                id="msg"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                placeholder="message du log..."
              />
            </div>
          </div>

          <div
            id="date-range-picker"
            date-rangepicker
            className="flex items-center"
          >
            <div
              id="date-range-picker"
              date-rangepicker
              className="flex items-center"
            >
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                  </svg>
                </div>
                <input
                  id="datepicker-range-start"
                  name="start"
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Select date start"
                />
              </div>
              <span className="mx-4 text-gray-500">to</span>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                  </svg>
                </div>
                <input
                  id="datepicker-range-end"
                  name="end"
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Select date end"
                />
              </div>
            </div>
          </div>
        </div>

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
            <tbody className=" h-50">
              
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
      <td className="px-6 py-4">
        {log["_source"].timestamp}
      </td>
    </tr>
  ))}
              
              
              {/* <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th className="px-6 py-4 ">INFO</th>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  api-gateway
                </td>
                <td className="px-6 py-4">User created successfully</td>
                <td className="px-6 py-4">2023-10-01 12:00:00</td>
              </tr> */}


            </tbody>
          </table>
        </div>
      </div>
   
 
  );
}

export default LogSearch;