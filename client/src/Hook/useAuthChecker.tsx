import { useEffect } from "react";
import http from "../AxiosInstance/http";
import { useNavigate } from "react-router-dom";
const useAuthChecker = () => {
  const navigate = useNavigate();
  async function AuthChecker() {
    try {
      const res = await http.get("/is_auth");
      console.log(res.status);
      if (res.status !== 200) {
        const error = new Error("You are not Authorized");
        throw error;
      }
    } catch (err) {
      navigate("/login");
    }
  }

  useEffect(() => {
    AuthChecker();
  });
};

export default useAuthChecker;
