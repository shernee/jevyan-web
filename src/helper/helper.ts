import {
  itemShape, bannerShape, cartShape, deliveryShape, orderSummaryShape,
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

const deliveryFromStorage = (): deliveryShape => {
  const stringDelivery: string | null = localStorage.getItem('delivery')
  let localDelivery: deliveryShape = {
    day: '',
    time: '',
  }
  if (stringDelivery) localDelivery = JSON.parse(stringDelivery)
  return localDelivery
}

const deliveryToStorage = (delivery: deliveryShape) => {
  const stringDelivery = JSON.stringify(delivery)
  localStorage.setItem('delivery', stringDelivery)
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

export {
  itemFromStorage, itemToStorage,
  bannerFromStorage, bannerToStorage,
  cartFromStorage, cartToStorage,
  deliveryFromStorage, deliveryToStorage,
  orderFromStorage, orderToStorage,
}
