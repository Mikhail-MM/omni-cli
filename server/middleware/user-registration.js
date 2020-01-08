import bcrypt from 'bcrypt';
import uuid from 'uuid/v1';

import { UserModel } from '../models/schema/user-mongoose';

const registration = {
  omni: ({ credentials }, next) => createNewOmniMaster({ credentials }, next),
  marketplace: ({ credentials }, next) => createNewMarketplaceUser({ credentials }, next),
};

function sanitizeFields(fields) {
  return ({
    ...fields,
    email: fields.email.toLowerCase(),
  });
}

const registerNewUser = async (req, res, next) => {
  try {

    if (!req.query.pathway) {
      const err = new Error('URL Query Parsing Error :: \'pathway\' required');
      err.status = 400
      return next(err);
    };

    // The query string ?pathway=... should match one of the ENUM keys
    if (!registration[req.query.pathway]) {
      const err = new Error('Invalid Pathway Error :: \'pathway\' parameter mismatch');
      err.status = 400
      return next(err);
    };

    const sanitized = sanitizeFields(req.body)

    const isValidated = await validateCredentials({ credentials: sanitized }, next);

    if (isValidated) {
      const registrationFunction = registration[req.query.pathway]
      const newUser = await registrationFunction({ credentials: sanitized }, next);
      console.log(`A new User has been created:`);
      console.log(newUser);
      res.header(
        'Set-Cookie',
        `Stuff=random--!; Max-Age=${6 * 60 * 60 * 1000};`
      );
      return res.status(200).json({
        message: `Welcome to Omni, ${newUser.firstName}`
      });
    }

  } catch (err) { next(err) };
};

const validateCredentials = async ({ credentials }, next) => {
  try {

    const { firstName, lastName, email, password } = credentials;

    if (!firstName || !lastName || !email || !password) {
      const err = new Error('Please send all required fields.');
      err.status = 400;
      return next(err);
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      const err = new Error('User already exists with this account. Please log in.')
      err.status = 409;
      return next(err);
    }

    return true;

  } catch (err) {
    next(err);
  };
}

const createNewOmniMaster = async ({ credentials }, next) => {
  try {
    const { firstName, lastName, email, password } = credentials;
    const hash = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      firstName,
      lastName,
      email,
      hash,
      dateJoined: Date.now(),
      ...generateOmniMasterMetadata()
    });
    return await newUser.save();
  } catch (err) {
    next(err);
  };
}

const createNewMarketplaceUser = async ({ credentials }, next) => {
  try {
    const { firstName, lastName, email, password } = credentials;
    const newUser = new UserModel({
      firstName,
      lastName,
      email,
      hash,
      dateJoined: Date.now(),
      ...generateMarketplaceUserMetadata()
    });
    return await newUser.save();
  } catch (err) {
    next(err);
  };
};

const generateOmniMasterMetadata = () => ({
  omniProfile: {
    isActive: true,
    isAdmin: true,
    organizationID: uuid(),
  },
})

const generateMarketplaceUserMetadata = () => ({
  marketplaceProfile: {
    isActive: true,
  }
});

export {
  registerNewUser
}