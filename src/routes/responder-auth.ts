import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/user', function (req: any, res: any) {
  if(!req.user) res.status(200).send(null);
  if(req.user && req.user.issuer) res.status(200).send(null);
  return res.status(200).send(req.user);
});

// Twitter Viewer Login
router.get('/twitter', passport.authenticate('twitter', {
    // <6> Scopes
    scope: ['tweet.read', 'users.read', 'offline.access', 'follows.read'],
  })
);

// <7> Callback handler
router.get('/twitter/callback', passport.authenticate('twitter'), function (req, res) {
    const userData = JSON.stringify(req.user, undefined, 2);
    res.end(
      `<h1>Authentication succeeded</h1> User data: <pre>${userData}</pre>`
    );
  }
);

// Logout User
router.get('/logout', async (req: any, res: any) => {
    req.logout();
    return res.status(200).end();
});

export default router;
