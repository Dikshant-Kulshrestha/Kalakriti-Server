const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  basePrice: {
    type: Number,
  },
  bids: [
    {
      owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      amount: {
        type: Number,
        required: true,
      },
    },
  ],
  rating: Number,

  startTs: {
    type: Date,
    required: true,
    default: Date.now,
  },
  endTs: {
    type: Date,
    required: true,
  },

  images: [
    {
      url: String,
      filename: String,
    },
  ],

  winner: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    amount: {
      type: Number,
    }
  }
});

productSchema.index({ name: "text", title: "text", description: "text" });

module.exports = mongoose.model("product", productSchema);
