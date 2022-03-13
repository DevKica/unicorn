// @ts-nocheck

export const conversationsReducer = (state = [], action: any) => {
  switch (action.type) {
    case "set":
      return action.payload;
    case "newMessage":
      try {
        const { conversationId } = action.payload;

        const scIndex = state.findIndex((o: any) => o.id === conversationId);

        // const singleConversation = state.find((o: any) => o.id === conversationId);

        // singleConversation.messages.push(action.payload);

        // if (!singleConversation) throw Error();
        // const newState = state.filter((o: any) => o.id !== conversationId);
        // newState.unshift(singleConversation);

        state[scIndex].messages.push(action.payload);

        return state;
      } catch (e) {
        return state;
      }
    default:
      return state;
  }
};

export const userReducer = (state = { id: "" }, action: any) => {
  switch (action.type) {
    case "setUserId":
      return { ...state, id: action.payload };
    default:
      return state;
  }
};
