// src/pages/ProductControlPanelPage/ProductControlPanelPage.jsx
import React, { useState, useEffect } from 'react';
import Layout from '../../../components/Layout/Layout.jsx';
import ImageModal from './ImageModal.jsx'
import AddEditModal from './AddEditModal.jsx';

function ProductControlPanelPage() {
  const [products, setProducts] = useState([]);
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

  const [productCategories, setProductCategories] = useState([]);
  const [productCategoryId, setProductCategoryId] = useState(0);

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3333/admin/see')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3333/admin/category-see')
      .then(response => response.json())
      .then(data => setProductCategories(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const addProduct = async (name, price, count, published, image, categoryName, categoryId) => {
    const newProduct = {
      ProductName: name,
      Price: price,
      QuantityAvailable: count,
      ProductCategoryID: categoryId,
      ProductCategoryName: categoryName,
      Productimagecode: image,
      ProductimageName: name,
    };

    try {
      const response = await fetch('http://localhost:3333/admin/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });
      if (!response.ok) {
        throw new Error('Failed to add product');
      }
      const result = await response.json();
      const addedProduct = result.product;

      setProducts([...products, addedProduct]);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteSelectedProducts = async () => {
    try {
      const response = await fetch('http://localhost:3333/admin/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productIDs: selectedProducts }),
      });
      if (!response.ok) {
        throw new Error('Failed to delete products');
      }
      const updatedProducts = products.filter(product => !selectedProducts.includes(product.ProductID));
      setProducts(updatedProducts);
      setSelectedProducts([]);
    } catch (error) {
      console.error(error);
    }
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
      if (product.ProductID === productId) {
        return { ...product, published: !product.published };
      }
      return product;
    }));
  };

  const editProduct = async (productId, newName, newPrice, newCount, newImage, newCategoryName, newCategoryId) => {
    const updatedProduct = {
      ProductName: newName,
      Price: newPrice,
      QuantityAvailable: newCount,
      ProductID: productId,
      ProductCategoryID: newCategoryId
    };

    try {
      const response = await fetch('http://localhost:3333/admin/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });
      if (!response.ok) {
        throw new Error('Failed to update product');
      }
    } catch (error) {
      console.error(error);
    }

    setProducts(products.map(product => {
      if (product.ProductID === productId) {
        return { ...product, ProductName: newName, Price: newPrice, QuantityAvailable: newCount, image: newImage, ProductCategoryName: newCategoryName, ProductCategoryID: newCategoryId };
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
    setProductCategoryId(0);
  };

  const openEditModal = (productId, productName, productPrice, productCategory, productCount, productPublished, productImage, productCategoryId) => {
    setModalMode('edit');
    setModalOpen(true);
    setProductName(productName);
    setProductPrice(productPrice);
    setProductCategory(productCategory);
    setProductCount(productCount);
    setProductId(productId);
    setProductPublished(productPublished);
    setProductImage(productImage);
    setProductCategoryId(productCategoryId);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = () => {
    if (modalMode === 'add') {
      addProduct(productName, productPrice, productCount, productPublished, productImage, productCategory, productCategoryId);
    } else if (modalMode === 'edit') {
      editProduct(productId, productName, productPrice, productCount, productImage, productCategory, productCategoryId);
    }
    closeModal();
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSortBy('default');
  };

  const filteredProducts = products.filter(product => {
    if (selectedCategory !== 'All' && product.ProductCategoryName !== selectedCategory) {
      return false;
    }
    return product.ProductName && product.ProductName.toLowerCase().includes(searchTerm.toLowerCase());
  }).sort((a, b) => {
    if (sortBy === 'ascending') {
      return a.Price - b.Price;
    } else if (sortBy === 'descending') {
      return b.Price - a.Price;
    }
    return 0;
  });

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
          value={productCategoryId}
          onChange={(e) => {
            const selectedValue = parseInt(e.target.value);
            if (selectedValue === 0) {
              setProductCategoryId(selectedValue);
              setSelectedCategory('All');
              setProductCategory('');
            } else {
              setProductCategoryId(selectedValue);
              const selectedCategory = productCategories.find(category => category.ProductCategoryID === selectedValue);
              setSelectedCategory(selectedCategory ? selectedCategory.ProductCategoryName : '');
            }
          }}
          className="input mb-2"
        >
          <option value={0}>All</option>
          {productCategories.map(category => (
            <option key={category.ProductCategoryID} value={category.ProductCategoryID}>
              {category.ProductCategoryName}
            </option>
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
              <tr key={product.ProductID} className="hover:bg-gray-100">
                <td className="border px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.ProductID)}
                    onChange={() => toggleProductSelection(product.ProductID)}
                  />
                </td>

                <td className="border px-4 py-2">
                  <img
                    src={product.ProductImages && product.ProductImages.length > 0 ? product.ProductImages[0].Productimagecode : ''}
                    alt={product.ProductImages && product.ProductImages.length > 0 ? product.ProductImages[0].ProductimageName : ''}
                    className="w-12 h-12 mr-2"
                    onClick={() => setSelectedImage(product.ProductImages && product.ProductImages.length > 0 ? product.ProductImages : '')}
                  />
                </td>

                {selectedImage && (
                  <ImageModal images={selectedImage} onClose={() => setSelectedImage(null)} />
                )}

                <td className="border px-4 py-2">{product.ProductName}</td>
                <td className="border px-4 py-2">{product.ProductCategoryName}</td>
                <td className="border px-4 py-2">{product.Price}$</td>
                <td className="border px-4 py-2">{product.QuantityAvailable}</td>
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
                    onChange={() => toggleProductPublishing(product.ProductID)}
                  />
                </td>
                <td className="border px-4 py-2">
                  <button onClick={() => openEditModal(product.ProductID, product.ProductName, product.Price, product.ProductCategoryName, product.QuantityAvailable, product.published, product.image, product.ProductCategoryID)} className="btn btn-primary">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <AddEditModal
          modalMode={modalMode}
          productName={productName}
          setProductName={setProductName}
          productPrice={productPrice}
          setProductPrice={setProductPrice}
          productCategoryId={productCategoryId}
          setProductCategoryId={setProductCategoryId}
          productCategories={productCategories}
          productCount={productCount}
          setProductCount={setProductCount}
          productImage={productImage}
          setProductImage={setProductImage}
          productPublished={productPublished}
          setProductPublished={setProductPublished}
          handleSubmit={handleSubmit}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}

export default () => (
  <Layout>
    <ProductControlPanelPage />
  </Layout>
);
