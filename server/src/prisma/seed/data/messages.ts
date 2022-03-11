export default [
    {
        id: "message1",
        content: "Hi Lopez",
        type: "default",
        isDeleted: false,
        conversation: {
            connect: {
                id: "conversation1",
            },
        },
        user: {
            connect: {
                id: "1",
            },
        },
    },
    {
        id: "message2",
        content: "Hi Pawel",
        type: "default",
        isDeleted: false,
        conversation: {
            connect: {
                id: "conversation1",
            },
        },
        user: {
            connect: {
                id: "7",
            },
        },
    },
];
