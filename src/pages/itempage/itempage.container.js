import React from 'react'
import ItemPage from './itempage.component'

export const ItempageContainer = ({ collectionItems, match, ...props }) => {
  const targetItemId = match.params.id;

  const item = collectionItems.find(item => item.pid === targetItemId)

  const recommendations = collectionItems.filter(citem => {
    const isBetweenPriceRange = (item.price - 100 < citem.price < item.price + 100);
    return (isBetweenPriceRange && citem.pid !== item.pid);
  })

  return (
    item ? (
      <ItemPage item={item} recommendations={recommendations} {...props} />
    ) : (
        <h2>Item not found.</h2>
      )
  )
}
