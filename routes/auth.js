const express = require('express');
const passport = require('passport');
const router = express.Router();
let url = ''
if (process.env.NODE_ENV === 'production') {
  url = 'https://no-imagination-required.io'
} else {
  url = 'http://localhost:3000'
}


// @desc    Google OAuth Transaction
// @route   GET /auth/google
router.get('/google', passport.authenticate('google', { prompt: 'select_account', scope: ['profile'] }));

// @desc    Google OAuth Callback
// @route   GET /auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: url + '/scenes',
    failureRedirect: '/',
  }),
);

// @desc    Facebook OAuth Transaction
// @route   GET /auth/facebook
router.get('/facebook', passport.authenticate('facebook'));

// @desc    Facebook OAuth Callback
// @route   GET /auth/facebook/callback
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: url + '/',
    failureRedirect: '/',
  }),
);

// @desc    Logout User
// @route   GET /auth/logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
