import { useState } from 'react'
import Link from 'next/link'
import { NavbarToggler, Collapse } from 'reactstrap'

const links = [
  //{ href: '/', label: 'Home' },
].map(link => {
  link.key = `nav-link-${link.href}`
  return link
})

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  return (
    <nav className="navbar navbar-expand-md navbar-light">
      
      <Link href="/">
        <a className="navbar-brand">
          Twitter Exporter
        </a>
      </Link>
      
      <NavbarToggler onClick={toggle}>
        <span className="navbar-toggler-icon"></span>
      </NavbarToggler>

      <Collapse isOpen={isOpen} navbar>
        <div className="navbar-nav">
          {links.map(({ href, label, key }) => (
            <Link href={href} key={key}>
              <a className="nav-link">
                {label}
              </a>
            </Link>
          ))}
        </div>
      </Collapse>

      <style jsx>{`
        .navbar-light .navbar-toggler-icon {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(0, 0, 0, 0.5)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
        }
      `}</style>
    </nav>
  )
}

export default Navbar
