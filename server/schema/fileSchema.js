export const fileSchema = `#graphql
    type File {
        filename: String!
        mimetype: String!
        encoding: String!
    }

    input FileInput {
        filename: String!
        mimetype: String!
        encoding: String!
    }

    type Query {
        uploads: [File]
    }
    
    type Mutation {
        singleUpload(input: FileInput!): File!
    }
`;