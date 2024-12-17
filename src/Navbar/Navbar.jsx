import React, {useContext, useState} from 'react'
import {BiUser, BiCart} from 'react-icons/bi'
import './Navbar.css'
import { ShopContext } from '../context/ShopContext'


const Navbar = () => {

    const { updateSearchTerm } = useContext(ShopContext)

    const [searchInput, setSearchInput] = useState('')
    

    const handleSearch = () => {
        updateSearchTerm(searchInput);
    }

  return (
    <div>
        <nav className="navbar">
            <div className="nav-top">
                <h2>Luma</h2>
                <div className="search-bar">
                    <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} className='search-input' placeholder='Search for products....' />
                    <button onClick={handleSearch} className="search-btn">Search</button>
                </div>
                <div className="icons">
                    <div className="profile-group">
                        <BiUser className='icon'/>
                    </div>
                    <div className="cart-icon">
                        <BiCart className='icon' />
                        <span className="cart-count">0</span>
                    </div>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar

// https://github.com/Zhully18/Powerful-filtering-react-js