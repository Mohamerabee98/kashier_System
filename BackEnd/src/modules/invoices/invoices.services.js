import { Product } from '../../db/models/Product.model.js';
import { Invoice } from './../../db/models/Invoice.model.js';
export const createInvoice =async (req,res,next)=>{


    const { products } = req.body;

    const cashierId = req.user.id;

    let total = 0;

    const invoiceProducts = [];


    for (const item of products) {

      const productData = await Product.findById(item.product);

      if (!productData) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      const itemTotal = productData.price * item.quantity;

      total += itemTotal;

      invoiceProducts.push({
        product: productData._id,
        quantity: item.quantity,
        price: productData.price, 
      });
    }

   
    const invoice = await Invoice.create({
      cashier: cashierId,
      products: invoiceProducts,
      total,
    });

    return res.status(201).json({
      success: true,
      message: "Invoice created successfully",
      data: invoice,
    });

  
}

export const getInvoices = async (req, res) => {

    const invoices = await Invoice.find()
      .populate("cashier", "username") 
      .populate("products.product", "name price"); 

    return res.status(200).json({
      success: true,
      data: invoices,
    });
};