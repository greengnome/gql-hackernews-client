import React from 'react'

const Link = ({ link }) => {
  return (
    <div>
      {link.description} ({link.url}) createdAt: {link.createdAt}
    </div>
  )
}

export default Link
