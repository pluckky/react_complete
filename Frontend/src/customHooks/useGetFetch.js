import { useState, useEffect } from "react";

export function useGetFetch(url){
    const [data, setData] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    const triggerGet = (url) => {
        setIsPending(true);
        setError(null);

        if (!url) return;

        fetch(url)
            .then(res => {
                if(!res.ok){
                    throw Error ("Status of 404 (Not Found)")
                }
                return res.json()
            }).then(data =>  {
                console.log(data);
                setData(data);
                setError(null);
            }).catch(err => {
                setError(err.message);
            }).finally(() => {
                setIsPending(false);
            })
    }

    return {data, isPending, error, triggerGet};
}

