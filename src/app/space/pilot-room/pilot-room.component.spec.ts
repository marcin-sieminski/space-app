import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { Pilot } from '../pilot';
import { PilotService } from '../pilot.service';
import { PilotRoomComponent } from './pilot-room.component';

class PilotServiceMock {
  getPilots() { }
}

@Component({
  selector: 'app-pilot',
  template: 'pilot {{pilot.firstName}} <ng-content></ng-content>'
})
class PilotMockComponent {
  @Input() pilot!: Pilot;
}

fdescribe('PilotRoomComponent', () => {
  let component: PilotRoomComponent;
  let fixture: ComponentFixture<PilotRoomComponent>;
  let pilotService: PilotService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [PilotRoomComponent, PilotMockComponent],
      providers: [{ provide: PilotService, useClass: PilotServiceMock }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    pilotService = TestBed.inject(PilotService);
    fixture = TestBed.createComponent(PilotRoomComponent);
    component = fixture.componentInstance;
  });

  describe('when pilots fetched successfully', () => {
    let pilot: Pilot;

    beforeEach(() => {
      pilot = new Pilot({ id: 1, firstName: 'Mike', lastName: 'Tomsky', imageUrl: '' });
      spyOn(pilotService, 'getPilots').and.returnValue(of([pilot]));
      spyOn(component.selected, 'emit');
      fixture.detectChanges();
    });

    it('should display pilots', () => {
      expect(fixture.nativeElement.textContent).toContain('Mike');
    });

    it('should not have pilot selected', () => {
      expect(component.selectedPilot).toBeNull();
    });

    describe('when pilot is being selected', () => {
      beforeEach(() => {
        const selectButton = fixture.debugElement.query(By.css('.select-button'));
        selectButton.nativeElement.click();
      });

      it('should store selected pilot', () => {
        expect(component.selectedPilot).toBe(pilot);
      });

      it('should emit pilot', () => {
        expect(component.selected.emit).toHaveBeenCalledWith(pilot);
      });
    });

    describe('when pilot is being deselected', () => {
      beforeEach(() => {
        component.selectedPilot = pilot;
        fixture.detectChanges();
        const deselectButton = fixture.debugElement.query(By.css('.deselect-button'));
        deselectButton.nativeElement.click();
      });

      it('should clear selection', () => {
        expect(component.selectedPilot).toBeNull();
      });

      it('should emit null', () => {
        expect(component.selected.emit).toHaveBeenCalledWith(null);
      });
    });
  });

  describe('when pilots fetch failed', () => {
    beforeEach(() => {
      spyOn(pilotService, 'getPilots').and.returnValue(throwError('error'));
      spyOn(window, 'alert');
      fixture.detectChanges();
    });

    it('should display alert with warning', () => {
      expect(window.alert).toHaveBeenCalledWith(jasmine.any(String));
    });
  });
});
