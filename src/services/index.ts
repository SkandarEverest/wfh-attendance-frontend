const baseAPI = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
const apiVersion = 1;

const parseEndpoint = (base: string, endpoint?: string) => {
  const apiUrl = `${baseAPI}/api/v${apiVersion}`;
  return `${apiUrl}/${base}${endpoint ? `/${endpoint}` : ""}`;
};

const serviceUrls = {
  authPath: (endpoint?: string) => parseEndpoint("auth", endpoint),
  usersPath: (endpoint?: string) => parseEndpoint("users", endpoint),
  timesheetsPath: (endpoint?: string) => parseEndpoint("timesheets", endpoint),
};

export default serviceUrls;
