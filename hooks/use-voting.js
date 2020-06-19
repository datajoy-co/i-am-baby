import ky from 'ky-universal'
import useParents from './use-parents'

export default function useVoting () {
  const [currentParentName, otherParentName, toggleParent] = useParents()

  async function vote (name, liked) {
    await ky.post(`/api/users/${currentParentName}/votes`, {
      json: {
        name,
        liked
      }
    })
  }

  return {
    currentParentName,
    otherParentName,
    toggleParent,
    vote
  }
}
