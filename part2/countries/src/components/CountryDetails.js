import Weather from './Weather'

const CountryDetails = ({ country }) => {
  return (
    <>
      <h1>{country.name}</h1>
      <p>capital {country.capital[0]}</p>
      <p>population {country.population}</p>
      <h4>Languages</h4>
      <ul>
        {Object.values(country.langs).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flag} alt={`Flag of ${country.name}`} />
      <Weather capital={country.capital[0]} />
    </>
  )
}

export default CountryDetails
