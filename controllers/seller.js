const { Types, isValidObjectId } = require("mongoose");
const User = require("../models/User.js");
const Product = require("../models/Product.js");

const getSellerDetails = async (req, res) => {
  const { user } = req.query;

  if (!isValidObjectId(user)) {
    return res.status(400).send({ error: "Not a Valid User ID" });
  }

  const userDetails = await User.findById(user, { firstName: 1, lastName: 1, createdAt: 1 });

  const products = await Product.find({ owner: new Types.ObjectId(user)/* , winner: { $exists: 1 } */ });

  let totalRating = 0;
  let ratingCount = 0;

  products.forEach((product) => {
    if (product.rating) {
      totalRating += product.rating;
      ratingCount++;
    }
  });

  const averageRating = totalRating / ratingCount;

  return res.status(200).send({
    message: "Successfully Fetched Seller Details",
    data: {
      seller: userDetails,
      listings: products,
      ratings: {
        average: averageRating,
        count: ratingCount,
      },
    },
  });
};

module.exports = {
  getSellerDetails,
};