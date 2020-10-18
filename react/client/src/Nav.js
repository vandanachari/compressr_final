import React from 'react'
import './Nav.css'
import {Link} from 'react-router-dom'

function Nav() {
    return (
        <nav>
            <ul className="nav-links">
                <Link to="/">
                    <li id="welcomeElement">Welcome</li>
                </Link>
                <Link to="/demo">
                    <li id="demoElement">Demo</li>

                </Link>
                <Link to="/tryitout">
                    <li id="tryitoutElement">Try It Out</li>

                </Link>
                <Link to="/about">
                    <li id="aboutElement">About</li>
                </Link>
            </ul>
        </nav>
    )
}

export default Nav;