import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from '../socket.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit, OnDestroy {
  barMode: string = 'query';
  barValue: number = 0;
  status: string = 'Retrieving Status';
  statusClass: string = '';
  statusDesc: string = '';

  private statusSubscription: Subscription;

  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.socketService.send({ type: 'StatusRequest' });
    this.statusSubscription = this.socketService.onNewMessage().pipe(filter(message => message.type === 'Status')).subscribe(message => {
      console.log('Status received', message.data);

      if(message.data['status'] === 'ready') {
        this.barMode = 'buffer';
        this.barValue = 0;
        this.status = 'Ready';
        this.statusClass = 'status-ready';
        this.statusDesc = 'Pick out a recipe to get started';
      } else if(message.data['status'] === 'producing') {
        this.barMode = 'buffer';
        this.barValue = message.data['progressPct'];
        this.status = `Producing a ${message.data['recipe']}`;
        this.statusClass = 'status-producing';
        this.statusDesc = `Currently pouring ${message.data['ingredient']}`;
      } else {
        this.barMode = 'query';
        this.barValue = 0;
        this.status = 'Error - Could not load current status';
        this.statusClass = 'status-error';
        this.statusDesc = 'Try refreshing the page';
      }
    });
  }

  ngOnDestroy() {
    this.statusSubscription.unsubscribe();
  }
}
