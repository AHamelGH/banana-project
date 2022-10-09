

import { useState, useEffect } from 'react';
import axios from 'axios';
import { ProductForm } from '../Form/WarehouseForm';

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

const Warehouse = ({warehouse: {name, location, maxCapacity, products}}) => {

    // const [isEdit, toggleIsEdit] = useState(false);

    // This would be altered row that's in edit mode
    // if (isEdit) {
    //     return (<></>)
    // }
    return (
        <tr>
            <td className="row-item">{name}</td>
            <td className="row-item">{location}</td>
            <td className="row-item">{maxCapacity}</td>
            <td className="row-item">{products}</td>
        </tr>
    );
}

export const WarehouseList = () => {

    const [warehouseList, setWarehouseList] = useState([]);
    
    // React does NOT support making this callback asynchronous
    // So you MUST use .then()/.catch() OR have it call another async function to use await
    useEffect(() => {
        
        // Move this to store. Get the res.data and use dispatch(setPokemonList(res.data))
        axios.get('http://localhost:9000/warehouse')
            .then(res => { setWarehouseList(res.data); console.log(res.data) })
            .catch(err => console.error(err));
    }, []);

    return (
        <>
            <ProductForm setProductList={setWarehouseList}/>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Maximum Capacity</th>
                        <th>Products</th>
                    </tr>
                </thead>
                <tbody>
                    {warehouseList.map(warehouse => <Warehouse key={warehouse._id} warehouse={warehouse}/>)}
                </tbody>
            </table>
        </>
    );
}