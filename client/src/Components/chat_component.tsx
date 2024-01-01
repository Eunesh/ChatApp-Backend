import { Avatar, Button } from "@mui/material";
import useAuthChecker from "../Hook/useAuthChecker";
import http from "../AxiosInstance/http";

export default function Component() {
  async function ClickLogout() {
    try {
      const res = await http.delete("/logout");
      console.log(res.status);
      if (res.status === 200) {
        alert("logout");
      }
    } catch (err) {
      alert("LogOut failed");
    }
  }
  useAuthChecker(); // Hook for checking if user is authenticate or not
  return (
    <div className="grid grid-cols-[300px_1fr] h-screen">
      <aside className="border-r dark:border-gray-700 bg-white dark:bg-gray-950 p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Contacts</h2>
            <Button>Add</Button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10"></Avatar>
              <span className="font-medium cursor-pointer">Contact 1</span>
            </div>
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10"></Avatar>
              <span className="font-medium">Contact 2</span>
            </div>
            <div className="flex items-center space-x-3">
              <Button className="" onClick={ClickLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </aside>
      <main className="p-4">
        <h2 className="text-xl font-bold mb-4">Chat</h2>
        <div className="flex flex-col space-y-4 mb-4">
          <p>
            <strong>Contact 1:</strong> Hello!
          </p>
          <p>
            <strong>You:</strong> Hi! How are you?
          </p>
        </div>
        <div className="mt-auto">
          <div className="mt-4 flex items-center space-x-2">
            <input
              className="flex-grow"
              placeholder="Type your message here..."
            />
            <Button>Send</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
