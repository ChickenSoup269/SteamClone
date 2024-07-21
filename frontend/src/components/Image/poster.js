import { useState, forwardRef } from 'react'
import images from '~/assets/images'

const Poster = forwardRef(({ src, alt, ...props }, ref) => {
    const [fallback, setFallback] = useState('')

    const handleError = () => {
        setFallback(images.noPoster)
    }

    return <img ref={ref} src={fallback || src} alt={alt} {...props} onError={handleError} />
})

export default Poster
