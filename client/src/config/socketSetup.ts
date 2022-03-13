import { io } from "socket.io-client";
import { updateSingleConversationStore } from "../redux/actions";

const socket = io("ws://localhost:5000", {
  withCredentials: true,
});

socket.on("newMessageServer", message => {
  updateSingleConversationStore(message);
  scrollMessagesToBottom(message.conversationId);
});

export const emitNewMessage = (message: any) => {
  socket.emit("newMessageClient", message);
};

export const scrollMessagesToBottom = (convId: string) => {
  const targetElm = document.querySelector(`#${convId}`); // reference to scroll target
  if (targetElm) {
    targetElm.scrollTop = targetElm.scrollHeight;
  }
};
