import {
  itemShape, bannerShape, cartShape, tableShape, orderSummaryShape, customerShape,
} from '../data/type'

const itemFromStorage = (): Array<itemShape> => {
  const stringItems: string | null = localStorage.getItem('items')
  let localItems: Array<itemShape> = []
  if (stringItems) localItems = JSON.parse(stringItems)
  return localItems
}

const itemToStorage = (items: Array<itemShape>) => {
  const stringItems = JSON.stringify(items)
  localStorage.setItem('items', stringItems)
}

const bannerFromStorage = (): bannerShape => {
  const stringBanner: string | null = localStorage.getItem('banner')
  let localBanner: bannerShape = {
    name: '',
    phone: 0,
    street: '',
    city: '',
    state: '',
    postal: '',
    currency: '',
  }
  if (stringBanner) localBanner = JSON.parse(stringBanner)
  return localBanner
}

const bannerToStorage = (banner: bannerShape) => {
  const stringBanner = JSON.stringify(banner)
  localStorage.setItem('banner', stringBanner)
}

const cartFromStorage = (): Array<cartShape> => {
  const stringCart: string | null = localStorage.getItem('cart')
  let localCart: Array<cartShape> = []
  if (stringCart) localCart = JSON.parse(stringCart)
  return localCart
}

const cartToStorage = (cart: Array<cartShape>) => {
  const stringCart = JSON.stringify(cart)
  localStorage.setItem('cart', stringCart)
}

const tableFromStorage = (): tableShape => {
  const stringTable: string | null = localStorage.getItem('table')
  let localTable: tableShape = {
    tableNo: '',
  }
  if (stringTable) localTable = JSON.parse(stringTable)
  return localTable
}

const tableToStorage = (table: tableShape) => {
  const stringTable = JSON.stringify(table)
  localStorage.setItem('table', stringTable)
}

const orderFromStorage = (): orderSummaryShape => {
  const stringOrder: string | null = localStorage.getItem('order')
  let localOrder: orderSummaryShape = {
    due: '',
    id: '',
    instructions: '',
    is_pickup: false,
    items: [],
    store: '',
  }
  if (stringOrder) localOrder = JSON.parse(stringOrder)
  return localOrder
}

const orderToStorage = (orderSummary: orderSummaryShape) => {
  const stringOrder = JSON.stringify(orderSummary)
  localStorage.setItem('order', stringOrder)
}

const customerFromStorage = (): customerShape => {
  const stringCustomer: string | null = localStorage.getItem('jevyanCustomer')
  let localCustomer: customerShape = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    landmark: '',
    neighborhood: '',
    city: '',
    postal: '',
  }
  if (stringCustomer) localCustomer = JSON.parse(stringCustomer)
  return localCustomer
}

const customerToStorage = (customer: customerShape) => {
  const stringCustomer = JSON.stringify(customer)
  localStorage.setItem('jevyanCustomer', stringCustomer)
}

export {
  itemFromStorage, itemToStorage,
  bannerFromStorage, bannerToStorage,
  cartFromStorage, cartToStorage,
  tableFromStorage, tableToStorage,
  orderFromStorage, orderToStorage,
  customerFromStorage, customerToStorage,
}
