import React from 'react'
import './index.css'
import NameCard from '../name-card/index'

export default function Banner() {
  return (
    <section id="main-banner-section">
      <div id="main-banner">
        <div className="white-card">
          <NameCard />
        </div>
      </div>
    </section>
  )
}
