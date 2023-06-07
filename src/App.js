import React, { useState, useEffect } from 'react';
import Loader from './Loader';

const App = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        console.log(data); // Print the response to the console
        if (Array.isArray(data.products)) {
          setProducts(data.products);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="app">
      <h1 className="heading">Product List</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <ul className="product-grid">
          {products.map((product) => (
            <li key={product.id} className="product-item">
              <h3 className="product-title">{product.title}</h3>
              <p className="product-description">{product.description}</p>
              <p className="product-price">Price: ${product.price}</p>
              <p className="product-discount">Discount: {product.discountPercentage}%</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
