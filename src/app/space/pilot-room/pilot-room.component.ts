import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Pilot} from "../pilot";

@Component({
  selector: 'app-pilot-room',
  templateUrl: './pilot-room.component.html',
  styleUrls: ['./pilot-room.component.css']
})
export class PilotRoomComponent implements OnInit {
  pilots: Pilot[] = [];
  selectedPilot: Pilot | null = null;
  @Output() selected = new EventEmitter<Pilot | null>();

  ngOnInit() {
    this.pilots.push(new Pilot('Sharon Valerii', '/assets/pilot3.png'));
    this.pilots.push(new Pilot('Karl Agathon'));
  }

  select(pilot: Pilot | null): void {
    this.selectedPilot = pilot;
    this.selected.emit(pilot);
  }

  pilotReturn(pilot: Pilot) {
    this.pilots.push(pilot);
  }

  pilotLeave(pilot: Pilot): void {
    const index = this.pilots.indexOf(pilot);
    this.pilots.splice(index, 1);
    this.select(null);
  }
}
