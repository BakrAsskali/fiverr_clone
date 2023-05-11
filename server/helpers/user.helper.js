import userModel from '../models/user.js';

export const userHelper = {
    isEmailAlreadyExist: async (email) => {
        const user = await userModel.findOne({ email: email });
        return user ? true : false;
    },

    isUsernameAlreadyExist: async (username) => {
        const user = await userModel.findOne({ username: username });
        return user ? true : false;
    }
}