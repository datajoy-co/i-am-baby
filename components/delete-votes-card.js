import React from "react"
import links from "../library/get-links"

export default function (props) {
  const { voting } = props

  return (
    <div className="justify-center p-20">
      <div className=" bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Start over
          </h3>
          <div className="mt-2 max-w-xl text-sm leading-5 text-gray-500">
            <p>Delete your votes to start again!</p>
          </div>
          <div className="mt-5">
            <button
              onClick={async () => {
                await voting.deleteAllVotesForUser()
                location.reload()
              }}
              type="button"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-50 focus:outline-none focus:border-red-300 focus:shadow-outline-red active:bg-red-200 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            >
              Delete your votes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
