import userModel from '../models/user.js';

export const userHelper = {
    isEmailAlreadyExist: async (email) => {
        const user = await userModel.findOne({ email: email });
        return user ? true : false;
    },
}