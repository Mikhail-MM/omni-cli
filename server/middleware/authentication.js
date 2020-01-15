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
        const validatedUser = await UserModel.findOne({email});
        if (!validatedUser) {
            const err = new Error("Could not find a user with this email address.")
            err.code = 401;
            next(err);
            return
        };

        const { hash } = validatedUser;
        const match = await bcrypt.compare(password, hash);

        console.log(validatedUser);

        if (!match) {
            const err = new Error("Incorrect password.");
            err.code = 403;
            return next(err);
        } else {
            req.session.organizationID = validatedUser.omniProfile.organizationID;
            req.session.isOmniAdmin = validatedUser.omniProfile.isAdmin;
            res.json({});
            // attach mongo key and permission scopes to session
        }

    } catch(err) { next(err) }
}

export { validateUserLogin }