import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface Message {
  type: string;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: SocketIOClient.Socket;

  constructor() {
    this.socket = socketIo(environment.socketPath);
    this.socket.on('connect', () => {
      console.log('Web socket connected');
    });
  }

  onNewMessage(): Observable<Message> {
    return Observable.create((observer) => {
      this.socket.on('message', message => {
        observer.next(message);
      });
    });
  }

  send(message: Message) {
    this.socket.send(message);
  }
}
