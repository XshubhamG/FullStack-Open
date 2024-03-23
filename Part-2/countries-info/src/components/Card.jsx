import React from "react";

const Card = ({ item }) => {
  return (
    <article className="card" key={item.callingCodes}>
      <div className="card-image">
        <img src={item.flag} alt={item.name} />
      </div>
      <div className="card-content">
        <h2 className="card-name">{item.name}</h2>
        <ol className="card-list">
          <li>
            population: <span>{item.population}</span>
          </li>
          <li>
            Region: <span>{item.region}</span>
          </li>
          <li>
            Capital: <span>{item.capital[0]}</span>
          </li>
        </ol>
      </div>
    </article>
  );
};

export default Card;
