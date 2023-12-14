import React, { useState, useEffect } from "react";

const UpdateProducts = ({ product, setShowUpdate, updateProductData }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setDesc(product.description);
    }
  }, [product]);

  const handleSubmit = () => {
    const updatedProduct = { name, price, description: desc };
    updateProductData(product.id, updatedProduct);
    clearData();
    setShowUpdate(false);
  };

  const clearData = () => {
    setName("");
    setPrice("");
    setDesc("");
  };

  return (
    <div className="update-overlay">
    <div className= "update-container container">
      <h5 className="modal-title mb-4">Update Product</h5>
      <form>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Product Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary w-100 mt-3"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
    </div>
  );
};

export default UpdateProducts;
