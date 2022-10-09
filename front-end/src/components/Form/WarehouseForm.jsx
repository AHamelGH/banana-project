

import { useState } from "react";
import axios from "axios";


export const WarehouseForm = ({setWarehouseList}) => {
    

    const [warehouseData, setWarehouseData] = useState({

        warehouseName: '',
        warehouseLocation: '',
        maxCapacity: null,
        products: []

    });

    const handleClear = () => {
        setWarehouseData({

            warehouseName: '',
            warehouseLocation: '',
            maxCapacity: null,
            products: []

        });
    }


    const handleSubmit = async (event) => {
        // event.preventDefault() will prevent the page refresh
        event.preventDefault();
        try {
            const res = await axios.post('http://localhost:9000/warehouse', {
                name: warehouseData.warehouseName,
                location: warehouseData.warehouseLocation,
                maxCapacity: warehouseData.maxCapacity,
                products: warehouseData.products
            });
            console.log('New warehouse created.')
            console.log(res.data);

            setWarehouseList(warehouseList => [...warehouseList, res.data]);

            event.target.reset();
            handleClear();
        } catch (err) {
            console.error(err);
        }
    }
    
    return (
        <form onSubmit={handleSubmit} className="warehouse-form">
            <div>
                <div>
                <label htmlFor="warehouse-name">Warehouse Name: </label>
                <input 
                    id="warehouse-name"
                    value={warehouseData.warehouseName}
                    onChange={e => setWarehouseData({...warehouseData, warehouseName: e.target.value})} 
                    placeholder="Name"
                />
                </div>
                <div>
                <label htmlFor="warehouse-location">Location: </label>
                <input 
                    id="warehouse-location"
                    value={warehouseData.warehouseLocation}
                    onChange={e => setWarehouseData({...warehouseData, warehouseLocation: e.target.value})}
                    placeholder="Location"
                />
                </div>
                <div>
                <label htmlFor="maxCapacity">Maximum Capacity: </label>
                <input 
                    id="maxCapacity"
                    value={warehouseData.maxCapacity}
                    onChange={e => setWarehouseData({...warehouseData, maxCapacity: e.target.value})}
                    placeholder="0"
                />
                </div>
            </div>
            <div>
                <button type="reset" onClick={handleClear}>Clear</button>
                <button>Submit</button>
            </div>
            
        </form>
    );
}