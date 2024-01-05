import { useState } from "react";
import { Button, Card, CardContent, CardHeader, Input } from "@mui/material";
import http from "../AxiosInstance/http";
import { useNavigate } from "react-router-dom";

interface formDatatype {
  name: string;
  email: string;
  password: string;
}

export default function SignupComponent() {
  // Navigate
  const navigate = useNavigate();

  const [formData, setFormData] = useState<formDatatype>({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e: { target: { id: any; value: any } }) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // function for calling APi endpoint with axios for post
  async function postResponse(url: string, data: formDatatype) {
    const res = await http.post(url, data);
    return res;
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const res = await postResponse("/users", formData);
      console.log(res.status);
      if (res.status === 201) {
        localStorage.setItem("email", formData.email); // localStorage.getItem("email");
        navigate("/otp");
      }
    } catch (err) {
      alert("Sorry Cannot signup");
    }
  };

  return (
    <main className="flex items-center justify-center bg-gray-100 h-screen">
      <Card className="bg-white shadow-2xl rounded-lg w-96">
        <h1 className="text-4xl font-mono text-gray-800 border-b-4 border-l-black pb-2 text-center">
          Sign up, Simple Chat App
        </h1>
        <CardHeader className="bg-[#f5f5f5] rounded-t-lg p-4">
          <h2 className="text-3xl font-bold text-center">Sign Up</h2>
        </CardHeader>
        <CardContent className="p-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="name">Name</label>
              <Input
                className="w-full"
                id="name"
                placeholder="John Doe"
                required
                type="text"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="name">Email</label>
              <Input
                className="w-full"
                id="email"
                placeholder="Johndoe@gmail.com"
                required
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="name">Password</label>
              <Input
                className="w-full"
                id="password"
                placeholder="*******"
                required
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <Button
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Create Account
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
