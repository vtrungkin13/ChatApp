import { useState, useEffect } from 'react'
import './home-page.scss'
import Header from '../../components/Header'
import { Icon } from '@iconify/react/dist/iconify.js'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'

import { getUser, getUsers, getMessages, createMessage } from '../../config/ApiConfig'
import { connect, sendMessage } from '../../config/WebSocketConfig'

import Cookies from 'js-cookie'

function HomePage() {
    const [activeIndex, setActiveIndex] = useState(null)

    const uid = Cookies.get('uid')

    const checkCookies = () => {
        if (uid === undefined) {
            window.location.href = '/login'
        }
    }

    useEffect(() => {
        checkCookies()
    }, [])

    const [messages, setMessages] = useState([])

    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState(null)
    const [currentReceiver, setCurrentReceiver] = useState(null)

    useEffect(() => {
        getUsers(uid).then((response) => {
            setUsers(response.data)
        })
        getUser(uid).then((response) => {
            setCurrentUser(response.data)
        })
    })

    useEffect(() => {
        connect((newMessage) => {
            setMessages((prevMessages) => [newMessage, ...prevMessages])
        })
    }, [])

    const handleClickUser = (user, index) => {
        setActiveIndex(index)
        setCurrentReceiver(user)
        getMessages(currentUser.userId, user.userId).then((response) => setMessages(response.data))
    }

    const { register, handleSubmit, setValue } = useForm()

    const handleSendMessage = (data) => {
        const newMessage = {
            senderId: currentUser.userId,
            receiverId: currentReceiver.userId,
            messageContent: data.message,
        }
        createMessage(newMessage).then((response) => {
            sendMessage(response.data)
            // setMessages((prevMessages) => [response.data, ...prevMessages])
        })
        setValue('message', '')
    }

    return (
        <>
            <Header />
            <div id="home-page-wrapper">
                <div id="home-page-body">
                    <div id="user-list-container">
                        <div className="user-list">
                            <div className="search-box">
                                <div className="search-icon">
                                    <Icon icon="material-symbols:search" />
                                </div>
                                <form>
                                    <input type="text" placeholder="Search User" />
                                </form>
                            </div>
                            <div className="users">
                                {users.length > 0 ? (
                                    users.map((user, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className={`user ${
                                                    activeIndex === index ? 'selected-user' : ''
                                                }`}
                                                onClick={() => handleClickUser(user, index)}
                                            >
                                                <div className="user-avt">
                                                    <img
                                                        width="100%"
                                                        height="100%"
                                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/340px-Default_pfp.svg.png"
                                                    />
                                                </div>
                                                <div className="user-name">
                                                    <p>{user.name}</p>
                                                    <p>{user.username}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                ) : (
                                    <div className="no-users">
                                        <div>
                                            <p>Discovering people and send your first message</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div id="chat-box-container">
                        <div className="chat-box">
                            {currentReceiver !== null ? (
                                <div className="user-chat">
                                    <div className="user-chat-info">
                                        <div className="info-box">
                                            <div className="info-img">
                                                <img
                                                    width="100%"
                                                    height="100%"
                                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/340px-Default_pfp.svg.png"
                                                />
                                            </div>
                                            <p className="info-name">{currentReceiver.name}</p>
                                        </div>
                                    </div>
                                    <div className="user-chat-messages">
                                        {messages.length > 0 ? (
                                            messages.map((msg) => {
                                                return (
                                                    <div
                                                        key={msg.messageId}
                                                        className={
                                                            currentUser.userId === msg.senderId ||
                                                            currentUser === msg.sender
                                                                ? 'sent-message'
                                                                : 'received-message'
                                                        }
                                                    >
                                                        <p className="message-time">
                                                            {format(msg.time, 'dd/MM/yyyy HH:mm')}
                                                        </p>
                                                        <div className="message-content">
                                                            <p>{msg.messageContent}</p>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        ) : (
                                            <div className="start-chat">
                                                <p>Start chat with {currentReceiver.name}</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="chat-field">
                                        <form onSubmit={handleSubmit(handleSendMessage)}>
                                            <input
                                                id="message-input"
                                                type="text"
                                                placeholder="Start typing..."
                                                autoComplete="off"
                                                {...register('message')}
                                            />
                                            <button>
                                                <Icon icon="formkit:arrowright" />
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            ) : (
                                <div className="no-messages">
                                    <div>
                                        <p>Your messages</p>
                                        <p>Send a message to start a chat</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage
