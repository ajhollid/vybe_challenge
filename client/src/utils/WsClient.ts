class WebSocketClient {
  url: string;
  ws: WebSocket;
  constructor(url: string) {
    this.url = url;
    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      console.log("WebSocket connection established");
    };

    this.ws.onerror = (error) => {
      console.error("WebSocket error ", error);
    };

    this.ws.onclose = () => {
      console.log("WebSocket connection closed");
    };
  }

  sendMessage(message: string) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(message);
    } else {
      console.error("WebSocket is not open. Message not sent:", message);
    }
  }
}

export default WebSocketClient;
