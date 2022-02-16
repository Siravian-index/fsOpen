import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchCountry = async () => {
      if (name) {
        try {
          const res = await axios.get(`https://restcountries.com/v2/name/${name}?fullText=true`)
          console.log(res)
          if (res.data.status === 404) {
            throw new Error('Country name not found')
          }
          const country = { ...res.data[0] }
          setCountry(country)
        } catch (err) {
          setError(true)
          console.error(err.message)
        }
      }
    }
    fetchCountry()
  }, [name])

  return { country, error }
}

const Country = ({ country, error }) => {
  if (!country) {
    return null
  }

  if (error) {
    return <div>not found...</div>
  }

  return (
    <div>
      <h3>{country.name} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div>
      <img src={country.flag} height='100' alt={`flag of ${country.name}`} />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const { country, error } = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} error={error} />
    </div>
  )
}

export default App
