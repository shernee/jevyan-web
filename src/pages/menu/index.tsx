import React from 'react'
import { RouteComponentProps } from '@reach/router'
import Banner from '../../components/menu/banner'
import CategoryHeader from '../../components/menu/category-header'
import MenuCard from '../../components/menu/menu-card'
import './index.css'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Menu(props: RouteComponentProps) {
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
