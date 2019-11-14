import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthComponent } from './auth.component';
import { AuthService } from '../auth.service';

describe('AuthComponent', () => {
  let fixture: ComponentFixture<AuthComponent>;
  let debugElement: DebugElement;
  let authService: AuthService;
  let getIsAuthSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AuthComponent
      ],
      providers: [ AuthService ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    debugElement = fixture.debugElement;

    authService = debugElement.injector.get(AuthService);
    getIsAuthSpy =
      spyOn(authService, 'getIsAuth').and.returnValue(true);
  }));

  // it(`should show signed in to true`, () => {    
  //   fixture.detectChanges();
  //   const message = true;

  //   expect(message).toEqual(true);
  // });
});
