import { useEffect, useState } from 'react'
import './App.css'

const RANDOM_FACTS = 'https://catfact.ninja/fact'
// const ENDPOINT_IMG = `https://cataas.com/cat/says/${primeraPalabra}?json=true`
const URL_IMAGE = 'https://cataas.com/'

export const App = () => {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()

  // esto recupera el texto que hay que mostrar
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(RANDOM_FACTS)
        if (!response.ok) {
          throw new Error('Failed to fetch random fact')
        }
        const { fact } = await response.json()
        setFact(fact)
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchData()
  }, [])

  // esto recupera la imagen
  useEffect(() => {
    const fetchCatImage = async () => {
      try {
        if (!fact) return
        const threeFirstWords = fact.split(' ', 3).join(' ')
        const response = await fetch(
          `https://cataas.com/cat/says/${threeFirstWords}?json=true`
        )

        if (!response.ok) {
          throw new Error('Failed to fetch cat image')
        }

        const { url } = await response.json()
        setImageUrl(url)
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchCatImage()
  }, [fact])

  return (
    <main>
      <h1>App de gatitos</h1>
      <section>
        {fact && <p>{fact}</p>}
        {imageUrl && (
          <img
            src={`${URL_IMAGE}${imageUrl}`}
            alt={`Imagen extraída usando las tres primeras palabras de la frase "${fact}"`}
          />
        )}
      </section>
      {fact && <p className='parrafo'>{fact}</p>}
      {imageUrl && (
        <img
          src={`${URL_IMAGE}${imageUrl}`}
          alt={`Imagen extraída usando las tres primeras palabras de la frase "${fact}"`}
        />
      )}
    </main>
  )
}
