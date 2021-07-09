import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { AppComponent } from './app.component';
import { CoreModule } from './core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  const routerEvent$ = new BehaviorSubject<RouterEvent>({id: 0, url: ''});
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CoreModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should hide the top navigation when the router navigates to the sign-in screen', () => {
    let topNavElem: DebugElement;
    router = TestBed.inject(Router);
    (<any>router).events = routerEvent$.asObservable();
    expect(component.hideTopNav).toBeFalse();
    topNavElem = getTopNavElem(fixture.debugElement);
    expect(topNavElem.nativeElement.getAttribute('hidden')).toBe(null);
    routerEvent$.next(new NavigationEnd(1, '/expenses-lists', ''));
    routerEvent$.next(new NavigationEnd(2, '/signin', ''));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.hideTopNav).toBeTrue();
    topNavElem = getTopNavElem(fixture.debugElement);
    expect(topNavElem.nativeElement.getAttribute('hidden')).toBe('');
  });
});

function getTopNavElem(rootDebugElem: DebugElement): DebugElement {
  return rootDebugElem.query(By.css('app-top-nav'));
}
