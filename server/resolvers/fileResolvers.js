export const fileResolvers = {
    Query: {
        uploads: (_parent, _args) => {
            return [];
        },
    },
    Mutation: {
        singleUpload: (_parent, args, context) => {
            return args.file.then(file => {
                const { createReadStream, filename, mimetype } = file

                let streamSize = parseInt(context.req.headers['content-length'])

                const fileStream = createReadStream()

                blobService.createBlockBlobFromStream('images', filename, fileStream, streamSize, (error, response) => {
                    if (!error) {
                        console.log(response)
                    }
                })
                return file;
            });
        },
    },
};