import CountryDetails from './CountryDetails'

const Country = ({ country }) => {
  return (
    <>
      <div>
        {country.map((c) => (
          <CountryDetails country={c} key={c.name} />
        ))}
      </div>
    </>
  )
}

export default Country
