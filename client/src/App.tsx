import ChatComponent from "./Components/chat_component";
import { Route, Routes } from "react-router-dom";
import SignupComponent from "./Components/signup";
import LoginComponent from "./Components/login";
import OtpComponent from "./Components/Otp";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignupComponent />} />
      <Route path="/chat" element={<ChatComponent />} />
      <Route path="/login" element={<LoginComponent />} />
      <Route path="/otp" element={<OtpComponent />} />
    </Routes>
  );
}

export default App;
