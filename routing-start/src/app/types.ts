import { UrlTree } from "@angular/router";
import { Observable } from "rxjs";

export type CanDeactivateOutputTypes = Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;

export type Server = {
  id: number,
  name: string,
  status: string,
}