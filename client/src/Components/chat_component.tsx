import { Button, Input } from "@mui/material";
import useAuthChecker from "../Hook/useAuthChecker";
import { SetStateAction, useContext, useEffect, useState } from "react";
import { GlobalContext } from "../GlobalContext";
import { SmileIcon, SendIcon, FileInputIcon } from "lucide-react";
import SideBar from "./SideBar";
import SenderChatMessage from "./senderChatMessage";
import RecieverChatMessage from "./recieverChatMessage";
import ChatHistory from "./chat_history";
import ChatHeader from "./ChatHeader";
import { http_for_files } from "../AxiosInstance/http";

export default function Component() {
  const { cable } = useContext(GlobalContext);

  const user_id: any = localStorage.getItem("user_id");

  const [inputValue, setInputValue] = useState("");

  const [messages, setMessages] = useState<any>([]);

  const [receivingMessage, setReceivingMessage] = useState<any>([]);

  const recipient_id: any = localStorage.getItem("recipient_id");

  const [file, setFile] = useState<Array<any>>([]);

  useAuthChecker(); // Hook for checking if user is authenticate or not

  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setInputValue(e.target.value);
  };

  async function handleSendClick() {
    const fd = new FormData();

    fd.append("sender_id", user_id);
    fd.append("reciever_id", recipient_id);
    fd.append("message", inputValue);

    file.forEach((file) => {
      fd.append("images[]", file);
    });
    if (inputValue.trim() !== "") {
      const newMessage = {
        text: inputValue,
      };
      setMessages([...messages, newMessage]);
      setInputValue("");
    }

    try {
      const res = await http_for_files.post("/create_message", fd);
      if (res.status === 200) {
        setFile([]);
      }
    } catch {
      alert("Please dont Leaver your Message Field empty");
    }
  }

  // For Stroing image on SetImage UseState
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length && e.target.files.length) {
      const images = Array.from(e.target.files);
      setFile(images);
    }
  };

  // For creating subscription to chat
  useEffect(() => {
    console.log(recipient_id);
    const subscription = cable.subscriptions.create(
      {
        channel: "ChatsChannel",
        reciever_id: user_id,
      },
      {
        // When Server send some data
        received: (data: any) => {
          setReceivingMessage((state: any) => [...state, data]);
        },
      }
    );
    return () => {
      // Unsubscribe when component unmounts
      subscription.unsubscribe();
    };
  }, [recipient_id, user_id]);

  console.log(receivingMessage);
  console.log(file);

  return (
    <div className="flex items-start gap-1">
      <SideBar />

      <div className="flex flex-col gap-10 flex-1 pt-24">
        <div className="flex flex-col">
          <ChatHeader />
          <ChatHistory />
          <div className="flex-1 p-28 space-y-4">
            {/* Receiver messages */}
            {receivingMessage.map((message: any, index: number) => {
              if (message.sender_id == user_id) {
                return (
                  <SenderChatMessage
                    message={message.message}
                    index={index}
                    image={message.image.image_urls}
                  />
                );
              } else if (message.reciever_id == user_id) {
                return (
                  <RecieverChatMessage
                    message={message.message}
                    index={index}
                    image={message.image.image_urls}
                  />
                );
              }
            })}
          </div>
        </div>

        {/* Message input and send button */}
        <div className="px-4 pt-4 w-9/12 bottom-0 fixed">
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
                className="inline-flex items-center justify-center rounded-full transition duration-500 ease-in-out text-blue-500 hover:bg-blue-100 focus:outline-none"
              >
                <SendIcon className="h-6 w-6" />
              </Button>
              <div>
                <label htmlFor="file_uploader" className="">
                  <FileInputIcon className="h-9 w-6 hover:bg-blue-100 transition duration-500 ease-in-out rounded-xl" />
                </label>
                <input
                  className="hidden"
                  name="file_input"
                  id="file_uploader"
                  placeholder="file uploader"
                  type="file"
                  onChange={handleFile}
                  accept=".png, .jpg, .jpeg"
                  multiple
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
