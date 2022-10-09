

import { useState, useEffect } from 'react';
import axios from 'axios';
import { ProductForm } from '../Form/ProductForm';

    /**
     * For UPDATE AND DELETE operations:
     * 
     * PUT: 
     *      Have two modes to your table row, update mode and not updating (isEdit) state
     *      Use conditional rendering to render the table as normal if !isEdit
     *      If isEdit is true, instead, display a altered table where each data is an input
     *      Or create a form/modal that updates a given pokemon when you click on the edit button
     * 
     * DELETE:
     *      Add a delete button to the table row and clicking on it extract the _id from the pokemon object
     *      and shoots off a DELETE http request using axios. From there, manually the remove the pokemon
     *      from the list OR refetch data 
     */

const Product = ({product: {_id, name, supplier, description, price, imageUrl}}) => {

    // const [isEdit, toggleIsEdit] = useState(false);

    // This would be altered row that's in edit mode
    // if (isEdit) {
    //     return (<></>)
    // }
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
    
    // React does NOT support making this callback asynchronous
    // So you MUST use .then()/.catch() OR have it call another async function to use await
    useEffect(() => {
        
        // Move this to store. Get the res.data and use dispatch(setPokemonList(res.data))
        axios.get('http://localhost:9000/product')
            .then(res => { setProductList(res.data); console.log(res.data) })
            .catch(err => console.error(err));
    }, []);

    return (
        <>
            <ProductForm setProductList={setProductList}/>
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
        </>
    );
}