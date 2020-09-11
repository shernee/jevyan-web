import React from 'react'
import Banner from '../../components/banner'
import CategoryHeader from '../../components/category-header'
import MenuCard from '../../components/menu-card'
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
