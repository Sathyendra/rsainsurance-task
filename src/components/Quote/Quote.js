import { useEffect, useState } from "react";
import useFetch from "../useFetch";

const Quote = (props) => {
const quote = useFetch('http://localhost:3000/quote');
const data = quote[0];
const options = { year: 'numeric', month: 'long', day: 'numeric',  hour: 'numeric', minute: 'numeric', second: 'numeric' };
const currencyOptions = { style: 'currency', currency: 'GBP'};
const [paymentOption, setPaymentOption] = useState('monthly');
const [formattedTime, setFormattedTime] = useState('');
const [formattedCurrencyMonthly, setFormattedCurrencyMonthlyPrice] = useState(0);
const [formattedCurrencyYearly, setFormattedCurrencyYearly] = useState(0);
const [address1, setAddress1] = useState('');
const [address2, setAddress2] = useState('');
const [quoteRef, setQuoreRef] = useState('');
const [firstName, setFirstName] = useState('');
const [updatedMonthlyTotal, setUpdatedMonthlyTotal] = useState(formattedCurrencyMonthly);

const togglePaymentOption = () => {
    setPaymentOption(paymentOption === 'monthly' ? 'annually  ' : 'monthly');
    props.setStateValue(paymentOption === 'monthly' ? 'annually  ' : 'monthly');
};

useEffect(()=> {
    if (data) {
        setFormattedTime(new Intl.DateTimeFormat('en-GB', options).format(new Date(data.startDate)));
        setFormattedCurrencyYearly(new Intl.NumberFormat('en-GB', currencyOptions).format(data.annualPrice));
        setAddress1(data.address1);
        setAddress2(data.address2);
        setQuoreRef(data.quoteRef);
        setFirstName(data.firstName);
            if (props.stateTotal) {
                if(props.stateTotal.monthlyPrice !== undefined && props.stateTotal.monthlyPrice !== NaN) {
                    console.log(formattedCurrencyMonthly);
                    let stripFormat="";
                    if (typeof formattedCurrencyMonthly === 'string' && formattedCurrencyMonthly.indexOf('£') > -1) {
                        stripFormat = formattedCurrencyMonthly.replace(/£/g,'');
                    }
                    else {
                        stripFormat = formattedCurrencyMonthly;
                    }
                    let updatedTotal = 0;
                    if (props.stateTotal.isSelected === 'Selected') {
                        updatedTotal = +(parseFloat(stripFormat) + parseFloat(props.stateTotal.monthlyPrice)).toFixed(2);
                    }
                    else {
                        updatedTotal = +(parseFloat(stripFormat) - parseFloat(props.stateTotal.monthlyPrice)).toFixed(2);
                    }
                    
                    setFormattedCurrencyMonthlyPrice(updatedTotal);
                } 
                else {
                    setFormattedCurrencyMonthlyPrice(new Intl.NumberFormat('en-GB', currencyOptions).format(data.monthlyPrice ));
                }
            }
            if (props.stateTotal) {
                if(props.stateTotal.annualPrice !== undefined && props.stateTotal.annualPrice !== NaN) {
                    console.log(formattedCurrencyYearly);
                    let stripFormat="";
                    if (typeof formattedCurrencyYearly === 'string' && formattedCurrencyYearly.indexOf('£') > -1) {
                        stripFormat = formattedCurrencyYearly.replace(/£/g,'');
                    }
                    else {
                        stripFormat = formattedCurrencyYearly;
                    }
                    let updatedYearTotal = 0;
                    if (props.stateTotal.isSelected === 'Selected') {
                        updatedYearTotal = +(parseFloat(stripFormat) + parseFloat(props.stateTotal.annualPrice)).toFixed(2);
                    }else {
                        updatedYearTotal = +(parseFloat(stripFormat) - parseFloat(props.stateTotal.annualPrice)).toFixed(2);
                    }
                    setFormattedCurrencyYearly(updatedYearTotal);
                } 
                else {
                    setFormattedCurrencyYearly(new Intl.NumberFormat('en-GB', currencyOptions).format(data.annualPrice ));
                }
            }
        }
},[props, data]);
    return (
        <div className="container px-4 py-4 md:px-6 md:py-6 lg:px-8 lg:py-8">
               
                    
                <div className="container grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-2" >
                    <div className="QuoteDetails mt-2 md:mt-8 lg:mt-8">
                        <h2 className="text-4xl leading-loose">Hey {firstName}, </h2>
                        <p className="text-xl leading-loose	py-2">Here is your quote for Royal & Sun Alliance, {address1} {address2}</p>
                        <p className="text-xl leading-loose	py-2">Quote reference: {quoteRef}</p>
                        <p className="text-xl leading-loose	py-2">Covers starts on {formattedTime}</p>
                    </div>
                    <div className="QuotePrice bg-white border border-solid border-current px-6 py-6 text-center grid justify-items-center">
                        {paymentOption === 'monthly' ? (
                            <div>
                                <h3 className="text-6xl	leading-relaxed	">{formattedCurrencyMonthly}</h3>
                                <h4 className="text-4xl	">per month</h4>
                            </div>
                        ) : (
                            <div>
                                <h3 className="text-6xl	leading-relaxed	">{formattedCurrencyYearly}</h3>
                                <h4 className="text-4xl	">per year</h4>
                            </div>
                        )}
                        <p className="text-xl max-w-md py-8">This price includes Insurance Premium Tax at the current rate. No charge for paying {paymentOption}.</p>
                        <button onClick={togglePaymentOption} className="bg-slate-300 hover:bg-blue-500 text-grey-700 font-semibold hover:text-white py-2 px-4 border border-current hover:border-transparent rounded w-64">
                            {paymentOption === 'monthly' ? 'Switch to annual' : 'Switch to monthly'}
                        </button>
                    </div>
                </div>
        </div>
      );
}
 
export default Quote;