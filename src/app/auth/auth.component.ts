import { PlaceholderDirective } from "./../shared/placeholder/placeholder.directive";
import { AlertComponent } from "./../shared/alert/alert/alert.component";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AuthService, AuthResponseData } from "./auth.service";
import { NgForm } from "@angular/forms";
import {
  Component,
  OnInit,
  ViewChild,
  ComponentFactoryResolver,
  OnDestroy
} from "@angular/core";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"]
})
export class AuthComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  @ViewChild("authForm", { static: false }) form: NgForm;

  defaultEmail = "leost3@gmail.com";
  defaultPassword = "123123";
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;
  ngOnInit() {}

  private closeSub: Subscription;

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
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      }
    );
    form.reset();
  }

  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(message: string) {
    // const alertComponent = new AlertComponent();
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );

    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(
      alertComponentFactory
    );

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}
