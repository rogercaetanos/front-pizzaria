import axios from "axios";

const api = axios.create({
   baseURL:"http://172.19.0.49/pizzariateste/api/v1",
   timeout: 100000,  // Tempo máximo de resposta (10 segundos)
});
export default api;

// http://localhost:8080/api/v1

