import express from 'express';
import passport from 'passport';
import { checkAuthenticated } from '../utils/auth';
import { magic } from '../constants';

const router = express.Router();

router.post('/login/google', passport.authenticate('magic'), function (req: any, res: any) {
  return res.sendStatus(200)
});

router.get('/user', checkAuthenticated, function (req: any, res: any) {
  return res.status(200).send(req.user);
});

// Logout User
router.post('/logout', async (req: any, res: any) => {
  try {
    if (req.isAuthenticated()) {
      await magic.users.logoutByIssuer(req.user.issuer);
      req.logout();
      return res.status(200).end();
    } else {
      return res.status(401).end(`User is not logged in.`);
    }
  } catch (e) {
    req.logout();
    return res.status(401).end(`User is not logged in.`);
  }
});

export default router;
