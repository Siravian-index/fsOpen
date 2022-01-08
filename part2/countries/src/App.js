import { useEffect, useState } from 'react'
import axios from 'axios'
import { getCountries } from './API/countries'
import Country from './components/Country'
import CountriesList from './components/CountriesList'
import BeMoreSpecific from './components/BeMoreSpecific'
const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    let isMounted = true
    const setCountriesState = async () => {
      try {
        const countries = await getCountries(search)
        if (isMounted) {
          setCountries(countries)
        }
      } catch (err) {
        console.log(err)
      }
    }
    setCountriesState()
    return () => (isMounted = false)
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
