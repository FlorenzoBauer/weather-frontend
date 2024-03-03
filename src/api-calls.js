
export const weatherAPI = async (location) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}=${location}&apikey=${process.env.REACT_APP_API_KEY2}`);
    if (response.status === 429) {
      throw new Error('Too Many Requests. Please try again later.');
    }
    const data = await response.json();
    const firstMinutely = data?.timelines?.minutely?.[0];
    const simplifiedData = {
      name: data?.location.name,
      timelines: {
        minutely: firstMinutely
          ? [
              {
                time: firstMinutely.time,
                values: {
                  weatherCode: firstMinutely.values.weatherCode,
                  humidity: firstMinutely.values.humidity,
                  temperature: firstMinutely.values.temperature,
                  uvIndex: firstMinutely.values.uvIndex,
                  windSpeed: firstMinutely.values.windSpeed,
                },
              },
            ]
          : [],
      },
    };

    return simplifiedData;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
  