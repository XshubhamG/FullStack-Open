import { useEffect, useState } from "react";
import CountryForm from "./components/CountryForm";
import { countryNameArr, fetchCountryDetail } from "./services/countries";
import { titleCase } from "./utils/helper";
import DisplayInfo from "./components/DisplayInfo";
import { fetchWeather } from "./services/weather";

const App = () => {
  const [country, setCountry] = useState("");
  const [countryDetail, setCountryDetail] = useState(null);
  const [weatherDetail, setWeatherDetail] = useState();

  //* filter countries
  const filteredCountries = countryNameArr.filter((c) =>
    c.startsWith(titleCase(country))
  );

  //* fetchWeather
  useEffect(() => {
    if (countryDetail) {
      fetchWeather(countryDetail.capital).then((data) =>
        setWeatherDetail(data)
      );
    }
  }, [countryDetail]);

  //* handleSubmit
  const handleSubmit = (event) => {
    event.preventDefault();
    if (filteredCountries.length === 1) {
      fetchCountryDetail(filteredCountries[0]).then((data) =>
        setCountryDetail(data)
      );
      setCountry("");
    }
  };

  return (
    <>
      <CountryForm
        handleSubmit={handleSubmit}
        country={country}
        setCountry={setCountry}
      />
      <div>
        {filteredCountries.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : (
          filteredCountries.map((country) => <p key={country}>{country}</p>)
        )}
      </div>
      {weatherDetail && (
        <DisplayInfo country={countryDetail} weatherDetail={weatherDetail} />
      )}
    </>
  );
};

export default App;
