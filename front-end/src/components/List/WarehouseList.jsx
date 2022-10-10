

import { useState, useEffect } from 'react';
import axios from 'axios';
import { WarehouseForm } from '../Form/WarehouseForm';
import '../../Style/tables.css'


const Warehouse = ({warehouse: {_id, name, location, maxCapacity, currCapacity, product}}) => {

    return (
        <tr>
            <td className="row-item">{_id}</td>
            <td className="row-item">{name}</td>
            <td className="row-item">{location}</td>
            <td className="row-item">{maxCapacity}</td>
            <td className="row-item">{currCapacity}</td>
            <td className="row-item">{product}</td>
        </tr>
    );
}

export const WarehouseList = () => {

    const [warehouseList, setWarehouseList] = useState([]);
    
    useEffect(() => {

        axios.get('http://localhost:9000/warehouse')
            .then(res => { setWarehouseList(res.data); console.log(res.data) })
            .catch(err => console.error(err));
    }, []);

    return (
        <>
            <WarehouseForm setWarehouseList={setWarehouseList}/>
            <div class="container">
                <table>
                    <thead>
                        <tr>
                            <th>Warehouse ID</th>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Max Capacity</th>
                            <th>Current Capacity</th>
                            <th>Product</th>
                        </tr>
                    </thead>
                    <tbody>
                        {warehouseList.map(warehouse => <Warehouse key={warehouse._id} warehouse={warehouse}/>)}
                    </tbody>
                </table>
            </div>
            
        </>
    );
}