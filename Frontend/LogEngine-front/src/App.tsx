import { useState } from 'react'

import './App.css'

function App() {

  return (
    <>
    <div class="flex ">
      
<img class="h-auto max-w-50" src="./src/assets/LogEngine_logo.png" alt="image description"/>
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white" >LogEngine</h1>   
    
    </div>
    <form class="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Envoyer un log</h2>

        <input 
              type="text"
              name="message"
              id="msg"
              class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base  bg-gray-50 rounded-lg border   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="nom du service"
            />


  <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Message du service..."></textarea>


 <select id="level" class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 ">
    <option selected>[niveau]</option>
    <option value="INFO">INFO</option>
    <option value="DEBUG">DEBUG</option>
    <option value="ERROR">ERROR</option>
    <option value="WARNING">WARNING</option>
  </select>

   <button type="submit" class="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Envoyer</button>

    
    </form>






    
      <div>
        <div class="mt-3">
          <div class="flex  rounded-md bg-white pl-3 ">
            
           
              <select
                id="level"
                name="niveau"
                aria-label="level"
                class=" p-3 text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              >
                <option>[niveau]</option>
                <option> </option>
                <option>INFO</option>
                <option>WARNING</option>
                <option>DEBUG</option>
                <option>ERROR</option>
              </select>
             
            
            <div class="grid shrink-0 grid-cols-1 focus-within:relative">
              <select
                id="service"
                name="service"
                aria-label="service"
                class="  rounded-md pr-7 pl-3  text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              >
                <option>[service]</option>
                <option> </option>
                <option>api-gateway</option>
                <option>user-service</option>
              </select>
            
            </div>
            <input
              type="text"
              name="message"
              id="msg"
              class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
              placeholder="message du log..."
            />
          </div>
        </div>



        <div id="date-range-picker" date-rangepicker class="flex items-center">
          <div id="date-range-picker" date-rangepicker class="flex items-center">
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                </svg>
            </div>
            <input id="datepicker-range-start" name="start" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date start"/>
          </div>
          <span class="mx-4 text-gray-500">to</span>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                </svg>
            </div>
            <input id="datepicker-range-end" name="end" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date end"/>
        </div>
        </div>
        </div>



      </div>




      
      
     

        <div class=" overflow-scroll max-h-96">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            niveau
                        </th>
                        <th scope="col" class="px-6 py-3">
                            service
                        </th>
                        <th scope="col" class="px-6 py-3">
                            message
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Temps
                        </th>
                    </tr>
                </thead>
                <tbody class=" h-50" >
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                        <th class="px-6 py-4 ">
                            INFO
                        </th>
                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            api-gateway
                        </td>
                        <td class="px-6 py-4">
                            User created successfully
                        </td>
                        <td class="px-6 py-4">
                            2023-10-01 12:00:00
                        </td>
                    </tr>
                     <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                        <th class="px-6 py-4 ">
                            INFO
                        </th>
                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            api-gateway
                        </td>
                        <td class="px-6 py-4">
                            User created successfully
                        </td>
                        <td class="px-6 py-4">
                            2023-10-01 12:00:00
                        </td>
                    </tr>
                     <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                        <th class="px-6 py-4 ">
                            INFO
                        </th>
                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            api-gateway
                        </td>
                        <td class="px-6 py-4">
                            User created successfully
                        </td>
                        <td class="px-6 py-4">
                            2023-10-01 12:00:00
                        </td>
                    </tr>
                     <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                        <th class="px-6 py-4 ">
                            INFO
                        </th>
                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            api-gateway
                        </td>
                        <td class="px-6 py-4">
                            User created successfully
                        </td>
                        <td class="px-6 py-4">
                            2023-10-01 12:00:00
                        </td>
                    </tr>
                     <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                        <th class="px-6 py-4 ">
                            INFO
                        </th>
                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            api-gateway
                        </td>
                        <td class="px-6 py-4">
                            User created successfully
                        </td>
                        <td class="px-6 py-4">
                            2023-10-01 12:00:00
                        </td>
                    </tr>
                     <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                        <th class="px-6 py-4 ">
                            INFO
                        </th>
                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            api-gateway
                        </td>
                        <td class="px-6 py-4">
                            User created successfully
                        </td>
                        <td class="px-6 py-4">
                            2023-10-01 12:00:00
                        </td>
                    </tr>
                     <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                        <th class="px-6 py-4 ">
                            INFO
                        </th>
                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            api-gateway
                        </td>
                        <td class="px-6 py-4">
                            User created successfully
                        </td>
                        <td class="px-6 py-4">
                            2023-10-01 12:00:00
                        </td>
                    </tr>
                     <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                        <th class="px-6 py-4 ">
                            INFO
                        </th>
                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            api-gateway
                        </td>
                        <td class="px-6 py-4">
                            User created successfully
                        </td>
                        <td class="px-6 py-4">
                            2023-10-01 12:00:00
                        </td>
                    </tr>
                     <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                        <th class="px-6 py-4 ">
                            INFO
                        </th>
                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            api-gateway
                        </td>
                        <td class="px-6 py-4">
                            User created successfully
                        </td>
                        <td class="px-6 py-4">
                            2023-10-01 12:00:00
                        </td>
                    </tr>
                     <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                        <th class="px-6 py-4 ">
                            INFO
                        </th>
                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            api-gateway
                        </td>
                        <td class="px-6 py-4">
                            User created successfully
                        </td>
                        <td class="px-6 py-4">
                            2023-10-01 12:00:00
                        </td>
                    </tr>
                     <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                        <th class="px-6 py-4 ">
                            INFO
                        </th>
                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            api-gateway
                        </td>
                        <td class="px-6 py-4">
                            User created successfully
                        </td>
                        <td class="px-6 py-4">
                            2023-10-01 12:00:00
                        </td>
                    </tr>
                     <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                        <th class="px-6 py-4 ">
                            INFO
                        </th>
                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            api-gateway
                        </td>
                        <td class="px-6 py-4">
                            User created successfully
                        </td>
                        <td class="px-6 py-4">
                            2023-10-01 12:00:00
                        </td>
                    </tr>
                     <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                        <th class="px-6 py-4 ">
                            INFO
                        </th>
                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            api-gateway
                        </td>
                        <td class="px-6 py-4">
                            User created successfully
                        </td>
                        <td class="px-6 py-4">
                            2023-10-01 12:00:00
                        </td>
                    </tr>
                     <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                        <th class="px-6 py-4 ">
                            INFO
                        </th>
                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            api-gateway
                        </td>
                        <td class="px-6 py-4">
                            User created successfully
                        </td>
                        <td class="px-6 py-4">
                            2023-10-01 12:00:00
                        </td>
                    </tr>
                     <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                        <th class="px-6 py-4 ">
                            INFO
                        </th>
                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            api-gateway
                        </td>
                        <td class="px-6 py-4">
                            User created successfully
                        </td>
                        <td class="px-6 py-4">
                            2023-10-01 12:00:00
                        </td>
                    </tr>
                     <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                        <th class="px-6 py-4 ">
                            INFO
                        </th>
                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            api-gateway
                        </td>
                        <td class="px-6 py-4">
                            User created successfully
                        </td>
                        <td class="px-6 py-4">
                            2023-10-01 12:00:00
                        </td>
                    </tr>
                     <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                        <th class="px-6 py-4 ">
                            INFO
                        </th>
                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            api-gateway
                        </td>
                        <td class="px-6 py-4">
                            User created successfully
                        </td>
                        <td class="px-6 py-4">
                            2023-10-01 12:00:00
                        </td>
                    </tr>
                    
                    
                </tbody>
            </table>
        </div>

    </>
  );
}

export default App
