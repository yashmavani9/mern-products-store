//you can also simply use product.js

import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: true
    },
},{
    timestamps: true
});

//this will create new collection 'Product'(products in mongodb online website)
//to access here we will use const --> Product

//'Product' collection --> with schema - productSchema
const Product = mongoose.model('Product',productSchema);

export default Product;

//database is created in MONGO_URI --> /product_db