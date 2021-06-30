import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import currencyFormat from '../../utils/format'
import { fetchSearchProducts } from '../../api/search'
import Loader from '../Loader/Loader'
import './ProductList.scss'
import Pagination from '../Pagination/Pagination'
import ErrorMessage from '../ErrorMessage/ErrorMessage'

const ProductList = (props) => {
  const { searchText } = props
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [productResult, setProductResult] = useState(undefined)
  const [error, setError] = useState(undefined)

  useEffect(() => {
    let didCancel = false
    const searchProducts = async (text) => {
      setError(undefined)
      setLoading(true)
      fetchSearchProducts(text, page)
        .then((result) => {
          if (!didCancel) {
            setProductResult(result)
          }
        })
        .catch((errorResult) => {
          if (!didCancel) {
            setError(errorResult)
          }
        })
        .finally(() => {
          setLoading(false)
        })
    }
    if (searchText !== '') {
      searchProducts(searchText)
    }
    return () => (didCancel = true)
  }, [searchText, page])

  const renderDiscount = (product) => {
    return product.discountPercent ? (
      <span className='badge rounded-pill bg-danger ms-1'>
        {product.discountPercent}
        {'%'}
      </span>
    ) : (
      <></>
    )
  }
  const renderBasePrice = (product) => {
    return product.basePrice ? (
      <p className='walmart-reference-price'>
        {currencyFormat(product.basePrice)}
      </p>
    ) : (
      <></>
    )
  }

  return (
    <Fragment>
      <Loader isLoading={loading} />
      {error ? (
        <ErrorMessage error={error} />
      ) : (
        <div role='region' aria-label='product list'>
          {searchText && productResult ? (
            <Fragment>
              <h4>Resultados para {searchText}</h4>
              <div
                className='row row-cols-1 row-cols-md-3 g-4 product-list'
                role='list'
                aria-label='Product list'
              >
                {productResult?.products.map((product) => (
                  <div key={product.id} className='col' role='listitem'>
                    <div className='card h-100'>
                      <img
                        src={`//${product.image}`}
                        className='card-img-top'
                        alt={product.description}
                      />
                      <div className='card-body'>
                        <div className='product-info'>
                          <div className='d-flex text-left product-description'>
                            <span className='product-brand'>
                              {product.brand}
                            </span>
                            <span className='product-description'>
                              {product.description}
                            </span>
                          </div>
                          <div className='mb-12'>
                            <div className='walmart-sales-price d-flex'>
                              {currencyFormat(product.price)}
                              {renderDiscount(product)}
                            </div>
                            {renderBasePrice(product)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Pagination
                page={productResult.page}
                totalPages={productResult.totalPages}
                onSearchPage={setPage}
              />
            </Fragment>
          ) : (
            <></>
          )}
        </div>
      )}
    </Fragment>
  )
}

ProductList.propTypes = {
  searchText: PropTypes.string.isRequired,
}

export default ProductList
