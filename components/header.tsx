import Link from "next/link"

const Header = () => {
  return (
    <header className="bg-gray-100 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          My App
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:text-gray-500">
                Home
              </Link>
            </li>
            <li>
              <Link href="/(marketing)/login" className="hover:text-gray-500">
                Login
              </Link>
            </li>
            <li>
              <Link href="/(marketing)/signup" className="hover:text-gray-500">
                Signup
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
