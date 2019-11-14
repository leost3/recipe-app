import { Injectable } from "@angular/core";
import { reject } from "q";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  loggedIn = false;

  isAuthenticated() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.loggedIn);
      }, 800);
    });

    return promise;
  }

  login() {
    this.loggedIn = true;
  }
  logOut() {
    this.loggedIn = false;
  }
  constructor() {}
}
