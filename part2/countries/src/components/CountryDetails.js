import Weather from './Weather'

const CountryDetails = ({ country }) => {
  const capitalPOS = 0

  // useEffect -> axios.get capital weather.

  return (
    <>
      <h1>{country.name}</h1>
      <p>capital {country.capital[capitalPOS]}</p>
      <p>population {country.population}</p>
      <h4>Languages</h4>
      <ul>
        {Object.values(country.langs).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flag} alt={`Flag of ${country.name}`} />
      <Weather capital={country.capital[capitalPOS]} />
    </>
  )
}

export default CountryDetails
