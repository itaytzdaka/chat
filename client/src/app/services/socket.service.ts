// import * as io from 'socket.io-client';
import { Injectable } from '@angular/core';
import io from 'socket.io-client';
// import {io} from 'socket.io-client';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: any;
  private chatContent;
  readonly uri: string = environment.sockerUri;
  constructor() {
    console.log("constructor")
    this.socket = io(this.uri);


    //*** */


  }



  public listen(eventName: string) {

    console.log("listen function start");

    return new Observable((subscriber)=>{
      this.socket.on(eventName, (data) => {
        console.log("listen event from server");
        // console.log(data);
        subscriber.next(data);
      })
    })


    // this.socket.on("connect", () => {
    //   console.log("connect " + this.socket.id); 
    // });

    // this.socket.on("disconnect", () => {
    //   console.log("disconnect " + this.socket.id); 
    // });

    // this.socket.on('connect_failed', function () {
    //   console.log("Sorry, there seems to be an issue with the connection!");
    // })

    // console.log(this.socket);
  }

  public emit(eventName: string, data: any) {
    console.log("emit");
    // console.log(data);
    this.socket.emit(eventName, data);

  }

  // public connect() {

  //   this.socket = io("http://localhost:3000");
  //   this.socket.on("msg-from-server", msg => {
  //     console.log("msg-from-server");
  //     this.chatContent = this.chatContent + " " + msg;
  //   });
  // }

  // public send(newMessage) {
  //   console.log("send");
  //   // Sending something to a specific event on server side: 
  //   this.socket.emit("msg-from-client", newMessage);
  //   console.log("after commit");

  // }


  //   this.socket = io("http://localhost:3000");

  //   let observable = new Observable(observer => {
  //     this.socket.on('message', (data) => {
  //       console.log('Received message from Websocket Server');
  //       observer.next(data);
  //     });

  //     return () => {
  //       this.socket.disconnect();
  //     }
  //   });

  //   let observer = {
  //     next: (data: Object) => {
  //       this.socket.emit('message', JSON.stringify(data));
  //     },
  //   };

  //   // we return our Rx.Subject which is a combination
  //   // of both an observer and observable.
  //   return Subject.create(observer, observable);



}





