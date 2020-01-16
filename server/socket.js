import WebSocket from 'ws';
import { sessionParser } from './middleware/session';

let ws;
const usersSwitchBoard = {};
const organizationSwitchBoard = {};

export const GetWebSocket = () => ws;

export const initializeWebsocketConnection = (server) => {
  ws = new WebSocket.Server({ server })
  ws.on('connection', (connection, request) => {
    console.log("User has connected to websocket.");
      sessionParser(request, {}, () => {
        const { sessionID, session } = request;
        // TODO: Validate if a websocket already exists on switchboard
        usersSwitchBoard[sessionID] = connection;
        connection.send("Hello from CLI Websocket");
        connection.send(JSON.stringify({
          data: 1,
          testData: ["foo", "bar"],
        }));
        connection.on('message', (message) => {
          console.log("Message from client which requires fingerprinting.");
          console.log(message);
        });
      });
  });
}