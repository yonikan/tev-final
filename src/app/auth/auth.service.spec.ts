import { TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../core/services/local-storage.service';
import { AuthorizationService } from '../core/services/authorization.service';
import { MatDialog } from '@angular/material';
import { TeamPickerService } from '../core/services/team-picker.service';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;
  let routerSpy: any;
  let localStorageServiceSpy: any;
  let authorizationServiceSpy: any;
  let dialogSpy: any;
  let teamPickerServiceSpy: any;

  const LOGIN_DATA = {
    email: 'yossi@playermaker.com',
    features: {loadRisk: false, performanceOvertime: false, leaderBoard: false},
    first_name: 'yossi',
    image_url: 'https://s3.eu-central-1.amazonaws.com/motionizefootball/dashboard_placeholders/user_img_placeholder.png',
    is_first_login: false,
    last_name: 'cohen',
    role: 1,
    token: 'barb441le5T84eaT741534ec0c9e',
    user_id: 441
  };

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['']);
    localStorageServiceSpy = jasmine.createSpyObj('LocalStorageService', ['']);
    authorizationServiceSpy = jasmine.createSpyObj('AuthorizationService', ['']);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['']);
    teamPickerServiceSpy = jasmine.createSpyObj('TeamPickerService', ['']);

    TestBed.configureTestingModule({
      imports: [
          HttpClientTestingModule
      ],
      providers: [
        AuthService,
        {provide: Router, useValue: routerSpy},
        {provide: LocalStorageService, useValue: localStorageServiceSpy},
        {provide: AuthorizationService, useValue: authorizationServiceSpy},
        {provide: MatDialog, useValue: dialogSpy},
        {provide: TeamPickerService, useValue: teamPickerServiceSpy}
      ]
    });

    authService = TestBed.get(AuthService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  // ====================================================================

  it('should retrieve the user login data', () => {
    authService.fetchUserLoginData('yossi@bla.com', 'yossibla')
      .subscribe(userLoginDataResponse => {
          expect(userLoginDataResponse).toBeTruthy('No login data returned');
      });

    const req = httpTestingController.expectOne('/api/login');
    expect(req.request.method).toEqual('POST');
    req.flush({payload: LOGIN_DATA});
  });

  it('should give an error if retrieving user login data fails', () => {
    authService.fetchUserLoginData('yossi@bla.com', 'yossibla')
      .subscribe(
          () => {
             fail('retrieving user login data should have failed')
          },
          (error: HttpErrorResponse) => {
            expect(error.status).toBe(401);
          }
      );

    const req = httpTestingController.expectOne('/api/login');
    expect(req.request.method).toEqual('POST');
    req.flush('Retrieve the user login failed', {status: 401, statusText: 'user doesnt exists.'});
  });

  // ====================================================================

  it('should retrieve the user forgot password data', () => {
    authService.postForgotPassword('yossi@bla.com')
      .subscribe(userLoginDataResponse => {
          expect(userLoginDataResponse).toBeTruthy('No login data returned');
      });

    const req = httpTestingController.expectOne('/api/forgot-password');
    expect(req.request.method).toEqual('POST');
    req.flush({payload: LOGIN_DATA});
  });

  it('should give an error if retrieving user forgot password fails', () => {
    authService.postForgotPassword('yossi@bla.com')
      .subscribe(
          () => {
             fail('retrieving user login data should have failed')
          },
          (error: HttpErrorResponse) => {
            expect(error.status).toBe(401);
          }
      );

    const req = httpTestingController.expectOne('/api/forgot-password');
    expect(req.request.method).toEqual('POST');
    req.flush('Retrieve the user login failed', {status: 401, statusText: 'an error'});
  });

  // ====================================================================

  it('should retrieve the user reset password data', () => {
    authService.putResetPassword('yossibla', 'yossibla')
      .subscribe(userLoginDataResponse => {
          expect(userLoginDataResponse).toBeTruthy('No login data returned');
      });

    const req = httpTestingController.expectOne('/api/reset-password');
    expect(req.request.method).toEqual('PUT');
    req.flush({payload: LOGIN_DATA});
  });

  it('should give an error if retrieving user reset password fails', () => {
    authService.putResetPassword('yossibla', 'yossibla')
      .subscribe(
          () => {
             fail('retrieving user login data should have failed')
          },
          (error: HttpErrorResponse) => {
            expect(error.status).toBe(401);
          }
      );

    const req = httpTestingController.expectOne('/api/reset-password');
    expect(req.request.method).toEqual('PUT');
    req.flush('Retrieve the user login failed', {status: 401, statusText: 'an error'});
  });

  // ====================================================================

  afterEach(() => {
    httpTestingController.verify();
  });
});
