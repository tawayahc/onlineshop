import React, { useState, useEffect } from 'react';
import Layout from '../../../components/Layout/Layout.jsx';
import ImageInput from './ProductImageDisplayModal.jsx';

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

  const ImageModal = ({ images, onClose }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
    const handleNext = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
  
    const handlePrev = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50" onClick={onClose}>
        <div className="bg-white p-4 rounded-lg shadow-lg max-w-screen-md w-full h-screen/2" onClick={(e) => e.stopPropagation()}>
          <img src={images[currentImageIndex].Productimagecode} alt="Selected Image" className="w-full h-full object-contain" />
          <div className="flex justify-between mt-4">
            <button onClick={handlePrev} className="btn btn-secondary">&lt; Prev</button>
            <button onClick={handleNext} className="btn btn-secondary">Next &gt;</button>
          </div>
          <button onClick={onClose} className="absolute top-0 right-0 m-4 bg-gray-300 p-2 rounded-full hover:bg-gray-400">&times;</button>
        </div>
      </div>
    );
  };
  
  useEffect(() => {
    fetch('http://localhost:3333/see')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3333/category-see')
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
      const response = await fetch('http://localhost:3333/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });
      if (!response.ok) {
        throw new Error('Failed to add product');
      }
      
    } catch (error) {
      console.error(error);
    }
    setProducts([...products, newProduct]);
  };

  const deleteSelectedProducts = async () => {
    try {
      const response = await fetch('http://localhost:3333/delete', {
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
      const response = await fetch('http://localhost:3333/update', {
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
        return { ...product, ProductName: newName, Price: newPrice, QuantityAvailable: newCount, image: newImage, ProductCategoryName: newCategoryName, ProductCategoryID: newCategoryId};
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
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-2">{modalMode === 'add' ? 'Add Product' : 'Edit Product'}</h2>
            <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} className="input mb-2" placeholder="Product Name" />
            <input type="number" value={productPrice} onChange={(e) => setProductPrice(parseFloat(e.target.value))} className="input mb-2" placeholder="Product Price" />
            <select
              value={productCategoryId}
              onChange={(e) => {
                setProductCategoryId(parseInt(e.target.value));
                const selectedCategory = productCategories.find(category => category.ProductCategoryID === parseInt(e.target.value));
                setProductCategory(selectedCategory ? selectedCategory.ProductCategoryName : '');
              }}
              className="input mb-2"
            >
              <option value={0}>Select Category</option>
              {productCategories.map(category => (
                <option key={category.ProductCategoryID} value={category.ProductCategoryID}>
                  {category.ProductCategoryName}
                </option>
              ))}
            </select>

            <input type="number" value={productCount} onChange={(e) => setProductCount(parseInt(e.target.value))} className="input mb-2" placeholder="Product Count" />
            <input type="url" value={productImage} onChange={(e) => setProductImage(e.target.value)} className="input mb-2" placeholder="Image URL" />
            {/* <ImageInput/> */}
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