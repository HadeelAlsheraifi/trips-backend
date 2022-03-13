const express = require("express");
const {
  fetchTrips,
  deleteTrip,
  updateTrip,
  fetchSingleTrip,
  createTrip,
} = require("./trip.controller");
// usage: help to serve the controller to a route
const router = express.Router();
const upload = require("../middleware/multer");
const passport = require("passport");

router.param("tripId", async (req, res, next, tripId) => {
  const trip = await fetchSingleTrip(tripId, next);
  if (trip) {
    req.trip = trip;
    next();
  } else {
    next({
      status: 404,
      message: "Trip Not Found, Try again",
    });
  }
});

//create the route

router.get("/", fetchTrips);

router.get("/:tripId", (req, res, next) => {
  res.json(req.trip);
});
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createTrip
);
router.delete(
  "/:tripId",
  passport.authenticate("jwt", { session: false }),
  deleteTrip
);
router.put(
  "/:tripId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  updateTrip
);

module.exports = router;
