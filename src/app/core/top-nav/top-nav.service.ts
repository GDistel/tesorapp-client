import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopNavService {
  private topNavTitleSubject = new Subject<string>();

  constructor() { }

  public getTopNavTitleSubject(): Subject<string> {
    return this.topNavTitleSubject;
  }
}
