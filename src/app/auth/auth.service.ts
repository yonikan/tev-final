import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from '../core/services/local-storage.service';
import { AuthorizationService } from '../core/services/authorization.service';
import { TeamPickerService } from '../core/services/team-picker.service';
import { MatDialog } from '@angular/material';
import { ModalComponent } from '../shared/modal/modal.component';
import { UserLogin } from './user-login.model';
import { map } from 'rxjs/operators';
import { ServerEnvService } from '../core/services/server-env.service';

@Injectable({
   providedIn: 'root' 
})
export class AuthService {
  private token = null;
  private isAuthenticated = false;
  private authStatusListener = new BehaviorSubject<boolean>(false);
  private userLoginData: UserLogin;
  private userLoginDataListener = new BehaviorSubject<any>({});

  constructor(
    private http: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService,
    private authorizationService: AuthorizationService,
    private dialog: MatDialog,
    private serverEnvService: ServerEnvService,
    public teamPickerService: TeamPickerService
  ) {}

  getToken(): string {
    return this.token;
  }

  getIsAuth(): boolean {
    return this.isAuthenticated;
  }

  getAuthStatusListener(): Observable<boolean> {
    return this.authStatusListener.asObservable();
  }

  setIsAuth(isAuthenticated) {
    this.isAuthenticated = isAuthenticated;
    this.authStatusListener.next(isAuthenticated);
  }

  getUserLoginData(): UserLogin {
    return this.userLoginData;
  }

  getUserLoginDataListener(): Observable<UserLogin> {
    return this.userLoginDataListener.asObservable();
  }

  fetchUserLoginData(email: string, password: string): Observable<UserLogin> {
    const PATH = this.serverEnvService.getBaseUrl();
    return this.http.get<any>(`${PATH}/login`);
    // return this.http.get<any>('./assets/mocks/login-mock.json');
    // const userData = {
    //   email,
    //   password
    // };
    // return this.http.post<any>('./assets/mocks/login-mock.json', userData)
  }


  // const authData: AuthData = { email: email, password: password };
  // const modifiedWithImg = {
  //   email: email,
  //   password: password,
  //   imagePath: './assets/img/shiba.jpg'
  // };

  // this.http.post(BACKEND_URL + '/signup', modifiedWithImg)
  //   .subscribe(
  //     (userData) => {
  //       this.router.navigate(['/home']);
  //     },
  //     error => {
  //       this.authStatusListener.next(false);
  //     }
  //   );



  login(email: string, password: string) {
    this.fetchUserLoginData(email, password)
      .pipe(
        map((loginData: any) => loginData.payload),
      )
      .subscribe(
        (userLoginDataResponse: UserLogin) => {
          if (userLoginDataResponse.token) {
            this.userLoginData = userLoginDataResponse;
            this.userLoginDataListener.next(userLoginDataResponse);
            this.authorizationService.allowedFeatures = userLoginDataResponse.features;

            if (this.localStorageService.getOnLocalStorage('selected_team')) {
              this.teamPickerService.setCurrentTeam(this.localStorageService.getOnLocalStorage('selected_team'));
            } else {
              this.teamPickerService.setCurrentTeam(this.teamPickerService.getCurrentTeam());
            }

            this.token = userLoginDataResponse.token;
            this.localStorageService.storeOnCookie('token', this.token);
            this.isAuthenticated = true;
            this.authStatusListener.next(true);
            this.router.navigate(['/team-overview']);
          }
        },
        (error) => {
          console.log('error: ', error);
          if(error.status === 500) {
            console.log('Server error');
          } else {
            console.log('Client error');
          }
          
          const modalTitle = 'Error!!!';
          let modalMessage = 'An unknown error occurred!';
          if (error.error.message) {
            modalMessage = error.error.message;
          }
          this.dialog.open(ModalComponent, {
            width: '500px',
            height: '200px',
            data: { 
              title: modalTitle,
              message: modalMessage
            }
          });

          this.isAuthenticated = false;
          this.authStatusListener.next(false);
        }
      );
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['login']);
  }

  forgotPassword(email: string) {
    console.log('Forgot Password works!');
  }

  resetPassword(password: string, repeatPassword: string) {
    console.log('Reset Password works!');
  }
}
