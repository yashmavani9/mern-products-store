import Product from '../models/product.model.js';
import mongoose from 'mongoose';

export const getprods = async (req,res)=>{
    try {
        const products = await Product.find({});
        res.status(200).json({success:true,data:products});
    } catch (error) {
        console.log("error in fetching products",error.message);
        res.status(500).json({success:false,message:"server error"});
    }
};

export const createprod = async (req, res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "please provide all fields" });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.log("error in create product ", error.message);
        res.status(500).json({ success: false, message: "server error" });
    }
};

export const updateprod = async (req,res)=>{
    const {id} = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:"invalid product id"});
    }

    try {
        const updatedprod = await Product.findByIdAndUpdate(id,product,{new:true});
        res.status(200).json({success:true,data:updatedprod});
    } catch (error) {
        res.status(500).json({success:false,message:"server error"});
    }
};

export const deleteprod = async(req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:"invalid product id"});
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"product deleted"});
    } catch (error) {
        console.log("error in deleting product ",error.message);
        res.status(500).json({success:false,message:"server error"});
    }
};