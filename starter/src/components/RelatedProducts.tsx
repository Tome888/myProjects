import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";

interface Product {
  id: string;
  title: string;
  price: string;
  img: string;
}

const RelatedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const randomNo = Math.floor(Math.random() * 15);

    fetch(`http://localhost:5001/products?_start=${randomNo}&_limit=4`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="sec-relate-product bg0 p-t-45 p-b-105">
      <div className="container">
        <div className="p-b-45">
          <h3 className="ltext-106 cl5 txt-center">Related Products</h3>
        </div>

        <div className="wrap-slick2">
          <div className="d-flex">
            {products.map((product) => (
              <ProductItem
                key={product.id}
                imgSrc={product.img}
                titleCard={product.title}
                priceCard={product.price}
                itemId={product.id}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
