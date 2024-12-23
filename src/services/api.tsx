import axios from "axios";
import { apiBaseUrl, persistUserId } from "@/config/constants";

export const api = axios.create({
  baseURL: apiBaseUrl,
});

// api.interceptors.request.use(async (config) => {
//   const userId = sessionStorage.getItem(persistUserId); // Get the latest UserId
//   if (userId) {
//     config.headers["UserId"] = userId; // Dynamically set the UserId header
//   }

//   return config;
// });

api.interceptors.request.use(
  (config) => {
    const userId = sessionStorage.getItem(persistUserId); // Get the latest UserId

    if (userId) {
      config.headers["UserId"] = userId; // Dynamically set the UserId header
    }

    return config;
  },
  (error) => {
    return Promise.reject("An error occurred with the Header Request " + error);
  },
);
