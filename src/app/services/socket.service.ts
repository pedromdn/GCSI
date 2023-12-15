import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  constructor(private socket: Socket) { }

  listen(eventName: string) {
    return this.socket.fromEvent(eventName);
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
}
