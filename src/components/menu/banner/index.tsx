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
  console.log(bannerData)
  const {
    name, phone, state, image,
  } = bannerData
  return (
    <section id="main-banner-section" style={{ background: (image ? `url(${image})` : 'lightblue') }}>
      <div className="white-card">
        <NameCard
          name={name}
          phone={phone}
          state={state}
        />
      </div>
    </section>
  )
}

export default Banner
