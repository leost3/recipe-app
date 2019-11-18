import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { throwError, Subject, BehaviorSubject } from "rxjs";
import { User } from "./user.model";

export interface AuthResponseData {
  kind?: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {}

  signUp(email: string, password: string, returnSecureToken = true) {
    return this.http
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBwylA-x-3dfWG77YVLzAbxL0IpIhSwWj0",
        {
          email,
          password,
          returnSecureToken
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(({ email, localId, idToken, expiresIn }) => {
          this.handleAuthentication(email, localId, idToken, +expiresIn);
        })
      );
  }

  signIn(email: string, password: string, returnSecureToken = true) {
    return this.http
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBwylA-x-3dfWG77YVLzAbxL0IpIhSwWj0",
        {
          email,
          password,
          returnSecureToken
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(({ email, localId, idToken, expiresIn }) => {
          this.handleAuthentication(email, localId, idToken, +expiresIn);
        })
      );
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = "An unknown error ocurred";
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = "Email exists already";
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage = "Email does not exists already";
        break;
      case "INVALID_PASSWORD":
        errorMessage = "Invalid password";
        break;
    }
    return throwError(errorMessage);
  }
}
