import { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import http from "../AxiosInstance/http";

const ChatHeader = () => {
  const recipient_id: any = localStorage.getItem("recipient_id");
  const [recieverName, setRecieverName] = useState<string>();

  useEffect(() => {
    async function extractReceiverUser() {
      try {
        const res = await http.get(`/users/${recipient_id}`);
        if (res.status === 200) {
          setRecieverName(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    }

    extractReceiverUser();
  }, [recipient_id]);

  return (
    <div className="fixed top-0 w-10/12 bg-white shadow p-4 flex justify-start items-center z-50">
      <div className="flex space-x-3">
        <Avatar className="h-10 w-10"></Avatar>
        <div className="text-xl font-bold">{recieverName}</div>
      </div>
      {/* <div className="flex space-x-4">
        <span className="text-lg cursor-pointer">Icon1</span>
        <span className="text-lg cursor-pointer">Icon2</span>
        <span className="text-lg cursor-pointer">Icon3</span>
      </div> */}
    </div>
  );
};

export default ChatHeader;
