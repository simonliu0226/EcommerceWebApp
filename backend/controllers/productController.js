const Product = require('../modles/Product');

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error});
    }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
        } else {
            res.json(product);
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching product", error });
    }
}

// Create a new product
exports.createProduct = async (req, res) => {
    const { name, description, price, inStock, imageUrl } = req.body;
    try {
        const newProduct = new Product({ name, description, price, inStock,  imageUrl });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: "Error creating product", error });
    }
};

// Update an existing product
exports.updateProduct = async (req, res) => {
    const { name, description, price, inStock, imageUrl } = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { name, description, price, inStock, imageUrl }, { new: true });
        if (!updatedProduct) {
            res.status(404).json({ message: "Product not found" });
        } else {
            res.json(updatedProduct);
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error })
    }
};

// Delete a product by Id
exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            res.status(404).json({ message: "Product not found" });
        } else {
            res.json({ message: "Product deleted "});
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error });
    }
};