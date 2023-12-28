import { Socket, io } from "socket.io-client";

export class NotificationClient {
    private socket: Socket;

    constructor(accessToken: string) {
        this.socket = io('http://localhost:8080/notification', {
            extraHeaders: {
                Authorization: 'Bearer ' + accessToken,
            },
        });
        this.socket.on('connect', () => { })
    }

    public sendNotification() {
        this.socket.emit('newNotification', { message: "test data" });
    }

    public closeConnection() {
        this.socket.disconnect();
    }
}