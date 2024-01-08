import { Button, Input } from "@mui/material";
import useAuthChecker from "../Hook/useAuthChecker";
import { SetStateAction, useContext, useEffect, useState } from "react";
import { GlobalContext } from "../GlobalContext";
import { SmileIcon, SendIcon, FileInputIcon } from "lucide-react";
import SideBar from "./SideBar";
import SenderChatMessage from "./senderChatMessage";
import RecieverChatMessage from "./recieverChatMessage";
import ChatHistory from "./chat_history";
import { http_for_files } from "../AxiosInstance/http";

export default function Component() {
  const { cable } = useContext(GlobalContext);

  const user_id: any = localStorage.getItem("user_id");

  const [inputValue, setInputValue] = useState("");

  const [messages, setMessages] = useState<any>([]);

  const [receivingMessage, setReceivingMessage] = useState<any>([]);

  const recipient_id: any = localStorage.getItem("recipient_id");

  const [file, setFile] = useState<Blob | string>("");

  const fd = new FormData();

  fd.append("image", file);
  fd.append("sender_id", user_id);
  fd.append("reciever_id", recipient_id);
  fd.append("message", inputValue);

  // const message = {
  //   sender_id: user_id,
  //   reciever_id: recipient_id,
  //   message: inputValue,
  // };

  useAuthChecker(); // Hook for checking if user is authenticate or not

  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setInputValue(e.target.value);
  };

  async function handleSendClick() {
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
        setFile("");
      }
    } catch {
      alert("Please dont Leaver your Message Field empty");
    }
  }

  // For Stroing image on SetImage UseState
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const image: any = e.target.files ? e.target.files[0] : null;
    setFile(image ? image : null);
  };

  // console.log(file);
  // For creating subscription to chat
  useEffect(() => {
    console.log(user_id);
    cable.subscriptions.create(
      {
        channel: "ChatsChannel",
        reciever_id: user_id,
      },
      {
        // When Server send some data
        received: (data: any) => {
          // console.log(data);
          setReceivingMessage((state: any) => [...state, data]);
        },
      }
    );
  }, [recipient_id, user_id]);

  console.log(receivingMessage);
  console.log(file);

  return (
    <div className="grid grid-cols-[300px_1fr] h-screen static">
      <SideBar />
      <div className="flex flex-col h-full ">
        <ChatHistory />
        <div className="flex-1 p-4 space-y-4">
          {/* Sender messages (right-aligned) */}
          {messages.map((message: any, index: number) => (
            <SenderChatMessage
              message={message.text}
              index={index}
              image={""}
            />
          ))}
          {/* Receiver messages (left-aligned) */}
          {receivingMessage.map((message: any, index: number) => (
            <RecieverChatMessage
              message={message.message}
              index={index}
              image={message.image.image}
            />
          ))}
        </div>

        {/* Message input and send button */}
        <div className="px-4 pt-4 mb-2 sm:mb-0 fixed bottom-0 w-9/12">
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
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
