const express = require('express');
const { signUp, login , forRoom, authToken} = require('../Controllers/UserControllers.js');

const router = express.Router();

router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/rooms").get(forRoom);
router.route("/auth").get(authToken);




module.exports = router;