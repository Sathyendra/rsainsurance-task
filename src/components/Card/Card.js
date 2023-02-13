import { useState } from "react";

const Card = (props) => {
    const {title, text, monthlyPrice, annualPrice} = props.cardData;
    const stateValue = props.stateValue;
    const currencyOptions = { style: 'currency', currency: 'GBP'};
    const formattedCurrencyMonthly = new Intl.NumberFormat('en-GB', currencyOptions).format(monthlyPrice);
    const formattedCurrencyYearly = new Intl.NumberFormat('en-GB', currencyOptions).format(annualPrice);
    const [selectOption, setSelectedOption] = useState('Select this extra');
    const toggleSelectOption = () => {
        setSelectedOption(selectOption === 'Select this extra' ? 'Selected' : 'Select this extra');
        const obj = {cardDetails : props.cardData, isSelected : selectOption === 'Select this extra' ? 'Selected' : 'Select this extra'}
        props.OnSelected(obj);
    };
    return (
        <div className={`cardContainer bg-white border border-solid border-current px-4 py-4 md:px-6 md:py-6 lg:px-8 lg:py-8 ${selectOption === 'Selected' ? 'bg-blue-500':''}`}>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3" >
            <h4 className="text-2xl font-bold md:font-normal lg:font-normal md:text-3xl lg:text-3xl xl:text-4xl leading-6 md:leading-6 lg:leading-8 xl:leading-loose col-span-3 md:col-span-3 lg:col-span-3 xl:col-span-2 2xl:col-span-2">{title}</h4>
                <div className="QuotePrice self-center text-right text-xl my-4 md:my-4 lg:my-4 xl:my-0">
                    {stateValue === 'monthly' ? (
                        <p>{formattedCurrencyMonthly} per month</p>
                    ) : (
                        <p>{formattedCurrencyYearly} per year</p>
                    )}
                </div>
            </div>
            
            <p className="min-h-12 text-xl mb-4 md:mb-4 lg:mb-4">{text}</p>
            <div className="grid">
            <button onClick={toggleSelectOption} className="grid place-self-end bg-slate-300 hover:bg-blue-500 text-grey-700 font-semibold hover:text-white py-2 px-4 border border-current hover:border-transparent rounded ">
                {selectOption}
            </button>
            </div>
        </div>
    );
}
 
export default Card;