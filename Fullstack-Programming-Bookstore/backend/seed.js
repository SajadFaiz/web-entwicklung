const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Product = require("./models/Product");
const products = require("./data/products");

dotenv.config();

async function seedProducts() {
  try {
    await connectDB();

    await Product.deleteMany({});
    await Product.insertMany(products);

    console.log("Products imported successfully.");
    process.exit(0);
  } catch (error) {
    console.error(`Seeding failed: ${error.message}`);
    process.exit(1);
  }
}

seedProducts();
