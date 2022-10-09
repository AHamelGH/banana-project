

import { useState } from "react";
import axios from "axios";


export const ProductForm = ({setProductList}) => {


    const [productData, setProductData] = useState({

        productName: '',
        productSupplier: '',
        productDescription: '',
        productPrice: 0,
        imageUrl: ''

    });

    const handleClear = () => {
        setProductData({

            productName: '',
            productSupplier: '',
            productDescription: '',
            productPrice: 0,
            imageUrl: ''

        });
    }


    const handleSubmit = async (event) => {
        // event.preventDefault() will prevent the page refresh
        event.preventDefault();
        try {
            const res = await axios.post('http://localhost:9000/product', {
                name: productData.productName,
                supplier: productData.productSupplier,
                description: productData.productDescription,
                price: productData.productPrice,
                imageUrl: productData.imageUrl
            });
            console.log('New product created.')
            console.log(res.data);

            setProductList(productList => [...productList, res.data]);

            event.target.reset();
            handleClear();
        } catch (err) {
            console.error(err);
        }
    }
    
    return (
        <form onSubmit={handleSubmit} className="product-form">
            <div>
                <div>
                <label htmlFor="product-name">Product Name: </label>
                <input 
                    id="product-name"
                    value={productData.productName}
                    onChange={e => setProductData({...productData, productName: e.target.value})} 
                    placeholder="Banana" 
                />
                </div>
                <div>
                <label htmlFor="product-supplier">Supplier: </label>
                <input 
                    id="product-supplier"
                    value={productData.productSupplier}
                    onChange={e => setProductData({...productData, productSupplier: e.target.value})}
                    placeholder="Chiquita"
                />
                </div>
                <div>
                <label htmlFor="product-description">Description: </label>
                <input 
                    id="product-description"
                    value={productData.productDescription}
                    onChange={e => setProductData({...productData, productDescription: e.target.value})}
                    placeholder="A banana based product."
                />
                </div>
                <div>
                <label htmlFor="product-price">Price: </label>
                <input 
                    id="product-price"
                    type="number"
                    value={productData.productPrice}
                    onChange={e => setProductData({...productData, productPrice: e.target.value})}
                    placeholder="Product Price"
                />
                </div>
                <div>
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