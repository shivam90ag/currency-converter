import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { $WebSocket, WebSocketSendMode } from 'angular2-websocket/angular2-websocket';
import { ApiUrl } from './shared/constants/apiurl.constant';


const HEADER = {
    headers: new Headers({
        'Content-Type': 'application/json'
    })
};
var ws;
@Injectable()
export class AppService {
    onlineUser: number = 0;
    constructor(
        private http: Http) {
    }
    createConnection() {
        if(!ws){
            ws = new $WebSocket("ws://localhost:3000");
        }
        ws.onMessage(
            (msg: MessageEvent) => {
                this.onlineUser = parseInt(msg.data);
            },
            { autoApply: false }
        );

        // send with default send mode (now default send mode is Observer)
        ws.send("some thing ===>").subscribe(
            (msg) => {
                console.log("next", msg.data);
            },
            (msg) => {
                console.log("error", msg);
            },
            () => {
                console.log("complete");
            }
        );
    }
    closeConnection(){
        ws.close(true);
    }
    getOnlineUser(){
        return this.onlineUser;
    }
}