import React from 'react'
import ItemPage from './ItemPage'

const ItempageContainer = ({ collectionItems, match, ...props }) => {
  const targetItemId = match.params.id;

  const item = collectionItems.find(item => item.pid === targetItemId);

  if (!item) return <h2 className="p-3">Item not found.</h2>

  const recommendations = collectionItems.filter(citem => {
    const isBetweenPriceRange = (item.price - 100 < citem.price < item.price + 100);
    return (isBetweenPriceRange && citem.pid !== item.pid);
  })

  return <ItemPage item={item} recommendations={recommendations} {...props} />
}

export default ItempageContainer;