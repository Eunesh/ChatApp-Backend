interface propsType {
  message: string;
  index: number;
}

const RecieverChatMessage = (props: propsType) => {
  return (
    <div key={props.index} className="flex items-end justify-start mb-4">
      <div className="flex flex-col space-y-2 text-left max-w-xs mx-2 order-1 items-start">
        <div>
          <span className="px-4 py-2 rounded-full inline-block rounded-bl-none bg-gray-300 text-gray-600">
            {props.message}
          </span>
        </div>
        <span className="text-sm text-gray-500">Jane Doe, 4:03 PM</span>
      </div>
    </div>
  );
};

export default RecieverChatMessage;
