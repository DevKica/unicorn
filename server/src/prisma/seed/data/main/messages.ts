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
    {
        id: "message3",
        content: "Hi user4",
        type: "default",
        isDeleted: false,
        conversation: {
            connect: {
                id: "conversation4",
            },
        },
        user: {
            connect: {
                id: "user1",
            },
        },
    },
];
