import React, { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";
import InfiniteScroll from "react-infinite-scroll-component";
import AddProduct from "./Component/AddProduct";
import UpdateProducts from "./Component/UpdateProducts";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

   const uniqueId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  const loadProducts = (start, end) => {
    const newProducts = Array.from({ length: end - start }, (_, index) => ({
      id: uniqueId(), 
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      description: faker.lorem.sentence(),
    }));

    setProducts((prevProducts) => [...prevProducts, ...newProducts]);
  };

  useEffect(() => {
    loadProducts(0, 10);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const updatedStoredProducts = storedProducts.filter(
      (product) => product.id !== productId
    );
    localStorage.setItem("products", JSON.stringify(updatedStoredProducts));
  };

  const handleUpdate = (product) => {
    setSelectedProduct(product);
    setShowUpdate(true);
  };

  const updateProductData = (productId, updatedData) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, ...updatedData } : product
      )
    );

    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const updatedStoredProducts = storedProducts.map((product) =>
      product.id === productId ? { ...product, ...updatedData } : product
    );
    localStorage.setItem("products", JSON.stringify(updatedStoredProducts));
  };

  const addNewProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);

    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const updatedStoredProducts = [...storedProducts, newProduct];
    localStorage.setItem("products", JSON.stringify(updatedStoredProducts));
  };

  const fetchMoreData = () => {
    const currentLength = products.length;
    const newLength = currentLength + 10;
    loadProducts(currentLength, newLength);

    if (newLength >= 10000) {
      setHasMore(false);
    }
  };


  return (
    <InfiniteScroll
      dataLength={products.length}
      next={fetchMoreData}
      hasMore={hasMore}
    >
      <div className="container">
        <h1 className="text-center my-5">ProductList</h1>
        <AddProduct addNewProduct={addNewProduct} />

        <table className="table">
          <thead className="text-center">
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.description}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      handleUpdate(product);
                    }}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showUpdate && (
          <UpdateProducts
            product={selectedProduct}
            setShowUpdate={setShowUpdate}
            updateProductData={updateProductData}
          />
        )}
      </div>
    </InfiniteScroll>
  );
};

export default ProductList;
