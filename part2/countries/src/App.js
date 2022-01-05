import { useEffect, useState } from 'react'
import axios from 'axios'
const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  useEffect(() => {
    const getCountries = async () => {
      const res = await axios.get('https://restcountries.com/v3.1/all')
      // before setting the data, add a filter to check if the country name contains "search"
      const filteredList = res.data.filter((c) => c.name.common.includes(search))
      console.log(filteredList)
      setCountries(filteredList)
    }
    getCountries()
  }, [search])
  return (
    <>
      <div>
        <label htmlFor=''>
          find countries <input value={search} onChange={(e) => setSearch(e.target.value)} />
        </label>
      </div>
      <div>
        {countries.length > 10 && <p>Too many matches, specify another filter</p>}
        {countries.length <= 10 && countries.length > 1 && <p>Render list of 10 countries' names</p>}
        {countries.length === 1 && <p>Show info of one country</p>}
      </div>
    </>
  )
}

export default App
