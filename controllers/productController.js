const Product = require("../models/productModel");
const { getPostData } = require("../utils");

// @desc    Get all products
// @route   GET /api/products
async function getProducts(req, res) {
    try {
        const products = await Product.findAll();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(products));
    } catch (error) {
        console.log(error);
    }
}

// @desc    Get single product
// @route   GET /api/product/:id
async function getProduct(req, res, id) {
    try {
        const product = await Product.findById(id);
        if (!product) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Product Not Found" }));
        } else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(product));
        }
    } catch (error) {
        console.log(error);
    }
}

// @desc    Create single product
// @route   POST /api/products
async function createProduct(req, res) {
    try {
        const body = await getPostData(req);
        const { title, description, price } = JSON.parse(body);

        const product = {
            title,
            description,
            price,
        };

        const newProduct = await Product.create(product);

        res.writeHead(201, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(newProduct));
    } catch (error) {
        console.log(error);
    }
}

// @desc    Update single product
// @route   PUT /api/products/:id
async function updateProduct(req, res, id) {
    try {
        const oldProductData = await Product.findById(id);
        if (!oldProductData) {
            res.writeHead(404, { "Content-type": "application/json" });
            res.end(JSON.stringify({ message: "Product not found" }));
        } else {
            const body = await getPostData(req);

            const { title, description, price } = JSON.parse(body);
            console.log("got here");

            const newProductData = {
                title: title || oldProductData.title,
                description: description || oldProductData.description,
                price: price || oldProductData.price,
            };

            const updProduct = await Product.update(id, newProductData);

            res.writeHead(200, { "Content-type": "application/json" });
            return res.end(JSON.stringify(updProduct));
        }
    } catch (error) {
        console.log(error);
    }
}

// @desc    Delete single product
// @route   Delete /api/products/:id
async function deleteProduct(req, res, id) {
    try {
        const product = await Product.findById(id);

        if (!product) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Product Not Found" }));
        } else {
            await Product.remove(id);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: `Product ${id} removed` }));
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
};
