import { useEffect, useState } from "react";
import http from "../AxiosInstance/http";
import RecieverChatMessage from "./recieverChatMessage";
import SenderChatMessage from "./senderChatMessage";

const ChatHistory = () => {
  const user_id = localStorage.getItem("user_id");
  const recipient_id = localStorage.getItem("recipient_id");
  const [ChatHistory, setChatHistory] = useState<any>([]);

  useEffect(() => {
    async function chatHistory() {
      try {
        const response = await http.get(
          `/specific_message/${user_id}/${recipient_id}`
        );
        if (response.status === 200) {
          setChatHistory(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    chatHistory();
  }, [user_id, recipient_id]);

  return (
    <div>
      {ChatHistory.map((chatMessage: any, index: number) => {
        if (chatMessage.sender_id == user_id) {
          return (
            <SenderChatMessage message={chatMessage.message} index={index} />
          );
        } else if (chatMessage.reciever_id == user_id) {
          return (
            <RecieverChatMessage message={chatMessage.message} index={index} />
          );
        }
      })}
    </div>
  );
};

export default ChatHistory;
