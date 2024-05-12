import React from 'react';

function ProductForm({
  modalOpen,
  setModalOpen,
  modalMode,
  setModalMode,
  productName,
  setProductName,
  productPrice,
  setProductPrice,
  productCategory,
  setProductCategory,
  productCount,
  setProductCount,
  productId,
  setProductId,
  productPublished,
  setProductPublished,
  productImage,
  setProductImage,
  productCategoryId,
  setProductCategoryId,
  productCategories,
  addProduct,
  editProduct,
  closeModal,
  handleSubmit,
}) {
  return (
    modalOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          {/* Form goes here */}
        </div>
      </div>
    )
  );
}

export default ProductForm;
