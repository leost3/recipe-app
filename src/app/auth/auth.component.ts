import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService, AuthResponseData } from "./auth.service";
import { NgForm } from "@angular/forms";
import { Component, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"]
})
export class AuthComponent implements OnInit {
  constructor(
    private authService: AuthService,
    route: ActivatedRoute,
    private router: Router
  ) {}

  @ViewChild("authForm", { static: false }) form: NgForm;
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  ngOnInit() {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (!this.isLoginMode) {
      authObs = this.authService.signUp(email, password);
    } else {
      authObs = this.authService.signIn(email, password);
    }

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.router.navigate(["/"]);
        this.isLoading = false;
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
    form.reset();
  }
}
