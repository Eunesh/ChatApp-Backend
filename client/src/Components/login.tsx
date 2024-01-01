import { useState } from "react";
import { Card, CardContent, Input, Button } from "@mui/material";
import http from "../AxiosInstance/http";
import { useNavigate } from "react-router-dom";

export default function LoginComponent() {
  // Navigate
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: { target: { id: any; value: any } }) => {
    const { id, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Add your login logic using loginData (email and password)
    console.log("Login data:", loginData);
    try {
      const res = await http.post("/user_login", loginData);
      console.log(res);
      console.log(res.status);
      if (res.status) {
        navigate("/chat");
      }
    } catch (err) {
      alert("Login failed, try again");
    }
  };

  return (
    <main className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="w-full max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-semibold text-gray-800 text-center">
          Login
        </h1>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <Input
              id="email"
              placeholder="Enter your email"
              required
              type="email"
              value={loginData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <Input
              id="password"
              placeholder="Enter your password"
              required
              type="password"
              value={loginData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
        </CardContent>
        <Button
          className="w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-500"
          onClick={handleSubmit}
        >
          Login
        </Button>
      </Card>
    </main>
  );
}
