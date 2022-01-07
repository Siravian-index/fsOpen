import { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
  const [w, setW] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  let compassSector = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
    'N',
  ]
  useEffect(() => {
    let isMounted = true
    const getWeatherData = async () => {
      try {
        setIsLoading(true)
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
        )
        if (isMounted) {
          const simpleWeather = {
            temperature: res.data.main.temp,
            icon: res.data.weather[0].icon,
            windSpeed: res.data.wind.speed,
            windDirection: compassSector[(res.data.wind.deg / 22.5).toFixed(0)],
            iconDescription: res.data.weather[0].description,
          }
          setW(simpleWeather)
          setIsLoading(false)
        }
      } catch (err) {
        console.log(err)
      }
    }
    getWeatherData()

    return () => {
      return (isMounted = false)
    }
  }, [capital])
  console.log(w)
  return (
    <>
      {!isLoading && (
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
      )}
    </>
  )
}

export default Weather
