import React, { useState, useEffect } from "react"
import Link from "next/link"
import getLinks from "../../../library/get-links"
import { capitalize } from "../../../library/helpers"

export default function (props) {
  const userName = props.voting.currentParentName
  console.log(userName)
  const [partnerName, setPartnerName] = useState("")
  const [userLinks, setUserLinks] = useState(
    getLinks(userName).namesYouBothLike()
  )

  useEffect(() => {
    setUserLinks(getLinks(userName).namesYouBothLike(partnerName))
  }, [partnerName])

  return (
    <>
      <div>
        <label
          htmlFor="partnerName"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Who do you want to compare lists with?
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            onChange={(e) => {
              setPartnerName(e.target.value)
            }}
            id="partnerName"
            className="form-input block w-full sm:text-sm sm:leading-5"
            placeholder="Joe"
          />
        </div>
        {partnerName.length > 0 && (
          <div className="mt-5 sm:mt-6">
            <span className="flex w-full rounded-md shadow-sm">
              <Link
                disabled={partnerName.length < 1}
                href={userLinks.href}
                as={userLinks.as}
              >
                <button
                  disabled={partnerName.length < 1}
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                >
                  Compare with {capitalize(partnerName)}
                </button>
              </Link>
            </span>
          </div>
        )}
      </div>
    </>
  )
}
