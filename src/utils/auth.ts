export const checkAuthenticated = (req: any, res: any, next: any) => {
  console.log("log cookie", req.cookies)
  // check user in cookie
  // if (req.cookies && req.cookies.user && req.cookies.user.issuer) {
  //   return next();
  // }

  if (req.isAuthenticated() && req.user.issuer) {
    return next();
  }
  return res.status(401).send("401 Unauthorized");
};

// function (req: any, res: any) {
//   // console.log("log1:", req)
//   // console.log("log2", req.user, "log3", req.cookies, "log4",req.cookies, "log5",req.session)
//   // set user in cookie
//   res.cookie('user', req.user, { maxAge: 900000, httpOnly: true });
//   return res.sendStatus(200)
// }