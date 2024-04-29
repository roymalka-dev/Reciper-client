/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { appConfig } from "@/configs/app.config";
import ApiService from "@/services/ApiService";
import { logout } from "@/store/slices/authSlice";
import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

type Status = "idle" | "loading" | "success" | "error";
type ApiResponse<T> = {
  data: T;
};

/**
 * Custom React hook for making API requests.
 *
 * @param {string} endpoint - The URL endpoint to which the API request will be made.
 * @param {string} [method="GET"] - The HTTP method for the request. Supported methods are GET, POST, PUT, PATCH, DELETE.
 * @param {object} [body] - The request body to be sent with the API request. This parameter is required for POST, PUT, and PATCH requests.
 * @param {Array} [dependencies] - An array of dependencies to watch for changes and trigger a refetch when any of them change.
 * @param {boolean} [manual=false] - A flag indicating whether the API request should be triggered manually.
 * @returns {object} An object containing data, status, error, and refetch function.
 */
const useFetch = <T = any>(
  endpoint: string,
  method: string = "GET",
  body?: object,
  dependencies: any[] = [],
  manual: boolean = false // Add a manual flag
) => {
  /**
   * State variables to manage API response data, status, and errors.
   */
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<Error | null>(null);
  const dispatch = useDispatch();

  /**
   * Callback function to fetch data from the specified API endpoint.
   */
  const fetchData = useCallback(async () => {
    setStatus("loading");
    setData(null);
    setError(null);

    try {
      let response: ApiResponse<T>;
      switch (method.toUpperCase()) {
        case "GET":
          response = await ApiService.get<ApiResponse<T>>(endpoint, body);
          break;
        case "POST":
          response = await ApiService.post<ApiResponse<T>>(endpoint, body);
          break;
        case "PUT":
          response = await ApiService.put<ApiResponse<T>>(endpoint, body);
          break;
        case "PATCH":
          response = await ApiService.patch<ApiResponse<T>>(endpoint, body);
          break;
        case "DELETE":
          response = await ApiService.delete<ApiResponse<T>>(endpoint);
          break;
        default:
          throw new Error(`Method ${method} is not supported`);
      }

      setData(response.data);
      setStatus("success");
    } catch (err) {
      setError(err as Error);
      setStatus("error");
      if ((err as any).response && (err as any).response.status === 403) {
        dispatch(logout());
        window.location.href = appConfig.unAuthenticatedEntryPath;
      }
    }
  }, [endpoint, method, body, ...dependencies]);

  /**
   * Effect hook to trigger API request based on manual flag.
   * If manual flag is false, the API request is triggered automatically.
   */
  useEffect(() => {
    if (!manual) {
      fetchData();
    }
  }, [fetchData, manual]);

  /**
   * Return an object containing data, status, error, and refetch function.
   */
  return { data, status, error, refetch: fetchData };
};

export default useFetch;
