import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JwtInterceptor } from './http/jwt.interceptor';
import { ErrorHandlerInterceptor } from './http/error-handler.interceptor';
import { TopNavComponent } from './top-nav/top-nav.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [TopNavComponent],
  imports: [HttpClientModule, RouterModule, SharedModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  exports: [HttpClientModule, TopNavComponent]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // This is an import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }
}
