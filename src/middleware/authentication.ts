import passport from 'passport';
import { Strategy as MagicStrategy, MagicUser } from 'passport-magic';
import { Strategy as TwitterStrategy } from '@superfaceai/passport-twitter-oauth2';
import { MagicUserMetadata } from '@magic-sdk/admin';
import { db } from '../db/db';
import { Err } from '../types';
import { Account } from '@prisma/client';
import { magic } from '../constants';
import config from '../config';

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

//Use the Twitter OAuth2 strategy within Passport
passport.use(
  // <2> Strategy initialization
  new TwitterStrategy(
    {
      clientID: config().twitterClientID,
      clientSecret: config().twitterClientSecret,
      clientType: 'confidential',
      callbackURL:  config().twitterCallbackURL,
    },
    // <3> Verify callback
    (accessToken, refreshToken, profile, done) => {
      console.log('Success!', { accessToken, refreshToken });
      return done(null, {
        id: profile.id,
        username: profile.username,
        displayName: profile.displayName
      });
    }
  )
);


const strategy = new MagicStrategy(async function (user, done) {
  const userMetadata = await magic.users.getMetadataByIssuer(user.issuer);
  const existingUser = await db.account.getByIssuer(user.issuer);

  if (!existingUser) signup(user, userMetadata, done);
  else login(user, existingUser, done);
});

const signup = async (user: MagicUser, userMetadata: MagicUserMetadata, done: any) => {
  try {
    const newUser = await db.account.create({
      accountAddress: userMetadata.publicAddress,
      email: userMetadata.email,
      issuer: userMetadata.issuer,
      lastLoginAt: user.claim.iat,
    });

    return done(null, {
      accountAddress: newUser.accountAddress,
      email: newUser.email,
      issuer: newUser.issuer,
    });

  } catch (e) {
    return done(new Err(`Signup Failed : ${e}`, 'INTERNAL_SERVER'), null);
  }
};

const login = async (user: MagicUser, account: Account, done: any) => {
  try {
    if (user.claim.iat <= account.lastLoginAt) {
      return done(null, false, {
        message: `Replay attack detected for user ${user.issuer}}.`,
      });
    }
    const updatedUser = await db.account.update(account.email, { lastLoginAt: user.claim.iat });

    return done(null, {
      accountAddress: updatedUser.accountAddress,
      email: updatedUser.email,
      issuer: updatedUser.issuer,
    });

  } catch (e) {
    return done(new Err(`Login failed : ${e}`, 'INTERNAL_SERVER'), null);
  }
};

passport.use(strategy);
