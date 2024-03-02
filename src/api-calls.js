export const weatherAPI = async (location) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}=${location}&apikey=${process.env.REACT_APP_API_KEY}`);
      const data = await response.json();
      console.log('data', data)
      return data;  
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  