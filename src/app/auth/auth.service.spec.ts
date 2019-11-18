import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../core/services/local-storage.service';
import { AuthorizationService } from '../core/services/authorization.service';
import { HttpClient } from '@angular/common/http';

describe('AuthService', () => {
  // beforeEach(() => TestBed.configureTestingModule({
  //   providers: [AuthService],
  //   imports: [
  //     HttpClientTestingModule,
  //     HttpClient,
  //     Router,
  //     LocalStorageService,
  //     AuthorizationService,
  //     TeamPickerService
  //   ]
  // }));

  // let service: AuthService;
  // beforeEach(() => {
  //   service = TestBed.get(AuthService);
  // });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });

  // it('should get logged-out', () => {
  //   service.logout();
  //   expect(service.getIsAuth()).toBe(false);
  // });
});


// import { TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { AuthService } from './auth.service';

// describe('AuthService', () => {
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [AuthService],
//       imports: [HttpClientTestingModule]
//     });
//   });


//   function setup() {
//     const authService = TestBed.get(AuthService);
//     const httpTestingController = TestBed.get(HttpTestingController);
//     return { authService, httpTestingController };
//   }

//   it('should call the user data', () => {
//     const { authService, httpTestingController } = setup();
//     const mockUserData = {
//       token: 'barb441le5T84eaT741534ec0c9e',
//       is_first_login: false,
//       email: 'yoni.kangun@playermaker.com',
//       first_name: 'Yoni',
//       last_name: 'Kangun',
//       image_url:'https://s3.eu-central-1.amazonaws.com/motionizefootball/dashboard_placeholders/user_img_placeholder.png',
//       role: 1,
//       user_id: 441,
//       features: {
//         loadRisk: true,
//         players: true
//       }
//     };
//     authService.login()
//       .subscribe(data => {
//         expect(data.mapData).toEqual(mockUserData);
//       });

//     const req = httpTestingController.expectOne('https:www.google.com/googleMapData');

//     expect(req.request.method).toBe('GET');

//     req.flush({
//       mapData: mockUserData
//     });
//   });

//   afterEach(() => {
//     const { httpTestingController } = setup();
//     httpTestingController.verify();
//   });
// }))
