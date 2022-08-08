import {Component, OnInit, ViewChild} from '@angular/core';
import {SpaceShip} from "../space-ship";
import {FighterShip} from "../fighter-ship";
import {BomberShip} from "../bomber-ship";
import {Pilot} from "../pilot";
import {PilotRoomComponent} from "../pilot-room/pilot-room.component";

@Component({
  selector: 'app-hangar',
  templateUrl: './hangar.component.html',
  styleUrls: ['./hangar.component.css']
})
export class HangarComponent implements OnInit {

  spaceShips: SpaceShip[] = [];
  selectedPilot: Pilot | null = null;
  @ViewChild(PilotRoomComponent) pilotRoom!: PilotRoomComponent;

  constructor() { }

  ngOnInit(): void {
    this.spaceShips.push(new FighterShip(new Pilot('Anna A', '/assets/pilot1.jpg')));
    this.spaceShips.push(new BomberShip(new Pilot('Jan K', '/assets/pilot2.png')));
  }

  setSelectedPilot(pilot: Pilot | null) {
    this.selectedPilot = pilot;
  }

  deassignPilot(spaceShip: SpaceShip) {
    if (!spaceShip.pilot) { return; }
    this.pilotRoom.pilotReturn(spaceShip.pilot);
    spaceShip.pilot = undefined;
  }

  assignPilot(spaceShip: SpaceShip): void {
    if (!this.selectedPilot) { return; }
    spaceShip.pilot = this.selectedPilot;
    this.pilotRoom.pilotLeave(this.selectedPilot);
  }
}
