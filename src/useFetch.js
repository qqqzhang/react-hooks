// if Loading
// if data
// if error

import { useEffect, useState } from "react";

export function useFetch (uri) {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();


    useEffect( () => {
        if(!uri) return;
        fetch(uri).then((data) => data.json()).then(setData).then(
          () => { setLoading(false) } ).catch(setError);
          }, [])

    return { loading, data, error}
}