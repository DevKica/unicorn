import store from "./store";

export const getConversationsStore = () => store.getState().conversations;

export const updateConversationsStore = (element: any) => store.dispatch({ type: "set", payload: element });

export const updateSingleConversationStore = (element: any) => store.dispatch({ type: "newMessage", payload: element });

export const getUserStore = () => store.getState().user;

export const updateUserStore = (element: string) => store.dispatch({ type: "setUserId", payload: element });
