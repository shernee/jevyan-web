/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import axios from 'axios'
import { RouteComponentProps } from '@reach/router'
import Banner from '../../components/menu/banner'
import CategoryHeader from '../../components/menu/category-header'
import MenuCard from '../../components/menu/menu-card'
import './index.css'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Menu(props: RouteComponentProps) {
  const [Categories, setCats] = React.useState([])
  const [Items, setIts] = React.useState([])
  const [BannerData, setBannerData] = React.useState({})
  React.useEffect(() => {
    const subDomain = window.location.hostname.split('.')[0]
    const menuUrl = `${window.location.origin}/api/menu/items/${subDomain}/`
    const bannerUrl = `${window.location.origin}/api/org/banner/${subDomain}/`
    const loadData = async () => {
      const menuResponse = await axios.get(menuUrl)
      const bannerResponse = await axios.get(bannerUrl)
      setIts(menuResponse.data.items)
      setCats(menuResponse.data.categories)
      setBannerData(bannerResponse.data)
    }
    loadData()
  }, [])

  return (
    <div className="menu-page">
      <Banner bannerData={BannerData} />
      <div className="below-banner-section">
        <CategoryHeader categories={Categories} />
        <MenuCard categories={Categories} items={Items} />
      </div>
    </div>
  )
}
