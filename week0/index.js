/**
 * Weather + Air Quality Server (Node.js)
 * ---------------------------------------
 * A simple HTTP server using Node.js core modules to serve weather and air quality data.
 *
 * Run the server:
 *    ```Terminal
 *           npm start
 *    Terminal```
 * Server will run at: http://localhost:5000
 *
 * API Endpoint:
 * GET `/weather?city=CityName`
 *
 * Example:
 *    http://localhost:5000/weather?city=Delhi
 *
 * Required Query Parameter:
 * - `city` (string): The name of the city (e.g. Mumbai, Bangalore, Berlin).
 *
 * Request Headers:
 * - Content-Type: application/json 
 * 
 * Response (JSON Format):
 * {
 *   "results": {
 *     "location": {
 *       "latitude": 28.61,
 *       "longitude": 77.23,
 *       "elevation": null,
 *       "timezone": "Asia/Kolkata"
 *     },
 *     "current": {
 *       "time": "2025-07-12T08:00",
 *       "temperature": "32.1°C",
 *       "feels_like": "35.0°C",
 *       "humidity": "60%",
 *       "weather_code": {
 *         "code": 3,
 *         "description": "Partly cloudy"
 *       },
 *       "cloud_cover": "40%",
 *       "wind_speed": "12.4 km/h",
 *       "wind_gusts": "22.1 km/h",
 *       "wind_direction": "180°",
 *       "pressure": "1012 hPa",
 *       "uv_index": 6.3,
 *       "us_aqi": 45,
 *       "european_aqi": 38
 *     },
 *     "daily": [ ... ],
 *     "hourly": [ ... 24 hourly entries ... ]
 *   }
 * }
 */


const { rejects } = require('assert');
const { error, Console } = require('console');
const http = require('http');
const https = require('https');
const { resolve } = require('path');
const url = require('url');
const weatherURL = require('./weatherUrl');
const wmoMap = require('./wmo.json');

const PORT = 5000;

function dmsToDecimal(dms) {
    const regex = /(\d+)°\s+(\d+)'?\s+([\d.]+)''?\s+([NSEW])/;
    const match = dms.match(regex);

    if (!match) return null;

    let degrees = parseInt(match[1], 10);
    let minutes = parseInt(match[2], 10);
    let seconds = parseFloat(match[3]);
    let direction = match[4];

    let decimal = degrees + minutes / 60 + seconds / 3600;

    if (direction === 'S' || direction === 'W') {
        decimal = -decimal;
    }

    return decimal;
}


function fetchAPI(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = ''
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch(error) {
                    reject(new Error('Failed to parse API response'));
                }
            });
        }).on('error', (error) => reject(error));
    });
}

