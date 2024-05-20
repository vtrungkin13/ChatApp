import axios from 'axios'

const API_URL = 'http://localhost:8080/api'

export const getUsers = (currentUserId) => axios.get(`${API_URL}/users/${currentUserId}`)
export const getUser = (userId) => axios.get(`${API_URL}/users/get-user/${userId}`)

export const getMessages = (senderId, receiverId) => axios.get(`${API_URL}/messages/get-messages/${senderId}/${receiverId}`)
export const createMessage = (message) => axios.post(`${API_URL}/messages`, message)