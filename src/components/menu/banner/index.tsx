import React from 'react'
import './index.css'
import NameCard from '../name-card'

export default function Banner() {
  return (
    <section id="main-banner-section">
      <div className="white-card">
        <NameCard />
      </div>
    </section>
  )
}
