import axios from 'axios'
const getCountries = async (search) => {
  try {
    const res = await axios.get('https://restcountries.com/v3.1/all')
    const mapped = res.data.map((obj) => {
      return {
        flag: obj.flags.png,
        name: obj.name.common,
        capital: obj.capital,
        population: obj.population,
        langs: obj.languages,
      }
    })
    const filteredList = mapped.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
    return filteredList
  } catch (err) {
    console.log(err)
    return []
  }
}

export { getCountries }
