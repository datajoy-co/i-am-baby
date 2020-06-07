export default function getLinks (username) {
  return {
    namesYouBothLike () {
      return {
        href: '/users/[username]/names-you-both-like',
        as: `/users/${username}/names-you-both-like`
      }
    },
    rateName (name) {
      return {
        href: '/users/[username]/names/[name]',
        as: `/users/${username}/names/${name}`
      }
    },
    rateNextName () {
      return {
        href: '/users/[username]/rate-names',
        as: `/users/${username}/rate-names`
      }
    }
  }
}
