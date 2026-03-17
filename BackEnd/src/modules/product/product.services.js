import { Product } from "../../db/models/Product.model.js";

export const createProduct = async (req, res, next) => {

    const { name, price, category, description } = req.body;

    const checkProduct = await Product.findOne({ name });

    if (checkProduct) {
      return res
        .status(400)
        .json({ success: false, message: "Product Already exists" });
    }

    const newProduct = await Product.create({
      name,
      price,
      category,
      description,
    });

    return res.status(201).json({
      success: true,
      message: "Product Created success",
      data: newProduct,
    });
};
export const getAllProduct = async (req, res, next) => {

    const products = await Product.find();

    return res.status(200).json({
      success: true,
      message: "Done!",
      data: products,
    });
 
};
export const deleteProduct = async (req, res, next) => {

    const { id } = req.params;

    const product = await Product.findById(id);


    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not Found" });
    }

    await Product.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });

};
export const updateProduct = async (req, res, next) => {
 
    const { id } = req.params;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  
};