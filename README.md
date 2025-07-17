
# Skills++ Program - Weekly Projects

Welcome to the Skills++ program repository!  
Below are the weeks of the program. Click on each week to see the projects and content.

<details>
  <summary><strong>Week0</strong></summary>

---

# Weather + Air Quality Server (Node.js)

A simple HTTP server built with Node.js core modules to provide weather and air quality data for any specified city.

---

## Table of Contents

- [Overview](#overview)  
- [Features](#features)  
- [Getting Started](#getting-started)  
- [Usage](#usage)  
- [API Endpoint](#api-endpoint)  
- [Response Format](#response-format)  
- [Error Handling](#error-handling)  
- [Dependencies](#dependencies)  
- [License](#license)

---

## Overview

This Node.js server fetches weather data and air quality index (AQI) information for a given city by integrating with third-party APIs. It returns a detailed JSON response including current weather, daily forecasts, hourly data, and AQI values.

---

## Features

- Fetches geographical coordinates for cities using two geocoding APIs as fallback.
- Retrieves current weather, daily and hourly forecasts.
- Fetches air quality metrics including US AQI, European AQI, and UV index.
- Simple and lightweight using only Node.js core modules (`http`, `https`, `url`).
- JSON API with clear, structured responses.
- Runs on port 5000 by default.

---

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- Internet connection to fetch API data

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Dibyajyoti1515/skills-.git
   cd skills-/week0
   ```

2. Start the server:
   ```bash
   npm start
   ```

3. Server will be running at `http://localhost:5000`.

---

## Usage

Make a GET request to the `/weather` endpoint with the city query parameter:

```
http://localhost:5000/weather?city=CityName
```

Example:

```
http://localhost:5000/weather?city=Delhi
```

---

## API Endpoint

### GET `/weather?city=CityName`

- **Query Parameters:**

| Parameter | Type   | Description                   |
| --------- | ------ | -----------------------------|
| `city`    | string | Name of the city (required)  |

- **Request Headers:**

```
Content-Type: application/json
```

---

## Response Format

```json
{
  "results": {
    "location": {
      "latitude": 28.61,
      "longitude": 77.23,
      "elevation": null,
      "timezone": "Asia/Kolkata"
    },
    "current": {
      "time": "2025-07-12T08:00",
      "temperature": "32.1°C",
      "feels_like": "35.0°C",
      "humidity": "60%",
      "weather_code": {
        "code": 3,
        "description": "Partly cloudy"
      },
      "cloud_cover": "40%",
      "wind_speed": "12.4 km/h",
      "wind_gusts": "22.1 km/h",
      "wind_direction": "180°",
      "pressure": "1012 hPa",
      "uv_index": 6.3,
      "us_aqi": 45,
      "european_aqi": 38
    },
    "daily": [
      // Daily forecast array
    ],
    "hourly": [
      // Hourly forecast array (24+ entries)
    ]
  }
}
```

---

## Error Handling

| Status Code | Description                   | Response Body                           |
|-------------|-------------------------------|---------------------------------------|
| 400         | Missing `city` parameter      | `{ "error": "city query parameter is required" }` |
| 404         | City not found                | `{ "error": "City not found" }`       |
| 500         | Internal server error         | `{ "error": "Failed to fetch weather data" }` or other messages |

---

## Dependencies

This project uses only Node.js core modules:

- `http`
- `https`
- `url`
- `assert`
- Other internal JSON and utility files (`wmo.json`, `weatherUrl.js`)

---

## License

MIT License

---

</details>

<details>
  <summary><strong>Week1</strong></summary>

  *( Week 1 projects and notes here)*
</details>

<details>
  <summary><strong>Week2</strong></summary>

  *( Week 2 projects and notes here)*
</details>

<details>
  <summary><strong>Week3</strong></summary>

  *( Week 3 projects and notes here)*
</details>

<details>
  <summary><strong>Week4</strong></summary>

  *(Add Week 4 projects and notes here)*
</details>
