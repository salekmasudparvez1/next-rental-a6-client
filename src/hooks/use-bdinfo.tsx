
import { useEffect, useState } from "react";

export const useDivision = () => {
    const [data, setData] = useState<Record<string, unknown> | null>(null);
    useEffect(() => {
        fetch("/bdinfo.json")
            .then((res) => res.json())
            .then((json) => setData(json));
    }, []);

    return data;
}


export const useBdInf = () => {
    return { useDivision };
}
