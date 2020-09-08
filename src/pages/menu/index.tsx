import React from 'react'
import Banner from '../../components/banner'
import CategoryHeader from '../../components/category-header'
import MenuCard from '../../components/menu-card'

export default function Menu() {
  return (
    <div className="menu-page">
      <Banner />
      <CategoryHeader />
      <MenuCard />
    </div>
  )
}
