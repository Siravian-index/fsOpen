import axios from 'axios'

const getWeatherData = async (capital) => {
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
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
    )
    const simpleWeather = {
      temperature: res.data.main.temp,
      icon: res.data.weather[0].icon,
      windSpeed: res.data.wind.speed,
      windDirection: compassSector[(res.data.wind.deg / 22.5).toFixed(0)],
      iconDescription: res.data.weather[0].description,
    }
    return simpleWeather
  } catch (err) {
    console.log(err)
  }
}

export { getWeatherData }
