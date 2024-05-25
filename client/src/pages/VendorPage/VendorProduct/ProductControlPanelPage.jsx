// src/pages/ProductControlPanelPage/ProductControlPanelPage.jsx
import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import Layout from '../../../components/Layout/Layout.jsx';
import ImageModal from './ImageModal.jsx';
import AddEditModal from './AddEditModal.jsx';
import {
  productListState,
  selectedProductIdsState,
  productModalState,
  productCategoriesState,
  searchTermState,
  selectedCategoryState,
  sortByState,
  filteredProductsState,
  selectedImageState,
} from '../../../recoil/productControlPanel.js';

function ProductControlPanelPage() {
  const [products, setProducts] = useRecoilState(productListState);
  const [selectedProducts, setSelectedProducts] = useRecoilState(selectedProductIdsState);
  const [modalState, setModalState] = useRecoilState(productModalState);
  const [productCategories, setProductCategories] = useRecoilState(productCategoriesState);
  const [searchTerm, setSearchTerm] = useRecoilState(searchTermState);
  const [selectedCategory, setSelectedCategory] = useRecoilState(selectedCategoryState);
  const [sortBy, setSortBy] = useRecoilState(sortByState);
  const filteredProducts = useRecoilValue(filteredProductsState);
  const [selectedImage, setSelectedImage] = useRecoilState(selectedImageState);
  const setModalOpen = (isOpen) => setModalState((prev) => ({ ...prev, isOpen }));

  useEffect(() => {
    fetch('http://localhost:3333/admin/see')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, [setProducts]);

  useEffect(() => {
    fetch('http://localhost:3333/admin/category-see')
      .then(response => response.json())
      .then(data => setProductCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, [setProductCategories]);

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

      setProducts((prevProducts) => [...prevProducts, addedProduct]);
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
    setSelectedProducts((prevSelected) => {
      if (prevSelected.includes(productId)) {
        return prevSelected.filter(id => id !== productId);
      } else {
        return [...prevSelected, productId];
      }
    });

    console.log(selectedProducts);
  };

  const toggleProductPublishing = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map(product => {
        if (product.ProductID === productId) {
          return { ...product, published: !product.published };
        }
        return product;
      })
    );
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

    setProducts((prevProducts) =>
      prevProducts.map(product => {
        if (product.ProductID === productId) {
          return { ...product, ProductName: newName, Price: newPrice, QuantityAvailable: newCount, image: newImage, ProductCategoryName: newCategoryName, ProductCategoryID: newCategoryId };
        }
        return product;
      })
    );
  };

  const openAddModal = () => {
    setModalState({
      isOpen: true,
      mode: 'add',
      product: {
        ProductName: '',
        Price: 0,
        ProductCategoryName: '',
        QuantityAvailable: 0,
        published: false,
        image: '',
        ProductCategoryID: 0,
      },
    });
  };

  const openEditModal = (productId, productName, productPrice, productCategory, productCount, productPublished, productImage, productCategoryId) => {
    setModalState({
      isOpen: true,
      mode: 'edit',
      product: {
        ProductID: productId,
        ProductName: productName,
        Price: productPrice,
        ProductCategoryName: productCategory,
        QuantityAvailable: productCount,
        published: productPublished,
        image: productImage,
        ProductCategoryID: productCategoryId,
      },
    });
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleSubmit = () => {
    const { product } = modalState;
    if (modalState.mode === 'add') {
      addProduct(product.ProductName, product.Price, product.QuantityAvailable, product.published, product.image, product.ProductCategoryName, product.ProductCategoryID);
    } else if (modalState.mode === 'edit') {
      editProduct(product.ProductID, product.ProductName, product.Price, product.QuantityAvailable, product.image, product.ProductCategoryName, product.ProductCategoryID);
    }
    closeModal();
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSortBy('default');
  };

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
          onChange={(e) => {
            const selectedValue = e.target.value;
            setSelectedCategory(selectedValue);
            setProductCategoryId(selectedValue === 'All' ? 0 : productCategories.find(category => category.ProductCategoryName === selectedValue)?.ProductCategoryID || 0);
          }}
          className="input mb-2"
        >
          <option value="All">All</option>
          {productCategories.map(category => (
            <option key={category.ProductCategoryID} value={category.ProductCategoryName}>
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

      {modalState.isOpen && (
        <AddEditModal
          modalMode={modalState.mode}
          product={modalState.product}
          setProductName={(name) => setModalState((prev) => ({ ...prev, product: { ...prev.product, ProductName: name } }))}
          setProductPrice={(price) => setModalState((prev) => ({ ...prev, product: { ...prev.product, Price: parseFloat(price) } }))}
          setProductCategoryId={(categoryId) => setModalState((prev) => ({ ...prev, product: { ...prev.product, ProductCategoryID: parseInt(categoryId) } }))}
          setProductCategory={(category) => setModalState((prev) => ({ ...prev, product: { ...prev.product, ProductCategoryName: category } }))}
          setProductCount={(count) => setModalState((prev) => ({ ...prev, product: { ...prev.product, QuantityAvailable: parseInt(count) } }))}
          setProductImage={(image) => setModalState((prev) => ({ ...prev, product: { ...prev.product, image } }))}
          setProductPublished={(published) => setModalState((prev) => ({ ...prev, product: { ...prev.product, published } }))}
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
