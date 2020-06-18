import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { capitalize } from '../library/helpers.js'
import useLinks from '../hooks/use-links.js'
import useParents from '../hooks/use-parents.js'
import ProfileImage from '../components/profile-image.js'

function SwitchParent (props) {
  const handleClick = props.toggleParent
  return (
    <div className='origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg'>
      <div className='py-1 rounded-md bg-white shadow-xs'>
        <a
          href='#'
          className='block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out'
          onMouseDown={handleClick}
        >
          Switch to {capitalize(props.otherParentName)} →
        </a>
      </div>
    </div>
  )
}

function useToggle (initialState) {
  const [state, setState] = useState(initialState)
  function toggle () {
    setState(!state)
  }

  return [state, toggle]
}

function ProfileDropdown (props) {
  const [currentParentName, otherParentName, toggleParent] = useParents()
  const [showSwitcher, toggleSwitcher] = useToggle(false)

  if (!currentParentName) {
    return null
  }

  return (
    <div className='ml-3 relative'>
      <div>
        <button
          className='flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out'
          id='user-menu'
          aria-label='User menu'
          aria-haspopup='true'
          onClick={toggleSwitcher}
          onBlur={toggleSwitcher}
        >
          <ProfileImage parentName={currentParentName} />
        </button>
      </div>
      {/* <!-- */}
      {/* Profile dropdown panel, show/hide based on dropdown state. */}
      {/* Entering: "transition ease-out duration-200" From: "transform */}
      {/* opacity-0 scale-95" To: "transform opacity-100 scale-100" */}
      {/* Leaving: "transition ease-in duration-75" From: "transform */}
      {/* opacity-100 scale-100" To: "transform opacity-0 scale-95" */}
      {/* --> */}
      {showSwitcher && (
        <SwitchParent
          otherParentName={otherParentName}
          toggleParent={toggleParent}
        />
      )}
    </div>
  )
}

function NavLink (props) {
  const router = useRouter()

  let active = props.active
  if (props.active == null) {
    active = router.asPath === props.as
  }

  const className = props.className || ''

  let anchorClasses =
    className +
    ' inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out'
  if (active) {
    anchorClasses =
      className +
      ' inline-flex items-center px-1 pt-1 border-b-2 border-pink-500 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-pink-700 transition duration-150 ease-in-out'
  }

  return (
    <Link href={props.href} as={props.as}>
      <a className={anchorClasses}>{props.children}</a>
    </Link>
  )
}

export default function nav (props) {
  const router = useRouter()
  const links = useLinks()
  const rateNameLink = links.currentParent.rateName('')
  const rateNextNameLink = links.currentParent.rateNextName()
  const namesYouBothLike = links.currentParent.namesYouBothLike()

  return (
    <nav className='bg-white shadow-sm'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16'>
          <div className='flex'>
            <div className='flex-shrink-0 flex items-center cursor-pointer'>
              <Link href='/'>
                <img
                  className='block lg:hidden h-8 w-auto'
                  src='/logo-transparent.png'
                  alt='Workflow logo'
                />
              </Link>
              <Link href='/'>
                <img
                  className='hidden lg:block h-8 w-auto'
                  src='/logo-transparent.png'
                  alt='Workflow logo'
                />
              </Link>
            </div>
            <div className='hidden sm:ml-6 sm:flex'>
              <NavLink
                href={rateNextNameLink.href}
                as={rateNextNameLink.as}
                active={router.pathname === rateNameLink.href}
              >
                Rate Names
              </NavLink>

              <NavLink
                href={namesYouBothLike.href}
                as={namesYouBothLike.as}
                className='ml-8'
              >
                Names You Both Like
              </NavLink>
            </div>
          </div>
          <div className='hidden sm:ml-6 sm:flex sm:items-center'>
            <ProfileDropdown />
          </div>
          <div className='-mr-2 flex items-center sm:hidden'>
            {/* Mobile menu button --> */}
            <button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out'>
              {/* <!-- Menu open: "hidden", Menu closed: "block" --> */}
              <svg
                className='block h-6 w-6'
                stroke='currentColor'
                fill='none'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
              {/* <!-- Menu open: "block", Menu closed: "hidden" --> */}
              <svg
                className='hidden h-6 w-6'
                stroke='currentColor'
                fill='none'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* <!-- */}
      {/* Mobile menu, toggle classNamees based on menu state. Open: "block", */}
      {/* closed: "hidden" */}
      {/* --> */}
      <div className='hidden sm:hidden'>
        <div className='pt-2 pb-3'>
          <a
            href='#'
            className='block pl-3 pr-4 py-2 border-l-4 border-pink-500 text-base font-medium text-pink-700 bg-pink-50 focus:outline-none focus:text-pink-800 focus:bg-pink-100 focus:border-pink-700 transition duration-150 ease-in-out'
          >
            Rate Names
          </a>
          <a
            href='#'
            className='mt-1 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out'
          >
            Names You Both Like
          </a>
          <span className='inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium leading-5 bg-pink-100 text-pink-800'>
            Badge
          </span>
        </div>
        <div className='pt-4 pb-3 border-t border-gray-200'>
          <div className='flex items-center px-4'>
            <div className='flex-shrink-0'>
              <img
                className='h-10 w-10 rounded-full'
                src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                alt=''
              />
            </div>
            <div className='ml-3'>
              <div className='text-base font-medium leading-6 text-gray-800'>
                Tom Cook
              </div>
              <div className='text-sm font-medium leading-5 text-gray-500'>
                tom@example.com
              </div>
            </div>
          </div>
          <div
            className='mt-3'
            role='menu'
            aria-orientation='vertical'
            aria-labelledby='user-menu'
          >
            <a
              href='#'
              className='block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out'
              role='menuitem'
            >
              Your Profile
            </a>
            <a
              href='#'
              className='mt-1 block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out'
              role='menuitem'
            >
              Settings
            </a>
            <a
              href='#'
              className='mt-1 block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out'
              role='menuitem'
            >
              Sign out
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
