'use client';
import { useState, useEffect } from 'react';

export const WeatherWidget = ({ location }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?${location}&appid=${apiKey}&units=imperial`);
                if (!response.ok) {
                    throw new Error('Failed to fetch weather data');
                }
                const data = await response.json();
                setWeatherData(data);
            } catch (err) {
                console.log(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, [location, apiKey]);

    // Helper function to get weather condition based on OpenWeatherMap code
    const getWeatherCondition = (mainCondition) => {
        const conditionMap = {
            Clear: "sunny",
            Clouds: "cloudy",
            Rain: "rainy",
            Drizzle: "rainy",
            Thunderstorm: "stormy",
            Snow: "snowy",
            Mist: "cloudy",
            Smoke: "cloudy",
            Haze: "cloudy",
            Dust: "cloudy",
            Fog: "cloudy",
            Sand: "cloudy",
            Ash: "cloudy",
            Squall: "stormy",
            Tornado: "stormy"
        };
        return conditionMap[mainCondition] || "cloudy";
    };

    // Helper function to get weather icon
    const getWeatherIcon = (condition) => {
        switch (condition.toLowerCase()) {
            case "sunny":
                return <i className="fas fa-sun text-amber-500 text-6xl"></i>;
            case "cloudy":
                return <i className="fas fa-cloud text-gray-500 text-2xl"></i>;
            case "rainy":
                return <i className="fas fa-cloud-rain text-blue-500 text-2xl"></i>;
            case "stormy":
                return <i className="fas fa-bolt text-purple-500 text-2xl"></i>;
            case "snowy":
                return <i className="fas fa-snowflake text-blue-300 text-2xl"></i>;
            default:
                return <i className="fas fa-wind text-gray-400 text-2xl"></i>;
        }
    };

    // Helper function to format city name from location parameter
    const formatCityName = () => {
        if (!location) return "Unknown Location";
        try {
            // Extract city name from lat/lon if possible
            if (location.includes('lat=')) {
                return "Current Location";
            }
            // If it's a city name query
            if (location.includes('q=')) {
                return location.split('q=')[1].split('&')[0];
            }
            return location;
        } catch (e) {
            return "Weather";
        }
    };

    if (loading) return (
        <div className="card w-full bg-base-100 shadow-xl animate-pulse">
            <div className="card-body p-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-4 flex items-center justify-center">
                    <i className="fas fa-spinner fa-spin text-blue-500 text-2xl"></i>
                    <span className="ml-2 text-sm">Fetching weather data...</span>
                </div>
            </div>
        </div>
    );

    if (error) return (
        <div className="card w-full bg-base-100 shadow-xl border-l-4 border-error">
            <div className="card-body p-6">
                <h2 className="card-title text-error flex items-center">
                    <i className="fas fa-exclamation-circle mr-2"></i>
                    Weather Unavailable
                </h2>
                <p>{error}</p>
            </div>
        </div>
    );

    if (!weatherData) return null;

    // Extract weather data
    const cityName = weatherData.name || formatCityName();
    const mainCondition = weatherData.weather[0].main;
    const condition = getWeatherCondition(mainCondition);
    const description = weatherData.weather[0].description;
    const temp = Math.round(weatherData.main.temp);
    const feelsLike = Math.round(weatherData.main.feels_like);
    const high = Math.round(weatherData.main.temp_max);
    const low = Math.round(weatherData.main.temp_min);
    const humidity = weatherData.main.humidity;
    const windSpeed = Math.round(weatherData.wind.speed);
    const precipitation = weatherData.rain
        ? `${Math.round(weatherData.rain["1h"] || 0)}mm`
        : "0%";

    return (
        <div className="card w-full bg-gradient-to-br from-blue-500 to-indigo-700 shadow-xl text-white overflow-hidden">
            <div className="card-body p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="card-title text-2xl font-bold mb-1">{cityName}</h2>
                        <p className="text-lg font-medium capitalize">{description}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-4xl font-bold">{temp}°F</p>
                        <p className="text-sm">Feels like {feelsLike}°F</p>
                    </div>
                </div>

                <div className="divider my-2 opacity-30"></div>

                <div className="flex justify-between items-center">
                    <div className="flex flex-col items-center">
                        {getWeatherIcon(condition)}
                        <span className="text-sm mt-1 capitalize">{condition}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <div className="flex items-center">
                            <i className="fas fa-temperature-high mr-2"></i>
                            <span>High: {high}°F</span>
                        </div>
                        <div className="flex items-center">
                            <i className="fas fa-temperature-low mr-2"></i>
                            <span>Low: {low}°F</span>
                        </div>
                        <div className="flex items-center">
                            <i className="fas fa-tint mr-2"></i>
                            <span>Humidity: {humidity}%</span>
                        </div>
                        <div className="flex items-center">
                            <i className="fas fa-wind mr-2"></i>
                            <span>Wind: {windSpeed} mph</span>
                        </div>
                        <div className="flex items-center col-span-2">
                            <i className="fas fa-cloud-rain mr-2"></i>
                            <span>Precipitation: {precipitation}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};