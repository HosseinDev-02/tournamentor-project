import React, { useEffect, useState } from "react";

function useDebounce(value, delay) {
    const [deBouncedValue, setDeBouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDeBouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return deBouncedValue;
}

export default useDebounce;
