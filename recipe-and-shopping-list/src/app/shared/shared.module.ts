import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DropdownGlobalDirective } from "../directives/dropdown-global.directive";
import { DropdownDirective } from "../directives/dropdown.directive";
import { AlertComponent } from "./alert/alert.component";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    DropdownGlobalDirective,
    DropdownDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    DropdownGlobalDirective,
    DropdownDirective,
    CommonModule,
  ],
})
export class SharedModule {

}