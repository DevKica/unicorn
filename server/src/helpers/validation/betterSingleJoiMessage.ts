const betterSingleJoiMessage = (subject: string, message: string) => {
  return `${subject} ${message}`;
};

const matchMessage = "must match";
export const matchError = (target: string) => betterSingleJoiMessage(target, matchMessage);
