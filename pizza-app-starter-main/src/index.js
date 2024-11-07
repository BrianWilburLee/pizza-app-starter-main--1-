import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { pizzaData } from './data'; 
import './index.css';

function Header({ isOpen }) {
  return (
    <header className="header">
      <h1>Andy's Pizza Co.</h1>
      {isOpen && <p className="tagline">Authentic Italian Cuisine</p>}
    </header>
  );
}

function Pizza({ name, ingredients, photoName, price, soldOut }) {
  return (
    <div className={`pizza ${soldOut ? "sold-out" : ""}`}>
      <img src={photoName} alt={`${name}`} />
      <div>
        <h3>{name}</h3>
        <p>{ingredients}</p>
        <span>{soldOut ? "Sold Out" : `$${price}`}</span>
      </div>
    </div>
  );
}

function Menu({ searchQuery }) {
  const filteredPizzas = pizzaData.filter(pizza =>
    pizza.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="menu">
      <h2>Our Menu</h2>
      <div className="pizzas">
        {filteredPizzas.length > 0 ? (
          filteredPizzas.map((pizza, index) => (
            <Pizza
              key={index}
              name={pizza.name}
              ingredients={pizza.ingredients}
              photoName={pizza.photoName}
              price={pizza.price}
              soldOut={pizza.soldOut}
            />
          ))
        ) : (
          <p>No pizzas found</p>
        )}
      </div>
    </main>
  );
}

function Order() {
  return (
    <div className="order">
      <p>We're currently open</p>
      <button className="btn">Order Now</button>
    </div>
  );
}

function Footer({ isOpen }) {
  return (
    <footer className="footer">
      {isOpen ? <Order /> : <p>Sorry, we're closed</p>}
    </footer>
  );
}

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Check if the shop is open
  const date = new Date();
  const isOpen = date.getHours() >= 10 && date.getHours() < 22;

  return (
    <div className="container">
      <Header isOpen={isOpen} />
      <input
        type="text"
        placeholder="Search for a pizza..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />
      <Menu searchQuery={searchQuery} />
      <Footer isOpen={isOpen} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
