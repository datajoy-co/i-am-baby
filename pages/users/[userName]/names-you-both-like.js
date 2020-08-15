import React, { useState, useEffect } from "react"
import Link from "next/link"
import getLinks from "../../../library/get-links"
import { capitalize } from "../../../library/helpers"
import * as database from "../../../library/database"

export async function getServerSideProps({ res, params }) {
  const voters = await database.getVoters()
  const userName = params.userName

  return {
    props: {
      userName,
      voters,
    },
  }
}

export default function (props) {
  const { userName, voters } = props
  const [partnerName, setPartnerName] = useState(voters[0])
  const [userLinks, setUserLinks] = useState(
    getLinks(userName).namesYouBothLike()
  )

  useEffect(() => {
    setUserLinks(getLinks(userName).namesYouBothLike(partnerName.toLowerCase()))
  }, [partnerName])

  return (
    <>
      <div class="bg-white shadow sm:rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div>
            <label
              htmlFor="partnerName"
              className="block text-sm leading-5 font-medium text-gray-700"
            >
              Who do you want to compare lists with?
            </label>
            <select
              value={capitalize(partnerName)}
              onChange={(e) => {
                setPartnerName(e.target.value.toLowerCase())
              }}
              id="location"
              className="mt-1 form-select block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
            >
              {voters.filter((voter) => {
                return voter != userName
              }).map((voter) => {
                return <option>{capitalize(voter)}</option>
              })}
            </select>
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
      </div>
    </>
  )
}
