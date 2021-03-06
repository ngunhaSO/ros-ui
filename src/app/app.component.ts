import {Component, OnInit} from '@angular/core';
import {RosService} from './services/RosService';
import {Pose} from './models/Pose';
import {Twist} from './models/Twist';
import {BumperEvent} from './models/BumperEvent';
import {Orientation} from './models/Orientation';
import {Point} from './models/Point';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  velocity: Twist;
  position: Pose;
  bumper: BumperEvent;

  constructor(private ros: RosService) {

  }

  ngOnInit(): void {
    this.initValues();
    this.ros.getVelocityObservable().subscribe(data => this.velocity = data);
    this.ros.getPoseObservable().subscribe(data => this.position = data);
    this.ros.getBumperObservable().subscribe(data => this.bumper = data);
  }

  initValues(): void {
    this.velocity = new Twist(null, null);
    this.position = new Pose(new Orientation(null, null, null, null), new Point(null, null, null));
    this.bumper = new BumperEvent(null, null);
  }
}
