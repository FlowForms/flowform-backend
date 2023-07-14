import { readFileSync } from "fs";
import { join } from "path";

export const read = (path: string): string => {
  return readFileSync(join(__dirname, path), "utf8");
};

// TWEET
const CREATE_TWEET = read("./transactions/tweet/create_new_tweet.cdc");

// ACCOUNT
const CREATE_USER_ACCOUNT = read("./transactions/account/create_user_account.cdc");
const ADD_AS_CHILD = read("./transactions/account/add_as_child.cdc");

export {
  // ACCOUNT
  CREATE_USER_ACCOUNT,
  ADD_AS_CHILD,
  // TWEET
  CREATE_TWEET
};
