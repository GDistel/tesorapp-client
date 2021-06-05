import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopNavService {
  private topNavTitleSubject = new Subject<string>();
  private topNavBackLinkSubject = new Subject<string | null>();

  constructor() { }

  public getTopNavTitleSubject(): Subject<string> {
    return this.topNavTitleSubject;
  }

  public getTopNavBackLinkSubject(): Subject<string | null> {
    return this.topNavBackLinkSubject;
  }
}
