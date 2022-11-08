const { Types, isValidObjectId } = require("mongoose");
const Product = require("../models/Product.js");

const addBid = async (req, res) => {
  const { pId, amount } = req.body;

  const product = await Product.findById(pId).populate("owner");

  if (Date.now() >= Date.parse(product.endTs)) {
    return res.status(400).send({ message: "Failed to Add Bid", error: "Auction is Already Over" });
  }

  if (product.owner._id.equals(req.token.id)) {
    return res
      .status(400)
      .send({ message: "Failed to Add Bid", error: "You Cannot Bid in your own Auction" });
  }

  if (product.bids.length) {
    if (product.bids[product.bids.length - 1].amount >= amount) {
      return res
        .status(400)
        .send({ message: "Failed to Add Bid", error: "Amount has to be Higher than Previous Bid" });
    }

    if (product.bids[product.bids.length - 1].owner._id.equals(req.token.id)) {
      return res.status(400).send({ message: "Failed to Add Bid", error: "You cannot outbid yourself" });
    }
  } else {
    if (product.basePrice >= amount) {
      return res
        .status(400)
        .send({ message: "Failed to Add Bid", error: "Amount has to be Higher than Base Amount" });
    }
  }

  const bid = {
    owner: req.token.id,
    amount: amount,
  };

  product.bids.push(bid);

  await product.save();

  return res.status(200).send({ message: "Bid Added Successfully", data: product });
};

const getBidsByUser = async (req, res) => {
  const { owner } = req.query;

  if (!isValidObjectId(owner)) {
    return res.status(400).send({ error: "Not a Valid User ID" });
  }

  if (req.token.id !== owner) {
    return res.status(403).send({ error: "You can only Fetch your own Past Bids" });
  }

  const bids = await Product.aggregate([
    {
      $match: {
        bids: { $elemMatch: { 'owner': new Types.ObjectId(owner) } }
      },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        description: 1,
        images: 1,
        bids: {
          $filter: { input: "$bids", as: "bid", cond: { $eq: [ "$$bid.owner", new Types.ObjectId(owner) ] } }
        }
      }
    }
  ]);

  return res.status(200).send({ message: "Successfully Fetched Bids", data: bids });
};

module.exports = { addBid, getBidsByUser };
