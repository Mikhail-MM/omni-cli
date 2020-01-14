import bcrypt from 'bcrypt';

import { UserModel } from '../models/schema/user-mongoose';

const validateUserLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            const err = new Error("Make sure to include your e-mail address.");
            err.code = 400;
            return next(err);
        };
        if (!password) {
            const err = new Error("Please include your password");
            err.code = 400;
            return next(err);
        };

        const validatedUser = await UserModel.find({email});
        if (!validatedUser) {
            const err = new Error("Could not find a user with this email address.")
            err.code = 401;
            return next(err);
        };

        const { hash } = validatedUser;

        const match = bcrypt.compare(password, hash);

        if (!match) {
            const err = new Error("Incorrect password.");
            err.code = 403;
            return next(err);
        } else {

        }
    } catch(err) { next(err) }
}

export { validateUserLogin }