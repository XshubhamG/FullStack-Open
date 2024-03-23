import axios from "axios"

const baseURL = "https://studies.cs.helsinki.fi/restcountries/api"

//* fetchAllCountries
const fetchAllCountries = async () => {
    try {
        const response = await axios.get(`${baseURL}/all`);
        return response.data;
    } catch (error) {
        console.error('Error in fetchAllCountries:', error);
        throw error;
    }
}

//* countryNameArr
const countryNameArr = await fetchAllCountries().then((countries) =>
    countries.map((country) => country.name.common)
)

//* fetchCountryDetail
const fetchCountryDetail = async (countryName) => {
    const response = await axios.get(`${baseURL}/name/${countryName}`);
    return response.data;
}


export { countryNameArr, fetchCountryDetail }