import { SocketService } from './../../services/socket.service';
import { Component, OnInit, Renderer2, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';

import { Subject } from 'rxjs';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit ,AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  // public backgroundColor: string;
  // public status: string;
  public time: string;
  // public timeLeft: string;
  public chatContent: string;
  public name: string;
  public message: string;
  public connections: number;
  // public onTheWay: boolean;
  public interval;

  constructor
    (private mySocketService: SocketService, private renderer: Renderer2) {
    this.chatContent = "";
    // this.status = "אין";
    // this.backgroundColor = "grey";
    // this.onTheWay = false;
  }

  ngOnInit(): void {

    this.mySocketService.listen('chat-messages-from-server').subscribe((data: string) => {
      this.chatContent = `${data}`;
    });

    this.mySocketService.listen('chat-sockets-from-server').subscribe((data: number) => {
      this.connections = data;
    });

    this.mySocketService.listen('msg-from-server').subscribe((data: string) => {
      this.chatContent = `${this.chatContent}${data} `;
      this.playMessage();
    });
  }


  sendMsg() {
    // this.messages.next(this.message);
    console.log("sendMsg");
    if(this.message){
      this.mySocketService.emit("msg-from-client", `<div class="div-message"><div><p class="name" > ${this.name || ""}</p><p class="message">${this.message}</p><p class="time"> ${new Date().toString().slice(16, 21)}</p></div></div>`);
      this.message = undefined;
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    console.log("scroll");
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  playMessage(){
    let audio = new Audio();
    audio.src = "../../../assets/audio/message.mp3";
    audio.load();
    audio.play();
  }

}
