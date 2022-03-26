export default [
    {
        id: "message1",
        content: "Hi user2",
        type: "default",
        isDeleted: false,
        conversation: {
            connect: {
                id: "conversation1",
            },
        },
        user: {
            connect: {
                id: "user1",
            },
        },
    },
    {
        id: "message2",
        content: "Hi user1",
        type: "default",
        isDeleted: false,
        conversation: {
            connect: {
                id: "conversation1",
            },
        },
        user: {
            connect: {
                id: "user2",
            },
        },
    },
];
