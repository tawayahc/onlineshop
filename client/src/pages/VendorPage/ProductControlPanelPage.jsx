//http://localhost:5173/vendor/products
import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import productsData from '../../db/products.js';
//If use data base
// import productsData from '../../db/products.json';

function ProductControlPanelPage() {
  //If use data base
  // const [products, setProducts] = useState(productsData.products);

  const [products, setProducts] = useState(productsData);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productCategory, setProductCategory] = useState('');
  const [productCount, setProductCount] = useState(0);
  const [productId, setProductId] = useState(null);
  const [productPublished, setProductPublished] = useState(false);
  const [productImage, setProductImage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');

  const generateId = () => {
    return Math.floor(Math.random() * 10000);
  };

  const addProduct = (name, price, category, count, published, image) => {
    const inStock = count > 0;
    const newProduct = {
      id: generateId(),
      name: name,
      price: price,
      category: category,
      count: count,
      inStock: inStock,
      published: published,
      image: image,
    };
    setProducts([...products, newProduct]);
  };

  const deleteSelectedProducts = () => {
    const updatedProducts = products.filter(product => !selectedProducts.includes(product.id));
    setProducts(updatedProducts);
    setSelectedProducts([]);
  };

  const toggleProductSelection = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const toggleProductPublishing = (productId) => {
    setProducts(products.map(product => {
      if (product.id === productId) {
        return { ...product, published: !product.published };
      }
      return product;
    }));
  };

  const editProduct = (productId, newName, newPrice, newCategory, newCount, newImage) => {
    const inStock = newCount > 0;
    setProducts(products.map(product => {
      if (product.id === productId) {
        return { ...product, name: newName, price: newPrice, category: newCategory, count: newCount, inStock: inStock, image: newImage };
      }
      return product;
    }));
  };

  const openAddModal = () => {
    setModalMode('add');
    setModalOpen(true);
    setProductName('');
    setProductPrice(0);
    setProductCategory('');
    setProductCount(0);
    setProductPublished(false);
    setProductImage('');
  };

  const openEditModal = (productId, productName, productPrice, productCategory, productCount, productPublished, productImage) => {
    setModalMode('edit');
    setModalOpen(true);
    setProductName(productName);
    setProductPrice(productPrice);
    setProductCategory(productCategory);
    setProductCount(productCount);
    setProductId(productId);
    setProductPublished(productPublished);
    setProductImage(productImage);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = () => {
    if (modalMode === 'add') {
      addProduct(productName, productPrice, productCategory, productCount, productPublished, productImage);
    } else if (modalMode === 'edit') {
      editProduct(productId, productName, productPrice, productCategory, productCount, productImage);
    }
    closeModal();
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSortBy('default');
  };

  const filteredProducts = products.filter(product => {
    if (selectedCategory !== 'All' && product.category !== selectedCategory) {
      return false;
    }
    return product.name.toLowerCase().includes(searchTerm.toLowerCase());
  }).sort((a, b) => {
    if (sortBy === 'ascending') {
      return a.price - b.price;
    } else if (sortBy === 'descending') {
      return b.price - a.price;
    }
    return 0;
  });

  const categories = ['All', ...new Set(products.map(product => product.category))];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product Control Panel</h1>

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Add Product</h2>
        <button onClick={openAddModal} className="btn btn-primary">Add Product</button>
      </div>

      <div className="mb-8">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="input mb-2"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="input mr-2"
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="input mr-2"
        >
          <option value="default">Sort By</option>
          <option value="ascending">Price: Low to High</option>
          <option value="descending">Price: High to Low</option>
        </select>
        <button onClick={resetFilters} className="btn btn-secondary">Reset Filters</button>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Product List</h2>
        <div className="flex items-center mb-2">
          <button onClick={deleteSelectedProducts} className="btn btn-danger mr-2">Delete Selected</button>
        </div>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2"></th>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Product Name</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Count</th>
              <th className="border px-4 py-2">Stock</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Published</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => toggleProductSelection(product.id)}
                  />
                </td>
                <td className="border px-4 py-2">
                  <img src={product.image} alt={product.name} className="w-12 h-12" />
                </td>
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">{product.category}</td>
                <td className="border px-4 py-2">{product.price}$</td>
                <td className="border px-4 py-2">{product.count}</td>
                <td className="border px-4 py-2">{product.inStock ? 'In Stock' : 'Out of Stock'}</td>
                <td className="border px-4 py-2">
                  <span className={`badge ${product.inStock ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500'}`}>
                    {product.inStock ? 'Selling' : 'Sold Out'}
                  </span>
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="checkbox"
                    className="toggle toggle-success"
                    checked={product.published}
                    onChange={() => toggleProductPublishing(product.id)}
                  />
                </td>
                <td className="border px-4 py-2">
                  <button onClick={() => openEditModal(product.id, product.name, product.price, product.category, product.count, product.published, product.image)} className="btn btn-primary">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-2">{modalMode === 'add' ? 'Add Product' : 'Edit Product'}</h2>
            <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} className="input mb-2" placeholder="Product Name" />
            <input type="number" value={productPrice} onChange={(e) => setProductPrice(parseFloat(e.target.value))} className="input mb-2" placeholder="Product Price" />
            <input type="text" value={productCategory} onChange={(e) => setProductCategory(e.target.value)} className="input mb-2" placeholder="Product Category" />
            <input type="number" value={productCount} onChange={(e) => setProductCount(parseInt(e.target.value))} className="input mb-2" placeholder="Product Count" />
            <input type="url" value={productImage} onChange={(e) => setProductImage(e.target.value)} className="input mb-2" placeholder="Image URL" />
            <div className="flex items-center mb-4">
              <label className="mr-2">Published:</label>
              <input
                type="checkbox"
                className="toggle toggle-success"
                checked={productPublished}
                onChange={() => setProductPublished(!productPublished)}
              />
            </div>
            <div className="flex justify-end">
              <button onClick={closeModal} className="btn btn-secondary mr-2">Cancel</button>
              <button onClick={handleSubmit} className="btn btn-primary">{modalMode === 'add' ? 'Add' : 'Save'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default () => (
  <Layout>
    <ProductControlPanelPage />
  </Layout>
);
