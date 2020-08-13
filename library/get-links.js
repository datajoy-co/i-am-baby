export default function getLinks (userName) {
  return {
    namesYouBothLike (partnerName) {
      if(partnerName == null ){
        return {
          href: '/users/[userName]/names-you-both-like',
          as: `/users/${userName}/names-you-both-like`
        }
      }
      else{
        return {
          href: '/users/[userName]/names-you-both-like/[partnerName]',
          as: `/users/${userName}/names-you-both-like/${partnerName}`
        }
      }

    },
    rateName (name) {
      if (name == null) {
        return {
          href: '/users/[userName]/voting-complete',
          as: `/users/${userName}/voting-complete`
        }
      }

      return {
        href: '/users/[userName]/names/[name]',
        as: `/users/${userName}/names/${name}`
      }
    },
    rateNextName () {
      return {
        href: '/users/[userName]/rate-names',
        as: `/users/${userName}/rate-names`
      }
    },
    yourVotes () {
      return {
        href: '/users/[userName]/your-votes',
        as: `/users/${userName}/your-votes`
      }
    },
  }
}
