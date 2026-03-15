import { model, Schema } from "mongoose";

const invoiceSchema = new Schema({
  cashier: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    },
  ],

  total: {
    type: Number,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Invoice = model("Invoice", invoiceSchema);