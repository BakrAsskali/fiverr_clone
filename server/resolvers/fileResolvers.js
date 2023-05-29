export const fileResolvers = {
    Query: {
        uploads: (_parent, _args) => {
            return [];
        },
    },
    Mutation: {
        singleUpload: (_parent, args, context) => {
            return (
                args.file.then((file) => {

                }
                )
            );
        },
    },
};