import ReconnectingWebSocket from 'reconnecting-websocket';

async function WebSocketsPOV() {
    const ws = await connectToServer();

    async function connectToServer() {
        const isLocalhost = window.location.hostname === 'localhost'
        const url = isLocalhost ? 'ws://localhost:7072' : 'wss://no-imagination-required.io/wssPOV/'
        const ws = new ReconnectingWebSocket(url);
        return new Promise((resolve, reject) => {
            const timer = setInterval(() => {
                if (ws.readyState === 1) {
                    clearInterval(timer);
                    resolve(ws);
                }
            }, 10);
        });
    }
    return ws
}

export default WebSocketsPOV