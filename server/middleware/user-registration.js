import bcrypt from 'bcrypt';
import uuid from 'uuid/v1';

import { UserModel } from '../models/schema/user-mongoose';

import { handleError } from '../../lib/utils/logger';

const registration = {
  omni: ({ credentials }, next) => createNewOmniMaster({ credentials }, next),
  marketplace: ({ credentials }, next) => createNewMarketplaceUser({ credentials }, next),
};

const registerNewUser = (req, res, next) => {
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

    validateCredentials({ credentials: req.body }, next);
    const registrationFunction = registration[req.query.pathway]
    registrationFunction({ credentials: req.body }, next);

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
    console.log("Validating credentials and searching for existing user.")
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      console.log(existingUser);
      const err = new Error('User already exists with this account. Please log in.')
      err.status = 409;
      return next(err);
    }
  } catch (err) { next(err) };
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
    const uploadedUser = await newUser.save();
    console.log("Uploaded User:")
    console.log(uploadedUser)
    res.json(uploadedUser);
  } catch (err) { next(err) };
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
    const uploadedUser = await newUser.save();
    console.log("Uploaded User:")
    console.log(uploadedUser);
    res.json(uploadedUser);
  } catch (err) {
    console.log("Logging the error once.")
    console.log(err)
    console.log("Sending it to next(err)")
    handleError(err);
    next(err)
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