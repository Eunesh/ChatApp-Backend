import { Avatar, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import http from "../AxiosInstance/http";

const SideBar = () => {
  const navigate = useNavigate();

  const user_id = localStorage.getItem("user_id");

  const [users, setUsers] = useState<any>([]);

  async function ClickLogout() {
    try {
      const res = await http.delete("/logout");
      console.log(res.status);
      if (res.status === 200) {
        alert("logout");
        localStorage.setItem("user_id", "");
        navigate("/chat");
      }
    } catch (err) {
      alert("LogOut failed");
    }
  }

  function Recieve(id: string) {
    localStorage.setItem("recipient_id", id);
    navigate("/chat");
  }

  const others_users_except_yourself: any = users.filter(
    (user: any) => user.id != user_id
  );

  // For getting all the user data
  useEffect(() => {
    async function getUser() {
      try {
        const res = await http.get("/users");
        if (res.status === 200) {
          setUsers(res.data);
        }
      } catch (err) {
        console.log("error while fetching users data");
      }
    }
    getUser();
  }, [setUsers]);

  return (
    <aside className="border-r dark:border-gray-700 bg-white dark:bg-gray-950 p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Contacts</h2>
        </div>
        <div className="space-y-4">
          {others_users_except_yourself.map((contact: any, index: number) => (
            <div
              key={index}
              className="flex items-center space-x-3 hover:bg-gray-200 rounded-lg cursor-pointer p-3"
              onClick={() => Recieve(contact.id)}
            >
              <Avatar className="h-10 w-10"></Avatar>
              <span className="font-medium">{contact.name}</span>
            </div>
          ))}
          <div className="flex items-center space-x-3">
            <Button onClick={ClickLogout}>Logout</Button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
