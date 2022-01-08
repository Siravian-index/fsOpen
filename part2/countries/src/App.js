import { useEffect, useState } from 'react'
import { getCountries } from './API/countries'
import Country from './components/Country'
import CountriesList from './components/CountriesList'
import BeMoreSpecific from './components/BeMoreSpecific'
import useDebounce from './hooks/useDebounce'
const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const debouncedSearchTerm = useDebounce(search, 500)
  useEffect(() => {
    let isMounted = true
    const setCountriesState = async () => {
      if (debouncedSearchTerm) {
        const countries = await getCountries(debouncedSearchTerm)
        if (isMounted) {
          setCountries(countries)
        }
      }
    }
    setCountriesState()
    return () => (isMounted = false)
  }, [debouncedSearchTerm])
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
