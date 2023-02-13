import React, { useEffect, useState } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetch(url).then((response)=> {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        }).then((data) => { 
            setData(data);
        })
        .catch((error) => {
            setError(error.message);
          });
    },[url]);
    
    
    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!data) {
        return <div>Loading...</div>;
    }
    return data;
}
 
export default useFetch;

