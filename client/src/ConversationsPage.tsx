import "./conversation.css";
import socket from "./socketSetup";
import { useEffect, useState } from "react";
import { getUserSingleConversation, sendMessage } from "./api/mainInstance";

const receivedMessage = () => {};

socket.on("receivedMessage", message => {
  console.log("receivedMessage!!!");
  console.log(message);
});

const SingleConversation = (convId: string, userLocalId: string) => {
  // sockets
  const emitSendMessage = (message: string) => {
    socket.emit("sendMessage", message);
  };

  // state
  const [conversation, setConversation] = useState<any>(null);
  const [showMessages, setShowMessages] = useState<boolean>(true);
  const [messageContent, setMessageContent] = useState<string>("");
  const [messageError, setMessageError] = useState<string>("");

  // handlers
  const sendMessageHandler = async (conversationId: string) => {
    // make a request
    const res = await sendMessage({ content: messageContent, conversationId });

    if (res.status !== 201) return setMessageError(JSON.stringify(res.data.msg));

    setConversation({ ...conversation, messages: conversation.messages.concat(res.data) });

    emitSendMessage(messageContent);

    // clear error
    setMessageError("");
    // clear message content
    setMessageContent("");
  };

  useEffect(() => {
    (async () => {
      const res = await getUserSingleConversation(convId);
      setConversation(res.data);
    })();
  }, [convId]);

  // content
  return (
    <div>
      {conversation && (
        <>
          <div>Name: {conversation.name}</div>
          <div>Number of messages: {conversation.messages.length}</div>
          <div>
            Updated at: {conversation.updatedAt.split("T")[0]} {conversation.updatedAt.split("T")[1].slice(0, 8)}
          </div>
          <button onClick={() => setShowMessages(!showMessages)}>Show messages</button>
          {showMessages && (
            <>
              <div>Messages</div>
              <div className="wrapper">
                <div className="innerContent">
                  <div>
                    {conversation.messages.length > 10 && (
                      <div className="loadMore">
                        <button className="loadMore">load more</button>
                      </div>
                    )}

                    {conversation.messages.map((singleMessage: any) => (
                      <div
                        className={singleMessage.userId === userLocalId ? "userMessage" : "friendMessage"}
                        key={singleMessage.id}
                      >
                        {singleMessage.content}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <input onChange={e => setMessageContent(e.target.value)} value={messageContent} />
              <button onClick={() => sendMessageHandler(conversation.id)}>send message</button>
              <div>{messageError && messageError}</div>
            </>
          )}
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
        <div key={e.id}>{SingleConversation(e.id, userId)}</div>
      ))}
    </div>
  );
};

export default ConversationsPage;
