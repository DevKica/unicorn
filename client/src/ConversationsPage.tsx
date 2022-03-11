import { useState } from "react";

const SingleConversation = (data: any) => {
  const [showMessages, setShowMessages] = useState<any>(true);
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
          <div style={{ border: "0.5px solid #777", overflowY: "scroll", maxHeight: "300px", maxWidth: "600px" }}>
            <div style={{ padding: "0 10px 10px 10px" }}>
              <div>
                {data.messages.length > 10 && (
                  <div style={{ marginLeft: "auto", marginRight: "auto", width: "fit-content", marginTop: "0" }}>
                    <button style={{ marginTop: "0", marginBottom: "10px" }}>load more</button>
                  </div>
                )}

                {data.messages.map((e: any) => (
                  <div
                    style={
                      e.userId === data.userLocalId
                        ? { maxWidth: "260px", width: "fit-content", marginLeft: "auto", marginRight: 0 }
                        : { maxWidth: "260px" }
                    }
                    key={e.id}
                  >
                    {e.content}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <input />
          <button>send message</button>
        </>
      )}
    </div>
  );
};

const ConversationsPage = ({ conversations, userId }: { conversations: any; userId: string }) => {
  return (
    <div>
      <div style={{ fontSize: "1.3rem", marginTop: "20px" }}>Conversations:</div>
      {conversations.map((e: any) => (
        <div key={e.id}>{SingleConversation({ ...e, userLocalId: userId })}</div>
      ))}
    </div>
  );
};

export default ConversationsPage;
