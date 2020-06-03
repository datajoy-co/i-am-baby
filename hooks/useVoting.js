import useParents from './useParents'

export default function useVoting () {
  const [currentParentName, otherParentName, toggleParent] = useParents()

  function saveLike (name) {
    console.log(`Saving ${currentParentName} likes ${name}`)
  }

  function saveDontLike (name) {
    console.log(`Saving ${currentParentName} doesn't like ${name}`)
  }

  return {
    currentParentName,
    otherParentName,
    toggleParent,
    saveLike,
    saveDontLike
  }
}
