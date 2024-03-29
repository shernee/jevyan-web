/* eslint-disable no-console */
import React from 'react'
import './index.css'
import NameCard from '../name-card/index'

interface IBannerProps {
  bannerData : any;
}

const Banner = (props: IBannerProps) => {
  const {
    bannerData,
  } = props
  const {
    name, phone, city, image,
  } = bannerData
  return (
    <section id="main-banner-section" style={{ background: (image ? `url(${image})` : '#DD9CDF') }}>
      <div className="white-card">
        <NameCard
          name={name}
          phone={phone}
          city={city}
        />
      </div>
    </section>
  )
}

export default Banner
