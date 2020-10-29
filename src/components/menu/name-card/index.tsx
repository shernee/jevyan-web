import React from 'react'
import './index.css'

interface INameProps {
  name: string;
  city: string;
  phone: number;
}

const NameCard = (props: INameProps) => {
  const {
    name, city, phone,
  } = props
  return (
    <section id="name-card-section">
      <div className="container">
        <div className="name-card-box">
          <h3 className="restaurant-name">
            {name}
          </h3>
          <div className="contact-info">
            <span>{city}</span>
            <span>{phone}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NameCard
