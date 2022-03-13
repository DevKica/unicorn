import { io } from "socket.io-client";
import { updateSingleConversationStore } from "../redux/actions";

const socket = io("ws://localhost:5000");

socket.on("receivedMessage", message => {
  updateSingleConversationStore(message);
  scrollMessagesToBottom(message.conversationId);
});

export const emitSendMessage = (message: string) => {
  socket.emit("sendMessage", message);
};

export const scrollMessagesToBottom = (convId: string) => {
  const targetElm = document.querySelector(`#${convId}`); // reference to scroll target
  if (targetElm) {
    targetElm.scrollTop = targetElm.scrollHeight;
  }
};
