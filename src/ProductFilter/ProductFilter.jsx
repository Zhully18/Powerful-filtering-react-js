import React, {useState, useEffect, useContext} from 'react'
import { ShopContext } from '../context/ShopContext';

import './ProductFilter.css'

const ProductFilter = () => {

    const {products, searchTerm } = useContext(ShopContext);
    const [displayFilter, setDisplayFilter] = useState(false);
    const [filteredProduct, setFilteredProduct] =useState([]);
    const [category, setCategory] = useState([]);
    const [sizeCategory, setSizeCategory] = useState([]);
    const [material, setMaterialCategory] = useState([]);
    const [sortType, setSortType] = useState('relevant');
    // const [searchTerm, setSearchTerm] = useState('')
    

  // Function to toggle the selected categories in the filter
  const toggleCategory = (e) => {
    // Check if the clicked category is already selected
    if (category.includes(e.target.value)) {
      // If the category is selected, remove it from the selected categories array
      setCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      // If the category is not selected, add it to the selected categories array
      setCategory(prev => [...prev, e.target.value]);
    }
  };
  
  // Function to toggle the selected sizecategories in the filter
  const togglesizeCategory = (e) => {
    // Check if the clicked sizecategory is already selected
    if (sizeCategory.includes(e.target.value)) {
      // If the sizecategory is selected, remove it from the selected sizecategories array
      setSizeCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      // If the sizecategory is not selected, add it to the selected sizecategories array
      setSizeCategory(prev => [...prev, e.target.value]);
    }
  };

   // Function to toggle the selected sizecategories in the filter
   const toggleMaterialCategory = (e) => {
    // Check if the clicked sizecategory is already selected
    if (material.includes(e.target.value)) {
      // If the sizecategory is selected, remove it from the selected material array
      setMaterialCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      // If the Materialcategory is not selected, add it to the selected Materialcategories array
      setMaterialCategory(prev => [...prev, e.target.value]);
    }
  };
  
  // Function to apply filters on the product list based on category, sizecategory, and search criteria
  const filterResults = () => {
    // Create a copy of the original products array to avoid mutating the original data
    let duplicateProduct = products.slice();
  
    // If search is enabled (showSearch is true) and there's a search term
    if (searchTerm) {
      // Filter products by checking if the product name includes the search term (case-insensitive)
      duplicateProduct = duplicateProduct.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  
    // If there are selected categories, filter products to include only those categories
    if (category.length > 0) {
      duplicateProduct = duplicateProduct.filter(item => category.includes(item.category));
    }
  
    // If there are selected sizecategories, filter products to include only those sizecategories
    if (sizeCategory.length > 0) {
      duplicateProduct = duplicateProduct.filter(item => sizeCategory.includes(item.sizeCategory));
    }

    // If there are selected sizecategories, filter products to include only those sizecategories
    if (material.length > 0) {
      duplicateProduct = duplicateProduct.filter(item => material.includes(item.material));
    }
  
    // Update the filtered product list state with the filtered products
    setFilteredProduct(duplicateProduct);
  };
  
  // Function to sort the filtered product list based on the selected sorting type
  const sortProduct = () => {
    // Create a copy of the filtered products to avoid mutating the state directly
    let fpCopy = filteredProduct.slice();
  
    // Sort products based on the sorting type
    switch (sortType) {
      case 'low-high':
        // Sort by price in ascending order
        setFilteredProduct(fpCopy.sort((a, b) => a.price - b.price));
        break;
  
      case 'high-low':
        // Sort by price in descending order
        setFilteredProduct(fpCopy.sort((a, b) => b.price - a.price));
        break;
  
      default:
        // If no sort type is selected, reapply the filters
        filterResults();
        break;
    }
  };
  
  // useEffect to reapply filters whenever any of the dependencies (category, sizeCategory, search, etc.) change
  useEffect(() => {
    filterResults();
  }, [category, sizeCategory,material, searchTerm, products]);
  
  // useEffect to sort the filtered products whenever the sorting type changes
  useEffect(() => {
    sortProduct();
  }, [sortType]);
  
  return (
    <>
    <div className="filter-and-products-container">
      {/* Filter Option */}
      <div className="filter-container">
        <p 
          onClick={() => setDisplayFilter(!displayFilter)} 
          className="filter-title"
        >
          FILTERS
        </p>
        {/* Category Filter */}
        <div className={`filter-section ${displayFilter ? '' : 'hidden'}`}>
        <p className="filter-sizetitle">GENDER</p>
          <p className="filter-item">
            <input type="checkbox" onChange={toggleCategory} value="Men" /> Men
          </p>
          <p className="filter-item">
            <input type="checkbox" onChange={toggleCategory} value="Women" /> Women
          </p>
          <p className="filter-item">
            <input type="checkbox" onChange={toggleCategory} value="Kids" /> Kids
          </p>
        </div>
        {/* sizecategory Filter */}
        <div className={`filter-section ${displayFilter ? '' : 'hidden'}`}>
          <p className="filter-sizetitle">CLOTHING SIZE</p>
          <div className="filter-sizecategory">
            <p className="filter-item">
              <input type="checkbox" onChange={togglesizeCategory} value="Juniors" /> Juniors
            </p>
            <p className="filter-item">
              <input type="checkbox" onChange={togglesizeCategory} value="Petite" /> Petite
            </p>
            <p className="filter-item">
              <input type="checkbox" onChange={togglesizeCategory} value="Plussize" /> Plus Size
            </p>
          </div>
        </div>
        {/* Material filter */}
        <div className={`filter-section ${displayFilter ? '' : 'hidden'}`}>
          <p className="filter-sizetitle">MATERIAL</p>
          <div className="filter-sizecategory">
            <p className="filter-item">
              <input type="checkbox" onChange={toggleMaterialCategory} value="Cotton" /> Cotton
            </p>
            <p className="filter-item">
              <input type="checkbox" onChange={toggleMaterialCategory} value="Leather" /> Leather
            </p>
            <p className="filter-item">
              <input type="checkbox" onChange={toggleMaterialCategory} value="Silk" /> Silk
            </p>
            <p className="filter-item">
              <input type="checkbox" onChange={toggleMaterialCategory} value="Suede" /> Suede
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="products-container">
        <div className="products-header">
          <h2>All Collection</h2>
          <select 
            onChange={(e) => setSortType(e.target.value)} 
            className="sort-dropdown"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        {/* Map Products */}
        <div className="product-grid">
          {filteredProduct.map((product) => (
            <div className="product-card" key={product._id}>
              <div className="product-image">
                <img src={product.image[0]} alt={product.name} />
              </div>
              <h3>{product.name}</h3>
              <p>${product.price}</p>
            </div>
          ))}
        </div>
          </div>
          </div>
    </>
  )
}

export default ProductFilter