const CountriesList = ({ countries, setSearch }) => {
  return (
    <>
      <div>
        {countries.map((country) => (
          <div key={country.name}>
            <span>{country.name} </span>
            <button onClick={(e) => setSearch(country.name.toLowerCase())}>show</button>
          </div>
        ))}
      </div>
    </>
  )
}

export default CountriesList
