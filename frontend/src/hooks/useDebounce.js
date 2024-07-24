import { useState, useEffect } from 'react'

function useDebounce(value, delay) {
    const [debounceValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay)
        return () => clearTimeout(handler)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])
    return debounceValue
}

export default useDebounce
