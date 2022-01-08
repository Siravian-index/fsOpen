import { useEffect, useState } from 'react'
import { getWeatherData } from '../API/weather'

const Weather = ({ capital }) => {
  const [w, setW] = useState({})

  useEffect(() => {
    let isMounted = true
    const setWeatherState = async () => {
      const weatherInfo = await getWeatherData(capital)
      if (isMounted) {
        setW(weatherInfo)
      }
    }
    setWeatherState()
    return () => (isMounted = false)
  }, [capital])

  return (
    <>
      <div>
        <h4>Weather in {capital}</h4>
        <div>
          <p>
            <b>temperature</b>: {w.temperature} Celsius
          </p>
          <img src={`http://openweathermap.org/img/wn/${w.icon}@2x.png`} alt={w.iconDescription} />
          <span>{w.iconDescription}</span>
          <p>
            <b>wind</b>:{w.windSpeed} kph direction {w.windDirection}
          </p>
        </div>
      </div>
    </>
  )
}

export default Weather
