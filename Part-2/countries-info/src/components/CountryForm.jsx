import React from "react";

const CountryForm = ({ handleSubmit, country, setCountry }) => {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="country">Search for a country: </label>
      <input
        id="country"
        value={country}
        onChange={(event) => setCountry(event.target.value)}
        type="text"
        autoFocus
        placeholder="Search for a country..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default CountryForm;
