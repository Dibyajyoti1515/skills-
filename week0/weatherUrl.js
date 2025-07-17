
function weatherURL(latitude, longitude, timezone){
    const baseUrl = "https://api.open-meteo.com/v1/forecast";

    const params = {
        latitude: latitude,
        longitude: longitude,
        daily: [
            "weather_code",
            "temperature_2m_max",
            "temperature_2m_min",
            "sunrise",
            "sunset",
            "uv_index_max",
            "rain_sum",
            "wind_speed_10m_max",
            "wind_gusts_10m_max",
            "wind_direction_10m_dominant",
            "shortwave_radiation_sum",
            "et0_fao_evapotranspiration",
            "apparent_temperature_max",
            "daylight_duration"
        ],
        hourly: [
            "temperature_2m", 
            "weather_code", 
            "relative_humidity_2m", 
            "wind_speed_10m", 
            "rain", 
            "apparent_temperature", 
            "soil_moisture_1_to_3cm", 
            "soil_temperature_6cm", 
            "visibility", 
            "cloud_cover", 
            "wind_gusts_10m", 
            "wind_direction_10m"
        ],
        current: [
            "temperature_2m",
            "relative_humidity_2m",
            "apparent_temperature",
            "is_day",
            "wind_speed_10m",
            "wind_direction_10m",
            "wind_gusts_10m",
            "precipitation",
            "rain",
            "weather_code",
            "cloud_cover",
            "pressure_msl",
            "surface_pressure"
        ],
        timezone: timezone
    };

    const query = Object.entries(params)
        .map(([key, value]) => {
           return `${key}=${Array.isArray(value) ? value.join(",") : value}`
        }).join("&");  

    const finalUrl = `${baseUrl}?${query}`;

    return finalUrl;
}

module.exports = weatherURL;