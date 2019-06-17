import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';
import * as socketIo from 'socket.io-client';
import { environment } from '@environments/environment';
import { UserAuth } from '@app/core/model/userAuth';

// Socket.io events
export enum Event {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
}

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket;
  public socketState = new Subject<boolean>();
  private readonly baseEndpoint = environment.domain_server;

  constructor() {}

  get getSocket() {
    return this.socket;
  }

  public initSocket(): void {
    this.socket = socketIo(this.baseEndpoint);
  }

  /**
   * Send message IO
   */
  public send(message: any, channel: string): void {
    this.socket.emit(channel, message);
  }

  /**
   * Get message IO
   */
  public onMessage(channel: string): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(channel, (data: any) => {
        observer.next(data);
      });
    });
  }

  /**
   * Get once message IO
   */
  public onceMessage(channel: string): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.once(channel, (data: any) => {
        observer.next(data);
      });
    });
  }

  public onEvent(event: any): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }

  public initSocketRoom() {
    if (!this.getSocket) {
      this.initSocket();
      this.onEvent(Event.CONNECT).subscribe(() => {
        console.log('connected');
        this.socketState.next(true);
      });
    }

    this.onEvent(Event.DISCONNECT).subscribe(() => {
      console.log('disconnected');
      this.socketState.next(false);
    });
  }
}
