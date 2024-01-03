import { Avatar, Button, Input } from "@mui/material";
import useAuthChecker from "../Hook/useAuthChecker";
import http from "../AxiosInstance/http";
import { useNavigate } from "react-router-dom";
import { SetStateAction, useContext, useEffect, useState } from "react";
import { GlobalContext } from "../GlobalContext";
import { SmileIcon, SendIcon } from "lucide-react";

export default function Component() {
  const navigate = useNavigate();

  const { cable } = useContext(GlobalContext);

  const user_id = localStorage.getItem("user_id");

  const [inputValue, setInputValue] = useState("");

  const [messages, setMessages] = useState<any>([]);

  const [users, setUsers] = useState<any>([]);

  const others_users_except_yourself = users.filter(
    (user: any) => user.id != user_id
  );

  const recipient_id = localStorage.getItem("recipient_id");

  const message = {
    sender_id: user_id,
    reciever_id: recipient_id,
    message: inputValue,
  };

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

  async function handleSendClick() {
    if (inputValue.trim() !== "") {
      const newMessage = {
        sender: "You",
        text: inputValue,
      };
      setMessages([...messages, newMessage]);
      setInputValue("");
    }

    try {
      const res = await http.post("/create_message", message);
      if (res.status === 200) {
      }
    } catch {
      alert("Error Occured");
    }
  }

  function Recieve(id: string) {
    localStorage.setItem("recipient_id", id);
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
    // console.log("Here");
    console.log(user_id);
    cable.subscriptions.create(
      {
        channel: "ChatsChannel",
        reciever_id: user_id,
      },
      {
        // When Server send some data
        received: (data: any) => {
          console.log(data);
        },
      }
    );
  }, [recipient_id, user_id]);

  return (
    <div className="grid grid-cols-[300px_1fr] h-screen">
      <aside className="border-r dark:border-gray-700 bg-white dark:bg-gray-950 p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Contacts</h2>
          </div>
          <div className="space-y-4">
            {others_users_except_yourself.map((contact: any, index: number) => (
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
      {/* <main className="p-4">
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
      </main> */}

      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Sender messages (right-aligned) */}
          <div className="flex items-end justify-end mb-4">
            <div className="flex flex-col space-y-2 text-right max-w-xs mx-2 order-2 items-end">
              <div>
                <span className="px-4 py-2 rounded-full inline-block rounded-br-none bg-blue-600 text-white">
                  Hey! How are you?
                </span>
              </div>
              <span className="text-sm text-gray-500">You, 3:58 PM</span>
            </div>
          </div>

          {/* Receiver messages (left-aligned) */}
          <div className="flex items-end justify-start mb-4">
            <div className="flex flex-col space-y-2 text-left max-w-xs mx-2 order-1 items-start">
              <div>
                <span className="px-4 py-2 rounded-full inline-block rounded-bl-none bg-gray-300 text-gray-600">
                  I'm good, thanks! How about you?
                </span>
              </div>
              <span className="text-sm text-gray-500">Jane Doe, 4:03 PM</span>
            </div>
          </div>
        </div>

        {/* Message input and send button */}
        <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
          <div className="relative flex">
            <span className="absolute inset-y-0 flex items-center">
              <button
                className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                type="button"
              >
                <SmileIcon className="h-6 w-6" />
              </button>
            </span>
            <Input
              className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-full py-3"
              placeholder="Type your message..."
              value={inputValue}
              onChange={handleInputChange}
            />
            <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
              <Button
                onClick={handleSendClick}
                className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-blue-500 hover:bg-blue-100 focus:outline-none"
              >
                <SendIcon className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
