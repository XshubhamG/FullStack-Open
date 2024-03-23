const DisplayInfo = ({ country, weatherDetail }) => {
  const name = country?.name?.common;
  const capital = (country?.capital && country?.capital[0]) || "N/A";
  const population = country?.population;
  const languages = Object.values(country?.languages);

  const temp = weatherDetail?.main?.temp;
  const description = weatherDetail?.weather?.[0]?.description;
  const icon = weatherDetail?.weather?.[0]?.icon;
  const wind = weatherDetail?.wind?.speed;

  return (
    <section>
      <h1>{name}</h1>
      <p>Capital: {capital}</p>
      <p>Population: {population}</p>
      <p>Languages: {languages.join(", ")}</p>
      <img
        src={country.flags.png}
        alt={name}
        style={{ width: "300px", border: "2px solid black" }}
      />

      <h2>Weather in {capital}</h2>

      <p>
        {" "}
        <span style={{ fontWeight: "bold" }}>Temperature: </span>
        {(temp - 273.15).toFixed(2)} °C
      </p>
      <p>
        <span style={{ fontWeight: "bold" }}>Weather: </span>
        {description}
      </p>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
      />
      <p>Wind: {wind} m/s</p>
    </section>
  );
};

export default DisplayInfo;
