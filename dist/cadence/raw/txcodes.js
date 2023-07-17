"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.read = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const read = (path) => {
    return (0, fs_1.readFileSync)((0, path_1.join)(__dirname, path), "utf8");
};
exports.read = read;
// // TWEET
// const CREATE_TWEET = read("./transactions/tweet/create_new_tweet.cdc");
// // ACCOUNT
// const CREATE_USER_ACCOUNT = read("./transactions/account/create_user_account.cdc");
// const ADD_AS_CHILD = read("./transactions/account/add_as_child.cdc");
// export {
//   // ACCOUNT
//   CREATE_USER_ACCOUNT,
//   ADD_AS_CHILD,
//   // TWEET
//   CREATE_TWEET
// };
//# sourceMappingURL=txcodes.js.map