import { Icon } from '@iconify/react/dist/iconify.js'
import './header.scss'
import { useRef, useState, useEffect } from 'react'
import { getUser } from '../../config/ApiConfig'

import Cookies from 'js-cookie'

function Header() {
    const [showDropdown, setShowDropdown] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)
    const dropdownRef = useRef(null)

    const handleShowDropdown = () => {
        setShowDropdown(!showDropdown)
    }

    const handleClickOutsideDropdown = (event) => {
        let dropdownToggle = document.getElementById('avt-image')
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target) &&
            event.target !== dropdownToggle
        ) {
            setShowDropdown(false)
        }
    }

    const uid = Cookies.get('uid')
    useEffect(() => {
        getUser(uid).then((response) => {
            setCurrentUser(response.data)
        })
    }, [])

    const logout = () => {
        Cookies.remove('uid')
        window.location.href = '/login'
    }

    useEffect(() => {
        if (showDropdown) {
            document.addEventListener('mousedown', handleClickOutsideDropdown)
        } else {
            document.removeEventListener('mousedown', handleClickOutsideDropdown)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutsideDropdown)
        }
    }, [showDropdown])

    return (
        <div id="header-wrapper">
            <div id="header-components">
                <div className="logo">
                    <img width="50px" src="../../../KTChatTransparentFull.png" />
                </div>
                <div className="search-bar">
                    <div className="search-box">
                        <div className="search-icon">
                            <Icon icon="material-symbols:search" />
                        </div>
                        <form>
                            <input type="text" placeholder="Search User" />
                        </form>
                    </div>
                </div>
                <div className="avt" onClick={handleShowDropdown}>
                    <img
                        id="avt-image"
                        width="50px"
                        height="50px"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/340px-Default_pfp.svg.png"
                    />
                    {showDropdown && (
                        <div id="avt-dropdown" ref={dropdownRef}>
                            <div className="user-info">
                                <p>{currentUser.name}</p>
                            </div>
                            <div className="setting-container">
                                <Icon icon="uil:setting" />
                                <span>Setting</span>
                            </div>
                            <div className="logout-container" onClick={logout}>
                                <Icon icon="mdi:logout" />
                                <span>Log out</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Header
