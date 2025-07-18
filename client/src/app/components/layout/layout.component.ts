import { SocketService } from './../../services/socket.service';
import { Component, OnInit, Renderer2, ElementRef, ViewChild, AfterViewChecked, HostBinding, Input } from '@angular/core';

import { Subject } from 'rxjs';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;


  public chatContent: string;
  public name: string;
  public message: string;
  public connections: number;
  public isTyping: number = 0;

  @HostBinding("style.--randomTextColor")
  @Input() randomTextColor = "#" + Math.floor(Math.random() * 16777215).toString(16);


  constructor
    (private mySocketService: SocketService, private renderer: Renderer2) {
    this.chatContent = "";
  }

  ngOnInit(): void {

    this.mySocketService.listen('chat-messages-from-server').subscribe((data: string) => {
      this.chatContent = `${data}`;
    });


    this.mySocketService.listen('someone-is-typing-from-server').subscribe(() => {
      this.isTyping=1;
    });

    this.mySocketService.listen('someone-stopped-typing-from-server').subscribe(() => {
      this.isTyping=0;
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
    console.log("sendMsg");
    if (this.message) {
      this.mySocketService.emit("msg-from-client", `<div class="div-message"><div><p class="name" style='color: ${this.randomTextColor}'}"> ${this.name || ""}</p><p class="message">${this.message}</p><p class="time"> ${new Date().toString().slice(16, 21)}</p></div></div>`);
      this.mySocketService.emit("someone-stopped-typing-from-client", null);
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
    } catch (err) {
      console.log(err);
    }
  }

  playMessage() {
    let audio = new Audio();
    audio.src = "../../../assets/audio/message.mp3";
    audio.load();
    audio.play();
  }

  changed() {
    if (this.message.length>0) {
      this.mySocketService.emit("someone-is-typing-from-client", null);
    }
    else if(this.message.length==0){
      this.mySocketService.emit("someone-stopped-typing-from-client", null);
    }

    console.log("changed");
  }

}
