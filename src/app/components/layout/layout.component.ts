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

    this.mySocketService.listen('msg-from-server').subscribe((data: string) => {
      this.chatContent = `${this.chatContent} <div class="div-message"> ${data} </div>`;
      this.playMessage();
    });

    // this.mySocketService.listen('status-from-server').subscribe((data: string) => {
    //   clearInterval(this.interval);
    //   this.timeLeft = undefined;
    //   this.time = undefined;
    //   this.status = data;
    //   this.updateBackgroundColor();
    // });

    // this.mySocketService.listen('time-from-server').subscribe((data: string) => {
    //   this.time = data;
    //   clearInterval(this.interval);
    //   this.setTimer();
    // });

    // this.mySocketService.listen('arrived-from-server').subscribe((data: string) => {
    //   this.chatContent = `${this.chatContent} <div class="div-message"> ${data} </div>`;
    //   this.playBabyShark();
    // });

  }


  sendMsg() {
    // this.messages.next(this.message);
    console.log("sendMsg");
    if(this.message){
      this.mySocketService.emit("msg-from-client", `<div><p class="name" > ${this.name || ""}</p><p class="message">${this.message}</p><p class="time"> ${new Date().toString().slice(16, 21)}</p></div>`);
      this.message = undefined;
    }
  }


  // statusChanged() {
  //   this.mySocketService.emit("status-from-client", this.status);
  //   this.updateBackgroundColor();

  // }

  // updateBackgroundColor() {
  //   switch (this.status) {
  //     case "לא מגיעה":
  //       this.backgroundColor = "rgba(255,0,0,0.8)";
  //       this.onTheWay = false;
  //       break;

  //     case "מתלבטת":
  //       this.backgroundColor = "rgba(252,135,0,0.8)";
  //       this.onTheWay = false;
  //       break;

  //     case "החלטתי לבוא":
  //       this.backgroundColor = "rgba(0,203,23,0.8)";
  //       this.onTheWay = false;
  //       break;

  //     case "מתכוננת":
  //       this.backgroundColor = "rgba(211,31,225,0.8)";
  //       this.onTheWay = false;
  //       break;

  //     case "יצאתי":
  //       this.backgroundColor = "rgba(11,0,255,0.8)";
  //       this.onTheWay = true;
  //       break;

  //     default:
  //       this.backgroundColor = "grey";
  //       this.onTheWay = false;
  //   }
  // }


  // timeDeclared() {
  //   this.mySocketService.emit("time-from-client", this.time);
  //   this.setTimer();
  // }

  // setTimer() {

  //   clearInterval(this.interval);
  //   if (!this.time)
  //     return;

  //   let arrivedTime = new Date();
  //   console.log(this.time.slice(0, 3));
  //   console.log(this.time.slice(3, 0));
  //   arrivedTime.setHours(+this.time.slice(0, 2));
  //   arrivedTime.setMinutes(+this.time.slice(3, 6));


  //   // Set the date we're counting down to
  //   var countDownDate = arrivedTime.getTime();

  //   // Update the count down every 1 second
  //   this.interval = setInterval(() => {

  //     // Get today's date and time
  //     var now = new Date().getTime();

  //     // Find the distance between now and the count down date
  //     var distance = countDownDate - now;

  //     // Time calculations for days, hours, minutes and seconds
  //     // var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  //     var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  //     var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)) + hours * 60;
  //     // var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  //     // Display the result in the element with id="demo"
  //     this.timeLeft = minutes + " דקות";

  //     // If the count down is finished, write some text
  //     if (distance < 0) {
  //       clearInterval(this.interval);
  //       this.timeLeft = "0 דקות";
  //     }
  //   }, 1000);
  // }


  // arrived() {
  //   this.mySocketService.emit("arrived-from-client", "הגעתי!");
  //   this.playBabyShark();
  // }



  // scroll() {
  //   try {
  //     const errorField = this.renderer.selectRootElement('.third-class');
  //     errorField.scrollIntoView();
  //   } catch (err) {

  //   }
  // }

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

  // playBabyShark(){
  //   let audio = new Audio();
  //   audio.src = "../../../assets/audio/baby-shark.mp3";
  //   audio.load();
  //   audio.play();
  // }
}
