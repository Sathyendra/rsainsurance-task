import { useEffect, useState } from "react";
import useFetch from "../useFetch";
import Card from "../Card/Card";
import { type } from "@testing-library/user-event/dist/type";

const Addons = (props) => {
    const addons = useFetch('http://localhost:3000/addons');
    const stateValue = props.stateValue;
    const [selectedExtras, setSelectedExtras] = useState([]);
    const [removedExtras, setRemovedExtras] = useState([]);
    
    const handleSelectedOption = (value) => {
        const newItem = {monthlyPrice:value.cardDetails.monthlyPrice, annualPrice:value.cardDetails.annualPrice, isSelected: value.isSelected};
        props.getExtras(newItem);
    }
    return (
        <div>
            <div className="container px-4 py-4 md:px-6 md:py-6 lg:px-8 lg:py-8">
                <h4 className="text-3xl md:text-4xl lg:text-5xl">Tailor your cover with our optional extra</h4>
            </div>
            <div className="container grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-2 px-4 py-4 md:px-6 md:py-6 lg:px-8 lg:py-8 ">
                { addons.map((addon, index)=>{
                    return (
                        <Card key={index} cardData={addon} stateValue={stateValue}  OnSelected={handleSelectedOption}/>
                        )
                })}
                
            </div>
        </div>
        );
}
 
export default Addons;