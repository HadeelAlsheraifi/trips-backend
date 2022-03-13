const express = require("express");
const passport = require("passport");

const {
  updateProfile,
  fetchMyProfile,
  fetchProfile,
} = require("./profile.controller");
// usage: help to serve the controller to a route
const router = express.Router();
const upload = require("../middleware/multer");

router.param("profileId", async (req, res, next, profileId) => {
  const profile = await fetchProfile(profileId, next);
  if (profile) {
    console.log(profile);
    res.json(profile);
  } else {
    next({
      status: 404,
      message: "Profile Not Found, Try again",
    });
  }
});

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  fetchMyProfile
);

router.get("/:profileId", passport.authenticate("jwt", { session: false }));
router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  updateProfile
);
module.exports = router;
