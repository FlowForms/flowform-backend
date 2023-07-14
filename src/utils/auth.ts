export const checkAuthenticated = (req: any, res: any, next: any) => {
  console.log("PP: ", req.user)
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).send("401 Unauthorized");
};
