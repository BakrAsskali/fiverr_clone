import Jwt from "jsonwebtoken";

const getUser = async (token) => {
    try {
        if (token) {
            const user = Jwt.verify(token, process.env.SECRET);
            return user;
        }
        return null;
    } catch (err) {
        return null;
    }
};

const context = async ({ req, res }) => {
    // if (req.body.operationName === "IntrospectionQuery") {
    //     return {};
    // }

    // if (req.body.operationName === "CreateUser" || req.body.operationName === "Login") {
    //     return {};
    // }

    // const token = req.headers.authorization || "";

    // const user = await getUser(token);

    // if (!user) {
    //     throw new Error("You must be logged in to view this resource.");
    // }

    // return { user };
};

export default context;