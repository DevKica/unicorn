export default [
    {
        id: "conversation1",
        name: "user1 and user2",
        members: {
            connect: [{ id: "user1" }, { id: "user2" }],
        },
    },
    {
        id: "conversation2",
        name: "user1 and user3",
        members: {
            connect: [{ id: "user1" }, { id: "user3" }],
        },
    },
    {
        id: "conversation3",
        name: "user2 and user3",
        members: {
            connect: [{ id: "user2" }, { id: "user3" }],
        },
    },
    {
        id: "conversation4",
        name: "user1 and user4",
        members: {
            connect: [{ id: "user1" }, { id: "user4" }],
        },
    },
];
