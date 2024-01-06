import { Socket, io } from "socket.io-client";
import { getCookieCustom } from "src/utils/cookies";

let socket: Socket | null = null;

export interface SendNotification {
    receiver_id: string;
    title: string;
    content: string;
    id: string;
}

export interface MultipleNotifications {
    class_id: string;
    title: string;
    content: string;
    id: string;
}

export const createConnection = () => {
    const accessToken = getCookieCustom('accessToken');
    if (accessToken === undefined) {
        closeConnection();

        return;
    }
    closeConnection();
    socket = io(process.env.NEXT_PUBLIC_API_HOST + '/notification', {
        extraHeaders: {
            Authorization: 'Bearer ' + accessToken,
        },
    });

}

export const sendNotification = (data: SendNotification) => {
    if (socket !== null) {
        socket.emit('newNotification', data);
    }
};

export const multipleNotifications = (data: MultipleNotifications) => {
    if (socket !== null) {
        socket.emit('multipleNotifications', data);
    }
}

export const closeConnection = () => {
    if (socket !== null) {
        socket.disconnect();
    }
}

export const getSocket = () => socket;