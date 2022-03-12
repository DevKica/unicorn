import { useState } from "react";
import { sendMessage } from "./api/mainInstance";
import "./conversation.css";
import socket from "./socketSetup";

const SingleConversation = (data: any) => {
  // sockets
  const emitSendMessage = (message: string) => {
    socket.emit("sendMessage", message);
  };

  // state
  const [showMessages, setShowMessages] = useState<boolean>(true);
  const [messageContent, setMessageContent] = useState<string>("");
  const [messageError, setMessageError] = useState<string>("");

  // handlers
  const sendMessageHandler = async (conversationId: string) => {
    const res = await sendMessage({ content: messageContent, conversationId });
    setMessageContent("");
    if (res.status !== 201) return setMessageError(JSON.stringify(res.data.msg));
    emitSendMessage(messageContent);
    setMessageError("");
  };

  // content
  return (
    <div>
      <div>Name: {data.name}</div>
      <div>Number of messages: {data.messages.length}</div>
      <div>
        Updated at: {data.updatedAt.split("T")[0]} {data.updatedAt.split("T")[1].slice(0, 8)}
      </div>
      <button onClick={() => setShowMessages(!showMessages)}>Show messages</button>
      {showMessages && (
        <>
          <div>Messages</div>
          <div className="wrapper">
            <div className="innerContent">
              <div>
                {data.messages.length > 10 && (
                  <div className="loadMore">
                    <button className="loadMore">load more</button>
                  </div>
                )}

                {data.messages.map((e: any) => (
                  <div className={e.userId === data.userLocalId ? "userMessage" : "friendMessage"} key={e.id}>
                    {e.content}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <input onChange={e => setMessageContent(e.target.value)} value={messageContent} />
          <button onClick={() => sendMessageHandler(data.id)}>send message</button>
          <div>{messageError && messageError}</div>
        </>
      )}
    </div>
  );
};

const ConversationsPage = ({ conversations, userId }: { conversations: any; userId: string }) => {
  return (
    <div>
      <div className="conversationText">Conversations:</div>
      {conversations.map((e: any) => (
        <div key={e.id}>{SingleConversation({ ...e, userLocalId: userId })}</div>
      ))}
    </div>
  );
};

export default ConversationsPage;
