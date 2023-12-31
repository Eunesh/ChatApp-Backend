import { SetStateAction, useState } from "react";
import { Card, CardContent, Input, Button } from "@mui/material";
import http from "../AxiosInstance/http";
import { useNavigate } from "react-router-dom";

interface Iotp {
  email: string | null;
  otp: string;
}

export default function OtpComponent() {
  const navigate = useNavigate();
  const email = localStorage.getItem("email"); // getting email from localstorage
  const [otp, setOtp] = useState("");
  const data = { email, otp };

  const handleOtpChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setOtp(e.target.value);
  };

  // function for calling APi endpoint with axios for post
  //   async function postResponse(url: string, data: Iotp) {
  //     const res = await http.post(url, data);
  //     return res;
  //   }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // You can use the otpValue in your form submission logic
    console.log("OTP submitted:", otp);

    try {
      const res = await http.post("/verify_otp", data);
      console.log(res.status);
      if (res.status === 200) {
        alert("Your account is Confirmed");
        navigate("/login");
      }
    } catch (err) {
      alert("Sorry Invalid OTP or your Otp is already expired");
    }
  };

  async function handleResendOtp() {
    try {
      const res = await http.patch("/reload_otp", data);
      console.log(res.status);
      if (res.status === 200) {
        alert("Yout Otp is updated please check your email once again");
      }
    } catch (err) {
      alert("Your account might be already confirmed or invalid user");
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-50 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md p-8 space-y-6">
        <CardContent>
          <h2 className="text-center text-3xl font-mono text-slate-950">
            OTP Verification
          </h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <Input
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  id="otp"
                  name="otp"
                  placeholder="Enter OTP"
                  required
                  type="text"
                  value={otp}
                  onChange={handleOtpChange}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Button
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={handleResendOtp}
                >
                  Resend OTP
                </Button>
              </div>
            </div>
            <div>
              <Button
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                type="submit"
              >
                Verify
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
