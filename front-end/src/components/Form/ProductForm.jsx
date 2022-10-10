

import { useState } from "react";
import axios from "axios";
import { validProductSchema } from "../../Validation/ProductValidation";


export const ProductForm = ({setProductList}) => {


    const [productData, setProductData] = useState({

        _id: '',
        productName: '',
        productSupplier: '',
        productDescription: '',
        productPrice: 0,
        imageUrl: ''

    });

    const handleClear = () => {
        setProductData({

            _id: '',
            productName: '',
            productSupplier: '',
            productDescription: '',
            productPrice: 0,
            imageUrl: ''

        });
    }

    const [modifierValue, setModifierValue] = useState("Create");

    const handleCreateChange = () => {
        setModifierValue("Create");
    };
    const handleUpdateChange = () => {
        setModifierValue("Update");
    };
    const handleDeleteChange = () => {
        setModifierValue("Delete");
    };


    const handleSubmit = async (event) => {
        // event.preventDefault() will prevent the page refresh
        event.preventDefault();

        if (modifierValue === "Create"){

            console.log("CREATING");

            try {

                const newProduct = {
                    name: productData.productName,
                    supplier: productData.productSupplier,
                    description: productData.productDescription,
                    price: productData.productPrice,
                    imageUrl: productData.imageUrl
                }

                const isValid = await validProductSchema.isValid(newProduct);
                console.log(isValid);
                if (!isValid){
                    throw new Error();
                }

                const res = await axios.post('http://localhost:9000/product', newProduct);
                
                console.log('New product created.')
                console.log(res.data);
    
                setProductList(productList => [...productList, res.data]);
    
                event.target.reset();
                handleClear();
            } catch (err) {
                console.error(err);
            }

        }
        else if (modifierValue === "Update"){

            try {
                const res = await axios.put(`http://localhost:9000/product/${productData._id}`, {
                    name: productData.productName,
                    supplier: productData.productSupplier,
                    description: productData.productDescription,
                    price: productData.productPrice,
                    imageUrl: productData.imageUrl
                });
                console.log('Product updated.')
                console.log(res.data);
    
                setProductList(productList => [...productList, res.data]);
    
                event.target.reset();
                handleClear();
            } catch (err) {
                console.error(err);
            }

        }
        else if (modifierValue === "Delete"){
            console.log('DELETING');

            try {
                const res = await axios.delete(`http://localhost:9000/product/${productData._id}`);
                console.log('Product deleted.');
                console.log(res.data);
    
                setProductList(productList => [...productList, res.data]);
    
                event.target.reset();
                handleClear();
            } catch (err) {
                console.error(err);
            }
        }
        
    }
    
    return (
        <form onSubmit={handleSubmit} className="product-form">
            <div>
                <div>
                    <label>
                        <input 
                            type="radio" 
                            name="modifier"
                            value="Create" 
                            checked={modifierValue === "Create"}
                            onChange={handleCreateChange}
                        /> 
                        Create
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            name="modifier" 
                            value="Update" 
                            checked={modifierValue === "Update"} 
                            onChange={handleUpdateChange}
                        /> 
                        Update
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            name="modifier" 
                            value="Delete" 
                            checked={modifierValue === "Delete"} 
                            onChange={handleDeleteChange}
                        /> 
                        Delete
                    </label>
                </div>
                <div hidden={modifierValue!=="Update" && modifierValue!=="Delete"}>
                    <label htmlFor="product-id">Product ID: </label>
                    <input 
                        id="product-id"
                        value={productData._id}
                        onChange={e => setProductData({...productData, _id: e.target.value})} 
                        placeholder="ID Value"
                    />
                </div>
                <div hidden={modifierValue==="Delete"}>
                    <label htmlFor="product-name">Product Name: </label>
                    <input 
                        id="product-name"
                        value={productData.productName}
                        onChange={e => setProductData({...productData, productName: e.target.value})} 
                        placeholder="Product Name" 
                    />
                </div>
                <div hidden={modifierValue==="Delete"}>
                    <label htmlFor="product-supplier">Supplier: </label>
                    <input 
                        id="product-supplier"
                        value={productData.productSupplier}
                        onChange={e => setProductData({...productData, productSupplier: e.target.value})}
                        placeholder="Supplier Name"
                    />
                </div>
                <div hidden={modifierValue==="Delete"}>
                    <label htmlFor="product-description">Description: </label>
                    <input 
                        id="product-description"
                        value={productData.productDescription}
                        onChange={e => setProductData({...productData, productDescription: e.target.value})}
                        placeholder="Short Description"
                    />
                </div>
                <div hidden={modifierValue==="Delete"}>
                    <label htmlFor="product-price">Price: </label>
                    <input 
                        id="product-price"
                        type="number"
                        value={productData.productPrice}
                        onChange={e => setProductData({...productData, productPrice: e.target.value})}
                        placeholder="Product Price"
                    />
                </div>
                <div hidden={modifierValue==="Delete"}>
                    <label htmlFor="image-url">Image URL: </label>
                    <input id="image-url" value={productData.imageUrl} onChange={e => setProductData({...productData, imageUrl: e.target.value})}/>
                </div>
            </div>
            <div>
                <button type="reset" onClick={handleClear}>Clear</button>
                <button>Submit</button>
            </div>
            
        </form>
    );
}