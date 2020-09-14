import React from 'react'
import './index.css'
import bannerDetails from '../banner/name'

export default function NameCard() {
  return (
    <section id="name-card-section">
      <div className="container">
        <div className="name-card-box">
          <h3 className="restaurant-name">
            {bannerDetails.name}
          </h3>
          <div className="contact-info">
            <span>{bannerDetails.location}</span>
            <span>{bannerDetails.contact}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
