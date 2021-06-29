const currencyFormat = (number) => {
  const format = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  }).format(number)

  return format.length === 5
    ? format.substring(0, 2) + '.' + format.substring(2)
    : format
}

export default currencyFormat
