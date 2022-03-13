const Profile = require("../models/Profile");
const Trip = require("../models/Trip");

//get All  Trips
exports.fetchTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find().populate("owner");
    return res.status(200).json(trips);
  } catch (error) {
    next(error);
  }
};

// get Single Trip
exports.fetchSingleTrip = async (tripId, next) => {
  try {
    const trip = await Trip.findById(tripId).populate("owner");
    return trip;
  } catch (error) {
    next(error);
  }
};

// Create Trip

exports.createTrip = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `/${req.file.path}`;
      req.body.image = req.body.image.replace("\\", "/");
    }
    req.body.owner = req.user.profile;
    const newTrip = await Trip.create(req.body);
    const profile = await Profile.findById(req.user.profile);
    profile.trips = [...profile.trips, newTrip._id];
    await profile.save();

    return res.status(201).json(newTrip);
  } catch (error) {
    next(error);
  }
};

// Delete Trip

exports.deleteTrip = async (req, res, next) => {
  try {
    if (!req.user._id.equals(req.trip.owner)) {
      return next({
        status: 401,
        message: "Owner not Identified!,Try Again",
      });
    }
    await req.trip.remove();
    res.status(204).end();
  } catch (err) {
    next(error);
  }
};

// update Trip

exports.updateTrip = async (req, res, next) => {
  try {
    if (!req.user._id.equals(req.trip.owner)) {
      return next({ status: 401, message: "Owner not Identified!,Try Again" });
    }
    if (req.file) {
      req.body.image = `/${req.file.path}`;
      req.body.image = req.body.image.replace("\\", "/");
    }
    req.body.owner = req.user._id;
    const trip = await Trip.findByIdAndUpdate(
      req.trip,
      { owner: req.user._id },
      req.body,
      { new: true, runValidators: true }
    ).populate({ path: "owner", select: "-password" });

    return res.status(200).json(trip);
  } catch (error) {
    next(error);
  }
};
