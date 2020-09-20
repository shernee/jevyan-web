import React from 'react'
import './index.css'

interface INameProps {
  name: string;
  state: string;
  phone: number;
}

const NameCard = (props: INameProps) => {
  const {
    name, state, phone,
  } = props
  return (
    <section id="name-card-section">
      <div className="container">
        <div className="name-card-box">
          <h3 className="restaurant-name">
            {name}
          </h3>
          <div className="contact-info">
            <span>{state}</span>
            <span>{phone}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NameCard
