import { useEffect, useState } from 'react';
import Quote from './Quote/Quote';
import Addons from './Addons/Addons';
import Header from './Header/Header';

const QuoteSummary = () => {
  const [stateValue, setStateValue] = useState('monthly');
  const [stateTotal, setStateTotal] = useState({});
  const getData  = (data) => {
    setStateTotal(data);
  }
  return (
    <div className='container mx-auto shadow-md shadow-gray-300	 bg-slate-50 mb-4 '>
        <Header />
        <Quote setStateValue={setStateValue} stateTotal={stateTotal} />
        <Addons stateValue={stateValue}  getExtras={getData}/>
    </div>
  );
};

export default QuoteSummary;