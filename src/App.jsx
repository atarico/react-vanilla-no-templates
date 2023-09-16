import { useEffect, useState } from 'react'
import './App.css'

const RANDOM_FACTS = 'https://catfact.ninja/fact'
// const ENDPOINT_IMG = `https://cataas.com/cat/says/${primeraPalabra}?json=true`
const URL_IMAGE = 'https://cataas.com/'

export const App = () => {
  const [fact, setFact] = useState('')
  const [imageUrl, setImageUrl] = useState()

  useEffect(() => {
    fetch(RANDOM_FACTS)
      .then((res) => res.json())
      .then((data) => {
        const { fact } = data
        setFact(fact)

        // const firstWord = fact.split(' ').slice(0, 3).join(' ')
        const threeFirstWord = fact.split(' ', 3).join(' ')

        fetch(`https://cataas.com/cat/says/${threeFirstWord}?json=true`)
          .then((res) => res.json())
          .then((response) => {
            const { url } = response

            setImageUrl(url)
          })
      })
  }, [])
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
