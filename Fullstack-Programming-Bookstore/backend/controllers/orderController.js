const Product = require("../models/Product");
const Order = require("../models/Order");

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function createOrderNumber() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const randomPart = Math.random().toString(36).slice(2, 7).toUpperCase();

  return `PB-${timestamp}-${randomPart}`;
}

async function createOrder(req, res, next) {
  try {
    const { customer, items } = req.body;

    if (!customer || !customer.fullName || !customer.email || !customer.address) {
      return res.status(400).json({
        success: false,
        message: "Full name, email and address are required."
      });
    }

    if (!isValidEmail(customer.email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address."
      });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "The cart is empty."
      });
    }

    const orderItems = [];
    let subtotal = 0;

    for (const item of items) {
      const productId = Number(item.productId || item.id);
      const quantity = Number(item.quantity);

      if (!productId || !Number.isInteger(quantity) || quantity < 1) {
        return res.status(400).json({
          success: false,
          message: "Each item needs a valid productId and quantity."
        });
      }

      const product = await Product.findOne({ id: productId });

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product with id ${productId} was not found.`
        });
      }

      if (product.stock < quantity) {
        return res.status(400).json({
          success: false,
          message: `Not enough stock for ${product.name}.`
        });
      }

      orderItems.push({
        product: product._id,
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity
      });

      subtotal += product.price * quantity;
    }

    const shipping = subtotal > 0 ? 10 : 0;
    const total = subtotal + shipping;

    const order = await Order.create({
      orderNumber: createOrderNumber(),
      customer: {
        fullName: customer.fullName.trim(),
        email: customer.email.trim().toLowerCase(),
        address: customer.address.trim()
      },
      items: orderItems,
      subtotal,
      shipping,
      total
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully.",
      data: order
    });
  } catch (error) {
    next(error);
  }
}

async function getOrders(req, res, next) {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createOrder,
  getOrders
};
