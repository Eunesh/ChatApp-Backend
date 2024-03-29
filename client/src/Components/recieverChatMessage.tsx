interface propsType {
  message: string;
  index: number;
  image: Array<string>;
}

const RecieverChatMessage = (props: propsType) => {
  const reciever_name = localStorage.getItem("reciever_name");
  return (
    <div key={props.index} className="flex items-end justify-start mb-4">
      <div className="flex flex-col space-y-2 text-left max-w-xs mx-2 order-1 items-start group">
        <div>
          {props.message && (
            <span className="px-4 py-2 rounded-full inline-block rounded-bl-none bg-gray-300 text-gray-600">
              {props.message}
            </span>
          )}

          {props.image &&
            props.image.map((image: any, index: number) => (
              <img
                key={index}
                src={`http://localhost:3001/${image}`}
                alt={`Image ${index}`}
              />
            ))}
        </div>
        <span className="text-sm text-gray-500 hidden group-hover:block">
          {reciever_name}
        </span>
      </div>
    </div>
  );
};

export default RecieverChatMessage;
