/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import axios from 'axios'
import moment from 'moment'
import { RouteComponentProps, Link } from '@reach/router'
import { NativeSelect } from '@material-ui/core'
import DeliveryPickModal from '../../components/menu/delivery-modal'
import Banner from '../../components/menu/banner'
import CategoryHeader from '../../components/menu/category-header'
import MenuCard from '../../components/menu/menu-card'
import ViewCartButton from '../../components/menu/view-cart-button'
import { cartShape, bannerShape, deliveryShape } from '../../data/type'
import {
  itemToStorage, bannerToStorage, cartFromStorage, deliveryFromStorage, deliveryToStorage,
} from '../../helper/helper'
import './index.css'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Menu(props: RouteComponentProps) {
  const screenWidth = window.innerWidth
  const [Categories, setCategories] = React.useState([])
  const [Items, setItems] = React.useState([])
  const [BannerData, setBannerData] = React.useState<bannerShape>({
    name: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    postal: '',
    currency: '',
  })
  React.useEffect(() => {
    const subDomain = window.location.hostname.split('.')[0]
    const menuUrl = `${window.location.origin}/api/menu/items/${subDomain}/`
    const bannerUrl = `${window.location.origin}/api/org/banner/${subDomain}/`
    const loadData = async () => {
      const menuResponse = await axios.get(menuUrl)
      const bannerResponse = await axios.get(bannerUrl)
      setItems(menuResponse.data.items)
      setCategories(menuResponse.data.categories)
      setBannerData(bannerResponse.data)
      itemToStorage(menuResponse.data.items)
      bannerToStorage(bannerResponse.data)
      document.title = bannerResponse.data.name
    }
    loadData()
  }, [])

  const localCart = cartFromStorage()
  let totalQuantity: number = 0
  let totalPrice: number = 0
  totalQuantity = localCart.reduce((prev: number, next: cartShape) => prev + next.cartQuantity, 0)
  totalPrice = localCart.reduce((prev: number, next: cartShape) => prev + next.cartPrice, 0)

  const initDelivery = deliveryFromStorage()

  const [Day, setDay] = React.useState(initDelivery.day)
  const [Time, setTime] = React.useState(initDelivery.time)

  const dayList = ['Saturday, Nov 7th', 'Sunday, Nov 8th']
  const timeList = ['11:00 AM-1:00 PM', '6:30 PM-8:30 PM']

  const handleModalChange = (day: string, time: string) => {
    const newDay = day
    const newTime = time
    const localDelivery: deliveryShape = {
      day: newDay,
      time: newTime,
    }
    setDay(newDay)
    setTime(newTime)
    deliveryToStorage(localDelivery)
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const localDelivery: deliveryShape = {
      day: '',
      time: '',
    }
    if (event.currentTarget.name === 'day') {
      setDay(event.currentTarget.value)
      localDelivery.day = event.currentTarget.value
      localDelivery.time = Time
    } else {
      setTime(event.currentTarget.value)
      localDelivery.time = event.currentTarget.value
      localDelivery.day = Day
    }
    deliveryToStorage(localDelivery)
  }
  return (
    <div className="menu-page">
      <DeliveryPickModal
        dayList={dayList}
        timeList={timeList}
        handleModalChange={handleModalChange}
        show={!Day || !Time}
      />
      <div className="dropdown-header">
        <NativeSelect
          value={Day}
          name="day"
          onChange={handleSelectChange}
          inputProps={{
            style: { textAlign: 'center' },
          }}
        >
          <option value="" disabled>
            {Day}
          </option>
          {dayList.map((day, dayIndex) => (
            <option key={dayIndex.toString()} value={day}>{day}</option>
          ))}
        </NativeSelect>
        <NativeSelect
          value={Time}
          name="time"
          onChange={handleSelectChange}
          inputProps={{
            style: { textAlign: 'center' },
          }}
        >
          <option value="" disabled>
            {Time}
          </option>
          {timeList.map((time, timeIndex) => (
            <option key={timeIndex.toString()} value={time}>{time}</option>
          ))}
        </NativeSelect>
      </div>
      <Banner bannerData={BannerData} />
      <div className="below-banner-section">
        <CategoryHeader categories={Categories} cartQuantity={totalQuantity} />
        <MenuCard categories={Categories} items={Items} currency={BannerData.currency} />
      </div>
      {(screenWidth < 768) && (totalQuantity > 0) && (
        <div className="menu-bottom-sticky-button" role="button" tabIndex={0}>
          <Link to="/cart">
            <ViewCartButton cartQuantity={totalQuantity} cartPrice={totalPrice} />
          </Link>
        </div>
      )}
    </div>
  )
}
