import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

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
      .pipe(catchError(this.handleError));
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
      .pipe(catchError(this.handleError));
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
