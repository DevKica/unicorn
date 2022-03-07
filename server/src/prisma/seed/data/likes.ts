export const superlikeUsersIds = ["4", "5"];

const likes = [
    // likes to testUser
    {
        id: "like1",
        userId: "3",
        judgedUserId: "1",
        typeOfLike: "default",
        createdAt: new Date("2022-03-01T00:00:00.000Z"),
    },
    {
        id: "like2",
        userId: "4",
        judgedUserId: "1",
        typeOfLike: "super",
        createdAt: new Date("2022-03-01T00:00:00.000Z"),
    },
    {
        id: "like3",
        userId: "5",
        judgedUserId: "1",
        typeOfLike: "super",
        createdAt: new Date("2022-03-03T00:00:00.000Z"),
    },
    {
        id: "like4",
        userId: "3",
        judgedUserId: "5",
        typeOfLike: "default",
        createdAt: new Date("2022-03-02T00:00:00.000Z"),
    },
];

export default likes;
