import React from 'react'
import './index.css'
import { categoryShape } from '../../../data/type'

interface ICategoryProps {
  categories: Array<categoryShape>;
}

export default function CategoryHeader(props: ICategoryProps) {
  const {
    categories,
  } = props

  return (
    <nav className="navbar px-0 sticky-top navbar-expand navbar-custom">
      <ul className="nav navbar-nav">
        {categories.map((category) => (
          <li key={category.id}><a href={`#${category.name}`}>{category.name}</a></li>
        ))}
      </ul>
    </nav>
  )
}
