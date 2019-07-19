import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SocketService } from '../socket.service';
import { PumpService, Pump } from '../pump.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-configuration-pumps',
  templateUrl: './configuration-pumps.component.html',
  styleUrls: ['./configuration-pumps.component.scss']
})
export class ConfigurationPumpsComponent implements OnInit, OnDestroy {

  pumps: Pump[] = [];
  displayedColumns: string[] = ['name', 'pin', 'ingredient', 'actions'];

  private statusSubscription: Subscription;
  constructor(private socketService: SocketService, private pumpService: PumpService) { }

  ngOnInit() {
    this.socketService.send({ type: 'PumpsListRequest' });
    this.statusSubscription = this.socketService.onNewMessage().pipe(filter(message => message.type === 'PumpsList')).subscribe(message => {
      this.pumps = message.data['pumps'];
    });
  }

  ngOnDestroy() {
    this.statusSubscription.unsubscribe();
  }
}
