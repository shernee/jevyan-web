/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import axios from 'axios'
import { RouteComponentProps, Link } from '@reach/router'
import TablePickModal from '../../components/menu/table-modal'
import TableHeader from '../../components/menu/table-header'
import Banner from '../../components/menu/banner'
import CategoryHeader from '../../components/menu/category-header'
import MenuCard from '../../components/menu/menu-card'
import ViewCartButton from '../../components/menu/view-cart-button'
import { cartShape, bannerShape, tableShape } from '../../data/type'
import {
  itemToStorage, bannerToStorage, cartFromStorage, tableFromStorage, tableToStorage,
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

  const initTableNo = tableFromStorage()

  const [TableNo, setTableNo] = React.useState(initTableNo.tableNo)

  const tableList: Array<string> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15']

  const handleTableChange = (tableNo: string) => {
    const newTableNo = tableNo
    const localTableNo: tableShape = {
      tableNo: newTableNo,
    }
    setTableNo(newTableNo)
    tableToStorage(localTableNo)
  }
  return (
    <div className="menu-page">
      <TablePickModal
        tableList={tableList}
        handleModalChange={handleTableChange}
        show={!TableNo}
      />
      <TableHeader
        tableList={tableList}
        selectedTable={TableNo}
        handleTableChange={handleTableChange}
      />
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