function formatWeatherResponse(raw , aqi) {
    const now = new Date();
    const hour = now.getHours();
  const formatted = {
    location: {
        latitude: raw.data.latitude,
        longitude: raw.data.longitude,
        elevation: raw.data.elevation,
        timezone: raw.data.timezone
    },
    current: {
        time: raw.data.current.time,
        temperature: raw.data.current.temperature_2m + raw.data.current_units.temperature_2m,
        feels_like: raw.data.current.apparent_temperature + raw.data.current_units.apparent_temperature ,
        humidity: raw.data.current.relative_humidity_2m + raw.data.current_units.relative_humidity_2m,
        weather_code: {
              code: raw.data.current.weather_code,
              description: wmoMap[raw.data.current.weather_code] || "Unknown"
        },
        cloud_cover: raw.data.current.cloud_cover + raw.data.current_units.cloud_cover,
        wind_speed: raw.data.current.wind_speed_10m + raw.data.current_units.wind_speed_10m,
        wind_gusts: raw.data.current.wind_gusts_10m + raw.data.current_units.wind_gusts_10m,
        wind_direction: raw.data.current.wind_direction_10m + raw.data.current_units.wind_direction_10m,
        pressure: raw.data.current.pressure_msl + raw.data.current_units.pressure_msl,
        uv_index: aqi.data.current.uv_index + aqi.data.current_units.uv_index,
        us_aqi: aqi.data.current.us_aqi + aqi.data.current_units.us_aqi,
        european_aqi: aqi.data.current.european_aqi + aqi.data.current_units.european_aqi,
    },
    daily: raw.data.daily.time.map((date, i) => ({
        date,
        min: raw.data.daily.temperature_2m_min[i] + raw.data.daily_units.temperature_2m_min,
        max: raw.data.daily.temperature_2m_max[i] + raw.data.daily_units.temperature_2m_max,
        feels_like_max: raw.data.daily.apparent_temperature_max[i] + raw.data.daily_units.apparent_temperature_max,
        sunrise: raw.data.daily.sunrise[i],
        sunset: raw.data.daily.sunset[i],
        uv_index: raw.data.daily.uv_index_max[i],
        rain: raw.data.daily.rain_sum[i] + raw.data.daily_units.rain_sum,
        wind_speed: raw.data.daily.wind_speed_10m_max[i] + raw.data.daily_units.wind_speed_10m_max,
        wind_gusts: raw.data.daily.wind_gusts_10m_max[i] + raw.data.daily_units.wind_gusts_10m_max,
    })),
    hourly: raw.data.hourly.time.slice(hour, hour + 26).map((time, i) => ({
        time,
        temperature: raw.data.hourly.temperature_2m[i] + raw.data.hourly_units.temperature_2m,
        feels_like: raw.data.hourly.apparent_temperature[i] + raw.data.hourly_units.apparent_temperature,
        rain: raw.data.hourly.rain[i] + raw.data.hourly_units.rain,
        wind_speed: raw.data.hourly.wind_speed_10m[i] + raw.data.hourly_units.wind_speed_10m,
        wind_gusts: raw.data.hourly.wind_gusts_10m[i] + raw.data.hourly_units.wind_gusts_10m,
        visibility: raw.data.hourly.visibility[i] + raw.data.hourly_units.visibility,
        humidity: raw.data.hourly.relative_humidity_2m[i] + raw.data.hourly_units.relative_humidity_2m,
        wind_direction: raw.data.hourly.wind_direction_10m[i] + raw.data.hourly_units.wind_direction_10m,
        weather_code: {
              code: raw.data.hourly.weather_code[i],
              description: wmoMap[raw.data.hourly.weather_code[i]] || "Unknown"
        },
        cloud_cover: raw.data.hourly.cloud_cover[i] + raw.data.hourly_units.cloud_cover,
        soil_moisture: raw.data.hourly.soil_moisture_1_to_3cm[i] + raw.data.hourly_units.soil_moisture_1_to_3cm,
        soil_temperature_6cm: raw.data.hourly.soil_temperature_6cm[i] + raw.data.hourly_units.soil_temperature_6cm,
    }))
  };

  return formatted;
}


async function getCoordinates2(city) {
    const geocodingURL2 = `https://api.opencagedata.com/geocode/v1/json?q=${city},India&key=e64efbb9bc6c498fb86d1e7c11f4f054 `
    
    try {
        const data2 = await fetchAPI(geocodingURL2);
        const result = data2.results[0];

        if(!result || result.length === 0) {
            throw new Error('City not found');
        }



        const latitude = dmsToDecimal(result.annotations.DMS.lat);
        const longitude = dmsToDecimal(result.annotations.DMS.lng);
        const timezone = result.annotations.timezone.name;
        const elevation = null;

        return { latitude, longitude, timezone, elevation, city: city};
    } catch {
        throw new Error('City not found');
    }
}

async function getCoordinates(city) {
    const geocodingURl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;

    try {
        const data = await fetchAPI(geocodingURl);

        if(!data.results || data.results.length === 0) {
            return getCoordinates2(city);
        }
        const { latitude, longitude, name, timezone, elevation } = data.results[0];

        return { latitude, longitude, timezone, elevation, city: name};
    } catch (error) {
        throw new Error('City not found');
    }
}

async function getWeather(latitude, longitude, timezone) {
    const weatherUrl = weatherURL(latitude, longitude, timezone);

    try {
        const data = await fetchAPI(weatherUrl);

        return {
            data : data
        }

    } catch (error) {
        throw new Error('Failed to fetch weather data');
    }
}

async function getAQI(latitude, longitude, timezone) {
    const aqiUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=european_aqi,us_aqi,uv_index`;

    try {
        const data = await fetchAPI(aqiUrl);

        return {
            data : data
        }

    } catch (error) {
        throw new Error('Failed to fetch weather data');
    }
}
const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const query = parsedUrl.query;

    res.setHeader('Content-Type', 'application/json');

    if(req.method == 'GET' && path == '/weather'){
        const city = query.city;

        if(!city) {
            res.statusCode = 400;
            res.end(JSON.stringify({
                error: 'city query parameter is required'
            }));
            return;
        }

        try {

            const coordinates = await getCoordinates2(city);
            const weather = await getWeather(coordinates.latitude, coordinates.longitude, coordinates.timezone);
            const aqi = await getAQI(coordinates.latitude, coordinates.longitude, coordinates.timezone)
            const cleanJson = formatWeatherResponse(weather, aqi);

            res.statusCode = 200;
            res.end(JSON.stringify({ results: cleanJson}));

        } catch (error) {
            res.statusCode = error.message === 'City not found' ? 404 : 500;
            res.end(JSON.stringify({ error: error.message }));
        }

    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 'Endpoint not found'}));
    }
});

server.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
});