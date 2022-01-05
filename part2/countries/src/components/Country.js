import CountryDetails from './CountryDetails'

const Country = ({ country }) => {
  let languages = country[0].languages
  return (
    <>
      <div>
        {country.map((c) => (
          <CountryDetails country={c} key={c.name.common} languages={languages} />
        ))}
      </div>
    </>
  )
}

export default Country
