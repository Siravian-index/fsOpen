const CountryDetails = ({ country, languages }) => {
  const capitalPOS = 0

  // useEffect -> axios.get capital weather.

  return (
    <>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[capitalPOS]}</p>
      <p>population {country.population}</p>
      <h4>Languages</h4>
      <ul>
        {Object.values(languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
      {/* weather comp */}
    </>
  )
}

export default CountryDetails
