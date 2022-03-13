const Profile = require("../models/Profile");
const Trip = require("../models/Trip");

// get my Profile
exports.fetchMyProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findById(req.user.profile)
      .populate("owner")
      .populate("trips");
    console.log(profile);
    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};

// get Single Profile
exports.fetchProfile = async (profileId) => {
  try {
    const profile = await Profile.findById(profileId)
      .populate("owner")
      .populate("trips");
    return profile;
  } catch (error) {
    return error;
  }
};

// update Profile

exports.updateProfile = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `/${req.file.path}`;
    }
    req.body.owner = req.user._id;
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      req.body,
      { new: true, runValidators: true, upsert: true } // returns the updated product,upsert update new object(profile)) if its not excit
    ).populate("owner");
    req.user.profile = profile._id;
    await req.user.save();
    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};
