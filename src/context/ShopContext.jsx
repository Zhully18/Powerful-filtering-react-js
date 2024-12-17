import { createContext, useState } from "react";
import { product } from '../assets/assets'

export const ShopContext = createContext()

const ShopContextProvider =({children}) => {

    const [products, setProducts ] = useState(product)

    const [searchTerm, setSearchTerm] = useState('')

    const updateSearchTerm = (term) => {
        setSearchTerm(term)
    }

    const value = {
        products, searchTerm, updateSearchTerm
    }


    return (
        <ShopContext.Provider value={value} >
            {children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider;