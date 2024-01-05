interface propsType {
  message: string;
  index: number;
}

const SenderChatMessage = (props: propsType) => {
  return (
    <div key={props.index} className="flex items-end justify-end mb-4">
      <div className="flex flex-col space-y-2 text-right max-w-xs mx-2 order-2 items-end">
        <div>
          <span className="px-4 py-2 rounded-full inline-block rounded-br-none bg-blue-600 text-white">
            {props.message}
          </span>
        </div>
        <span className="text-sm text-gray-500">You, 3:58 PM</span>
      </div>
    </div>
  );
};

export default SenderChatMessage;