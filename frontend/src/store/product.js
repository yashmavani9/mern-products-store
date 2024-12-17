//we are using this instead of useState
//because
//this is a global state

import { create } from 'zustand';

export const useProductStore = create((set) => ({
    products: [],

    setProducts: (products) => set({ products }),

    //create product function
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.image || !newProduct.price) {
            return { success: false, message: "please fill in all the fields" }
        }

        //we are adding a product into database
        //post req to http://localhost:5000/api/products server backend

        // const res = await fetch("http://localhost:5000/api/products")
        //instead --> vite.config.js --> server --> proxy --> target
        const res = await fetch("/api/products", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newProduct),
        });

        const datafromdb = await res.json();
        set((state) => ({ products: [...state.products, datafromdb.data] }));
        return { success: true, message: "product created successfully" };
    },

    //fetch all products function
    fetchProducts: async () => {
        const res = await fetch("/api/products");
        const datafromdb = await res.json();
        set({ products: datafromdb.data });
    },

    deleteProduct: async (pid) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "DELETE"
        });
        const datafromdb = await res.json();
        if (!datafromdb.success) {
            return { sucess: false, message: datafromdb.message };
        }
        set((state) => ({ products: state.products.filter(prod => prod._id !== pid) }));
        return { success: true, message: datafromdb.message };
    },

    updateProduct: async (pid, updatedprod) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(updatedprod),
        });
        const datafromdb = await res.json();
        if (!datafromdb.success) {
            return { sucess: false, message: datafromdb.message };
        }
        set((state) => ({ products: state.products.map(product => product._id === pid ? datafromdb.data : product) }));
        return {success:true, message:datafromdb.message};
    }
}));

//is same as
//const [state,setState] = useState([]);


