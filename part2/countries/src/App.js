import { useEffect, useState } from 'react'
import axios from 'axios'
import Country from './components/Country'
import CountriesList from './components/CountriesList'
import BeMoreSpecific from './components/BeMoreSpecific'
const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  console.log(process.env.REACT_APP_API_KEY)
  useEffect(() => {
    let isMounted = true
    const getCountries = async () => {
      const res = await axios.get('https://restcountries.com/v3.1/all')
      const mapped = res.data.map((obj) => {
        return {
          flag: obj.flags.png,
          name: obj.name.common,
          capital: obj.capital,
          population: obj.population,
          langs: obj.languages,
          latlng: obj.capitalInfo.latlng,
        }
      })
      const filteredList = mapped.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
      if (isMounted) {
        setCountries(filteredList)
      }
    }
    getCountries()

    return () => {
      isMounted = false
    }
  }, [search])
  return (
    <>
      <div>
        <label>
          find countries <input value={search} onChange={(e) => setSearch(e.target.value)} />
        </label>
      </div>

      <div>
        {(countries.length === 1 && <Country country={countries} />) ||
          (countries.length <= 10 && countries.length > 1 && (
            <CountriesList countries={countries} setSearch={setSearch} />
          )) ||
          (countries.length > 10 && <BeMoreSpecific />)}
      </div>
    </>
  )
}

export default App

{
  /* <div>
        {countries.length === 1 ? (
          <Country country={countries} />
        ) : countries.length <= 10 && countries.length > 1 ? (
          <CountriesList countries={countries} />
        ) : countries.length > 10 ? (
          <BeMoreSpecific />
        ) : (
          <p>...</p>
        )}
      </div> */
}
