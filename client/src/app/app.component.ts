import { Component } from '@angular/core';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(socketService: SocketService) {
    socketService.onNewMessage().subscribe(message => {
      console.log(message);
    });
  }
}
