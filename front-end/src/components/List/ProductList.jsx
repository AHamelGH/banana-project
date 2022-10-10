

import { useState, useEffect } from 'react';
import axios from 'axios';
import { ProductForm } from '../Form/ProductForm';


const Product = ({product: {_id, name, supplier, description, price, imageUrl}}) => {

    return (
        <tr>
            <td className="row-item">{_id}</td>
            <td className="row-item">{name}</td>
            <td className="row-item">{supplier}</td>
            <td className="row-item">{description}</td>
            <td className="row-item">{price}</td>
            <td className="row-item"><img height="100" src={imageUrl} alt={name}/></td>
        </tr>
    );
}

export const ProductList = () => {

    const [productList, setProductList] = useState([]);
    
    useEffect(() => {
        
        // Move this to store. Get the res.data and use dispatch(setPokemonList(res.data))
        axios.get('http://localhost:9000/product')
            .then(res => { setProductList(res.data); console.log(res.data) })
            .catch(err => console.error(err));
    }, []);

    return (
        <>
            <ProductForm setProductList={setProductList}/>
            <div class="container">
                <table>
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Name</th>
                            <th>Supplier</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productList.map(product => <Product key={product._id} product={product}/>)}
                    </tbody>
                </table>
            </div>
            
        </>
    );
}