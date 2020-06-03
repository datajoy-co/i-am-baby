import { useState } from 'react'

function getOtherParentName (parentName) {
  if (parentName === 'kristin') {
    return 'paul'
  }

  return 'kristin'
}

export default function useParents () {
  const [currentParentName, setParentName] = useState('kristin')
  const otherParentName = getOtherParentName(currentParentName)

  function toggleParent () {
    setParentName(otherParentName)
  }

  return [currentParentName, otherParentName, toggleParent]
}
