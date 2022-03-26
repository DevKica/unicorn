export const superlikeUsersIds = ["user11", "user12"];

const likes = [
    // default like
    {
        id: "like1",
        userId: "user7",
        judgedUserId: "user1",
        typeOfLike: "default",
    },
    {
        id: "like2",
        userId: "user8",
        judgedUserId: "user1",
        typeOfLike: "default",
    },
    {
        id: "like3",
        userId: "user9",
        judgedUserId: "user1",
        typeOfLike: "notInterested",
    },
    // 2 superlikes
    {
        id: "like4",
        userId: "user11",
        judgedUserId: "user1",
        typeOfLike: "super",
    },
    {
        id: "like5",
        userId: "user12",
        judgedUserId: "user1",
        typeOfLike: "super",
    },
];

export default likes;
