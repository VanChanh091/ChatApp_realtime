import React from "react";
import Conversation from "./Conversation";
import useGetConversation from "../../hooks/useGetConversation";
import { getRandomEmoji } from "../../utils/emoji";

const ManyConversation = () => {
  const { loading, conversations } = useGetConversation();
  console.log("Conversation loaded: ", conversations);
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((data, idx) => (
        <Conversation
          key={data._id}
          conversation={data}
          emoji={getRandomEmoji()}
          lastIdx={idx === conversations.length - 1}
        />
      ))}

      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};

export default ManyConversation;
