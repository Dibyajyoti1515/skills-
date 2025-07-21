
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

---

# To-Do List API (Express.js)

A simple REST API server built with **Express.js** to manage to-do items using in-memory storage. No database is used.

---

## Table of Contents

- [Overview](#overview)  
- [Features](#features)  
- [Getting Started](#getting-started)  
- [Usage](#usage)  
- [API Endpoints](#api-endpoints)  
- [Response Format](#response-format)  
- [Error Handling](#error-handling)  
- [License](#license)

---

## Overview

This Node.js and Express-based server allows users to create, view, and delete to-do tasks without using a database. Tasks are stored in an in-memory array and managed with a simple auto-incrementing ID system. It runs on port `3000`.

---

## Features

- Add, view, and delete to-do items via RESTful API
- In-memory storage (no database required)
- Supports `application/json` and `x-www-form-urlencoded`
- Lightweight and easy to test with Postman or curl

---

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)

### Installation

```bash
git clone https://github.com/Dibyajyoti1515/skills-.git
cd skills-/week1
npm install
```

### Start Server

```bash
node index.js
```

The server will run at:  
`http://localhost:3000`

---

## Usage

###  POST `/todos`
- **Request:**
  ```json
  {
    "task": "Complete project"
  }
  ```
- **Response:**
  ```json
  {
    "id": 1,
    "task": "Complete project",
    "completed": false
  }
  ```

###  GET `/todos`
- **Response:**
  ```json
  [
    {
      "id": 1,
      "task": "Complete project",
      "completed": false
    }
  ]
  ```

###  DELETE `/todos/1`
- **Response:** `204 No Content` (Empty body if successful)

---

## API Endpoints

| Method | Endpoint         | Description              |
|--------|------------------|--------------------------|
| GET    | `/todos`         | Get all tasks            |
| POST   | `/todos`         | Add a new task           |
| DELETE | `/todos/:id`     | Delete a task by ID      |

---

## Response Format

```json
{
  "id": 1,
  "task": "Your Task",
  "completed": false
}
```

---

## Error Handling

| Status Code | Message                         |
|-------------|----------------------------------|
| 400         | Missing or invalid task input    |
| 404         | Task not found for deletion      |
| 500         | Internal server error            |

---

## License

MIT License

---

</details>


<details>
  <summary><strong>Week2</strong></summary>

  *( Week 2 projects and notes here)*
</details>

<details>
  <summary><strong>Week3</strong></summary>

  *( Week 3 projects and notes here)*
</details>

