import React, { useState } from 'react'
import Header from './components/Header/Header'
import Search from './components/Search/Search'
import ProductList from './components/ProductList/ProductList'

function App() {
  const [searchText, setSearchText] = useState('')

  return (
    <div className='App'>
      <Header search={<Search onSearch={setSearchText} />} />
      <div className='container'>
        <ProductList searchText={searchText} />
      </div>
    </div>
  )
}

export default App
