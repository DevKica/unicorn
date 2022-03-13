import "./styles/conversation.css";
import { useSelector } from "react-redux";
import { useLayoutEffect, useState } from "react";
import { sendMessage } from "./api/mainInstance";
import { getConversationsStore, getConvState, getUserStore } from "./redux/actions";
import { emitSendMessage, scrollMessagesToBottom } from "./config/socketSetup";

const SingleConversation = (conversation: any) => {
  // state
  const userLocalId = useSelector(() => getUserStore().id);

  const [showMessages, setShowMessages] = useState<boolean>(false);
  const [messageContent, setMessageContent] = useState<string>("");
  const [messageError, setMessageError] = useState<string>("");

  // handlers
  const sendMessageHandler = async (conversationId: string) => {
    // make a request
    const res = await sendMessage({ content: messageContent, conversationId });

    // handle error
    if (res.status !== 201) return setMessageError(JSON.stringify(res.data.msg));

    emitSendMessage(res.data);

    // clear error
    setMessageError("");
    // clear message content
    setMessageContent("");
  };
  useLayoutEffect(() => {
    if (showMessages) {
      scrollMessagesToBottom(conversation.id);
    }
  }, [conversation.id, showMessages]);
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
              <div className="wrapper" id={conversation.id}>
                <div className="innerContent">
                  <div>
                    {conversation.messages.length > 8 && (
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

const ConversationsPage = () => {
  // const conversations = useSelector(() => getConversationsStore());
  const conversations = useSelector(getConvState);

  return (
    <div style={{ marginBottom: "100px" }}>
      <div className="conversationText">Conversations:</div>
      {conversations.map((e: any) => (
        <div key={e.id}>{SingleConversation(e)}</div>
      ))}
    </div>
  );
};

export default ConversationsPage;
