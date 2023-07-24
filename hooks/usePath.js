import { useState, useEffect } from 'react'

export default function usePath(data) {
  const [imgSrc, setImgSrc] = useState([])

  useEffect(() => {
    const loadImagePaths = () => {
      if (data && Array.isArray(data)) {
        const paths = data.map((v, i) => {
          // const imagePath = require(`/${v.image}`)
          // return imagePath.default
          return `/${v.image}`
        })
        setImgSrc(paths)
      }
    }

    loadImagePaths()
  }, [data])

  return { imgSrc, setImgSrc }
}
