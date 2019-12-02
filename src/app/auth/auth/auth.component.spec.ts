import { TestBed, async, ComponentFixture, fakeAsync, flush } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
// import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthComponent } from './auth.component';
import { AuthService } from '../auth.service';
import { AuthModule } from '../auth.module';
import { CoreModule } from 'src/app/core/core.module';
import { TranslationPickerService } from 'src/app/core/services/translation-picker.service';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { DebugElement } from '@angular/core';

xdescribe('AuthComponent', () => {
  let fixture: ComponentFixture<AuthComponent>;
  let component: AuthComponent;
  let debugElement: DebugElement;
  let authService: any;

  beforeEach(async(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getAuthStatusListener']);
    const translationPickerServiceSpy = jasmine.createSpyObj('TranslationPickerService', ['getCurrentTranslation']);
    const authorizationeServiceSpy = jasmine.createSpyObj('AuthorizationService', ['isFeatureEnabled']);

    TestBed.configureTestingModule({
      imports: [
        AuthModule,
        CoreModule
      ],
      providers: [
          {provide: AuthService, useValue: authServiceSpy},
          {provide: TranslationPickerService, useValue: translationPickerServiceSpy},
          {provide: AuthorizationService, useValue: authorizationeServiceSpy}
      ],
      // schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents()
      .then(() => {
          fixture = TestBed.createComponent(AuthComponent);
          component = fixture.componentInstance;
          debugElement = fixture.debugElement;
          authService = TestBed.get(AuthService);
      });
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display only forgot password page', () => {
      // coursesService.findAllCourses.and.returnValue(of(beginnerCourses));
      // fixture.detectChanges();
      // const tabs = el.queryAll(By.css(".mat-tab-label"));
      // expect(tabs.length).toBe(1, "Unexpected number of tabs found");
  });

  it('should display only forgot password page when link is clicked', fakeAsync(() => {
      // const forgotPasswordComponent = debugElement.queryAll(By.css('.forgot-password-container'));
      // click(forgotPasswordComponent[1]);
      // fixture.detectChanges();
      // flush();
      // const pageTitles = debugElement.queryAll(By.css('h3'));
      // expect(pageTitles[0].nativeElement.textContent).toContain('Forgot Your Password?');


      // coursesService.findAllCourses.and.returnValue(of(setupCourses()));
      // fixture.detectChanges();
      // const tabs = el.queryAll(By.css(".mat-tab-label"));
      // click(tabs[1]);
      // fixture.detectChanges();
      // flush();
      // const cardTitles = el.queryAll(By.css('.mat-card-title'));
      // expect(cardTitles.length).toBeGreaterThan(0,"Could not find card titles");
      // expect(cardTitles[0].nativeElement.textContent).toContain("Angular Security Course");
  }));
});

// export const ButtonClickEvents = {
//   left:  { button: 0 },
//   right: { button: 2 }
// };

// function click(el: DebugElement | HTMLElement,
//   eventObj: any = ButtonClickEvents.left): void {

//   if (el instanceof HTMLElement) {
//   el.click();
//   } else {
//   el.triggerEventHandler('click', eventObj);
//   }
// }