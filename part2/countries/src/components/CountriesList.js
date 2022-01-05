const CountriesList = ({ countries, setSearch }) => {
  return (
    <>
      <div>
        {countries.map((country) => (
          <div key={country.name.common}>
            <span>{country.name.common} </span>
            <button onClick={(e) => setSearch(country.name.common.toLowerCase())}>show</button>
          </div>
        ))}
      </div>
    </>
  )
}

export default CountriesList
