import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import useListenMessage from "../../hooks/useListenMessage";

const ManyMessages = () => {
  const { loading, messages } = useGetMessages(); //get api
  useListenMessage(); //socket

  const lastMessRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessRef}>
            <Message message={message} />
          </div>
        ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading && messages.length === 0 && (
        <p className="text-center text-warning">
          Send a message to start the conversation
        </p>
      )}
    </div>
  );
};

export default ManyMessages;
