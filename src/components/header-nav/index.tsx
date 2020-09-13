import React from 'react'
import { Link } from '@reach/router'

export default function HeaderNav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/">Home</Link>
    </nav>
  )
}
