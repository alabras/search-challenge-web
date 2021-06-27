import React from 'react'
import Header from './components/Header/Header'
import Search from './components/Search/Search'

function App() {
  const handleOnSearch = (textSearch) => {
    console.log(textSearch)
  }
  return (
    <div className='App'>
      <Header search={<Search onSearch={handleOnSearch} />} />
    </div>
  )
}

export default App
