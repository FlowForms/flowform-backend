export const checkAuthenticated = (req: any, res: any, next: any) => {
  if (req.isAuthenticated() && req.user.issuer) {
    return next();
  }
  return res.status(401).send("401 Unauthorized");
};
