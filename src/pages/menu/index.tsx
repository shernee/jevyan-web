import React from 'react'
import Banner from '../../components/menu/banner'
import CategoryHeader from '../../components/menu/category-header'
import MenuCard from '../../components/menu/menu-card'
import './index.css'

export default function Menu() {
  return (
    <div className="menu-page">
      <Banner />
      <div className="below-banner-section">
        <CategoryHeader />
        <MenuCard />
      </div>
    </div>
  )
}
