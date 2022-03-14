import { io } from "socket.io-client";
import { updateSingleConversationStore } from "../redux/actions";

const EVENTS = {
  CLIENT: {
    SEND_NEW_MESSAGE: "SEND_NEW_MESSAGE",
  },
  SERVER: {
    NEW_MESSAGE_RECEIVED: "NEW_MESSAGE_RECEIVED",
  },
};

const socket = io("ws://localhost:5000", {
  withCredentials: true,
});

socket.on(EVENTS.SERVER.NEW_MESSAGE_RECEIVED, message => {
  updateSingleConversationStore(message);
  scrollMessagesToBottom(message.conversationId);
});

export const emitSendNewMessage = (message: any) => {
  socket.emit(EVENTS.CLIENT.SEND_NEW_MESSAGE, message);
};

export const scrollMessagesToBottom = (convId: string) => {
  const targetElm = document.querySelector(`#${convId}`); // reference to scroll target
  if (targetElm) {
    targetElm.scrollTop = targetElm.scrollHeight;
  }
};
