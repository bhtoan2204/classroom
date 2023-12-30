import { Socket, io } from "socket.io-client";
import { getCookieCustom } from "src/utils/cookies";

let socket: Socket | null = null;

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
    console.log("connected");

}

export const sendNotification = (data: any) => {
    if (socket !== null) {
        socket.emit('newNotification', data);
    }
};

export const closeConnection = () => {
    if (socket !== null) {
        socket.disconnect();
    }
}

export const getSocket = () => socket;