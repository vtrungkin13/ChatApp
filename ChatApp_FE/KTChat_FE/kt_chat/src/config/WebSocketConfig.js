import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client'

const socketUrl = 'http://localhost:8080/ws'
const stompClient = new Client({
    brokerURL: socketUrl,
    connectHeaders: {},
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    webSocketFactory: () => new SockJS(socketUrl),
})

export const connect = (onMessageReceived) => {
    stompClient.onConnect = () => {
        stompClient.subscribe('/topic/messages', (message) => {
            onMessageReceived(JSON.parse(message.body))
        })
    }
    stompClient.activate()
}

export const sendMessage = (message) => {
    stompClient.publish({
        destination: '/app/chat',
        body: JSON.stringify(message),
    })
}
