

import { useState/*, useEffect*/ } from "react";
import axios from "axios";
import { validWarehouseSchema } from "../../Validation/WarehouseValidation";


export const WarehouseForm = ({setWarehouseList}) => {

    const [warehouseData, setWarehouseData] = useState({

        _id: '',
        warehouseName: '',
        warehouseLocation: '',
        maxCapacity: 0,
        currCapacity: 0,
        product: ''

    });

    const handleClear = () => {
        setWarehouseData({

            _id: '',
            warehouseName: '',
            warehouseLocation: '',
            maxCapacity: 0,
            currCapacity: 0,
            product: ''

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

        const formData = {
            name: warehouseData.warehouseName,
            location: warehouseData.warehouseLocation,
            maxCapacity: warehouseData.maxCapacity,
            currCapacity: warehouseData.currCapacity,
            product: warehouseData.product
        }

        

        if (modifierValue === "Create") {

            console.log('CREATING');

            try {

                const isValid = await validWarehouseSchema.isValid(formData);
                console.log(isValid);
                if (!isValid){
                    throw new Error();
                }

                const res = await axios.post('http://localhost:9000/warehouse', formData);

                console.log('New warehouse created.');
                console.log(res.data);
    
                setWarehouseList(warehouseList => [...warehouseList, res.data]);
    
                event.target.reset();
                handleClear();
            } catch (err) {
                console.error(err);
            }
        }
        else if (modifierValue === "Update"){
            console.log('UPDATING');

            try {
                const isValid = await validWarehouseSchema.isValid(formData);
                console.log(isValid);
                if (!isValid){
                    throw new Error();
                }

                const res = await axios.put(`http://localhost:9000/warehouse/${warehouseData._id}`, formData);
                console.log('Warehouse updated.');
                console.log(res.data);
    
                setWarehouseList(warehouseList => [...warehouseList, res.data]);
    
                event.target.reset();
                handleClear();
            } catch (err) {
                console.error(err);
            }
        }
        else if (modifierValue === "Delete"){
            console.log('DELETING');

            try {
                const res = await axios.delete(`http://localhost:9000/warehouse/${warehouseData._id}`);
                console.log('Warehouse deleted.');
                console.log(res.data);
    
                setWarehouseList(warehouseList => [...warehouseList, res.data]);
    
                event.target.reset();
                handleClear();
            } catch (err) {
                console.error(err);
            }
        }
        
    }
    
    return (
        <form onSubmit={handleSubmit} className="warehouse-form">
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
                    <label htmlFor="warehouse-id">Warehouse ID: </label>
                    <input 
                        id="warehouse-id"
                        value={warehouseData._id}
                        onChange={e => setWarehouseData({...warehouseData, _id: e.target.value})} 
                        placeholder="ID Value"
                    />
                </div>
                <div hidden={modifierValue==="Delete"}>
                    <label htmlFor="warehouse-name">Warehouse Name: </label>
                    <input 
                        id="warehouse-name"
                        value={warehouseData.warehouseName}
                        onChange={e => setWarehouseData({...warehouseData, warehouseName: e.target.value})} 
                        placeholder="Name"
                    />
                </div>
                <div hidden={modifierValue==="Delete"}>
                    <label htmlFor="warehouse-location">Location: </label>
                    <input 
                        id="warehouse-location"
                        value={warehouseData.warehouseLocation}
                        onChange={e => setWarehouseData({...warehouseData, warehouseLocation: e.target.value})}
                        placeholder="Location"
                    />
                </div>
                <div hidden={modifierValue==="Delete"}>
                    <label htmlFor="maxCapacity">Maximum Capacity: </label>
                    <input 
                        id="maxCapacity"
                        type="number"
                        value={warehouseData.maxCapacity}
                        onChange={e => setWarehouseData({...warehouseData, maxCapacity: e.target.value})}
                        placeholder="Max. Volume"
                    />
                </div>
                <div hidden={modifierValue==="Delete"}>
                    <label htmlFor="currCapacity">Current Capacity: </label>
                    <input 
                        id="currCapacity"
                        type="number"
                        value={warehouseData.currCapacity}
                        onChange={e => setWarehouseData({...warehouseData, currCapacity: e.target.value})}
                        placeholder="Current Volume"
                    />
                </div>
                <div hidden={modifierValue==="Delete"}>
                    <label htmlFor="product-id">Product ID: </label>
                    <input 
                        id="product-id"
                        value={warehouseData.product}
                        onChange={e => setWarehouseData({...warehouseData, product: e.target.value})}
                        placeholder="Product ID Value"
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