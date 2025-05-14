import { useState, useEffect } from "react"

export function usePostFetch() {
    const [data, setData] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    const triggerPost = (url, postData) => {
        setIsPending(true);
        setError(null);

        if(!url || !postData) return;

        fetch(url, {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(postData)
        }). then(res => {
            if (!res.ok) {
                throw Error ("Problem")
            }
            return res.json();
        }). then(data => {
            console.log("Data Posted")
            setData(data);
            setError(null)
        }).catch (err => {
            setError(err.message)
        }). finally(() => {
            setIsPending(false);
        })

    }

    return { data, isPending, error, triggerPost }
}
