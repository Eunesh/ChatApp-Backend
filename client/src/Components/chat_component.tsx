import { Avatar, Button } from "@mui/material";
import useAuthChecker from "../Hook/useAuthChecker";
import http from "../AxiosInstance/http";
import { useNavigate } from "react-router-dom";
import { SetStateAction, useEffect, useState } from "react";

export default function Component(props: any) {
  const navigate = useNavigate();

  const user_id = localStorage.getItem("user_id");

  const [inputValue, setInputValue] = useState("");

  const [messages, setMessages] = useState<any>([]);

  const [users, setUsers] = useState<any>([]);

  const [recipient_id, setRecipient_id] = useState("");

  async function ClickLogout() {
    try {
      const res = await http.delete("/logout");
      console.log(res.status);
      if (res.status === 200) {
        alert("logout");
        navigate("/chat");
      }
    } catch (err) {
      alert("LogOut failed");
    }
  }
  useAuthChecker(); // Hook for checking if user is authenticate or not

  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setInputValue(e.target.value);
  };

  function handleSendClick() {
    if (inputValue.trim() !== "") {
      const newMessage = {
        sender: "You",
        text: inputValue,
      };
      setMessages([...messages, newMessage]);
      setInputValue("");
    }
  }

  function Recieve(id: string) {
    setRecipient_id(id);
  }

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

  // For creating subscription to chat
  useEffect(() => {
    props.cable.subscriptions.create(
      {
        channel: "ChatsChannel",
        user_id: user_id,
        recipient_id: recipient_id,
      },
      {
        // When Server send some data
        received: (data: string) => {
          console.log(data);
        },
      }
    );
  });
  return (
    <div className="grid grid-cols-[300px_1fr] h-screen">
      <aside className="border-r dark:border-gray-700 bg-white dark:bg-gray-950 p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Contacts</h2>
            <Button>Add</Button>
          </div>
          <div className="space-y-4">
            {users.map((contact: any, index: number) => (
              <div key={index} className="flex items-center space-x-3">
                <Avatar className="h-10 w-10"></Avatar>
                <span
                  className="font-medium cursor-pointer"
                  onClick={() => Recieve(contact.id)}
                >
                  {contact.name}
                </span>
              </div>
            ))}
            <div className="flex items-center space-x-3">
              <Button onClick={ClickLogout}>Logout</Button>
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
          {messages.map((message: any, index: number) => (
            <p key={index}>
              <strong>{message.sender}:</strong> {message.text}
            </p>
          ))}
        </div>
        <div className="mt-auto">
          <div className="mt-4 flex items-center space-x-2">
            <input
              className="flex-grow"
              placeholder="Type your message here..."
              value={inputValue}
              onChange={handleInputChange}
            />
            <Button onClick={handleSendClick}>Send</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
