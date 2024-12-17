// Import necessary functions and data from React and local assets
import { createContext, useState } from "react";
import { product } from '../assets/assets'

// Create a new context named ShopContext
export const ShopContext = createContext()

// Define the ShopContextProvider component that will wrap child components
const ShopContextProvider = ({ children }) => {

    // Initialize the products state with data imported from assets
    const [products, setProducts] = useState(product)

    // Initialize the searchTerm state to manage the search input
    const [searchTerm, setSearchTerm] = useState('')

    // Function to update the searchTerm state
    const updateSearchTerm = (term) => {
        setSearchTerm(term)
    }

    // Define the value object containing state and updater function
    const value = {
        products,        // Current list of products
        searchTerm,     // Current search term
        updateSearchTerm // Function to update the search term
    }

    // Return the context provider wrapping the child components
    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}

// Export the ShopContextProvider component as the default export
export default ShopContextProvider;
