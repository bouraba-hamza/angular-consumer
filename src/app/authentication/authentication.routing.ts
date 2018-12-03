import { Routes } from '@angular/router';

import { ForgotComponent } from './forgot/forgot.component';
// import {LockScreenComponent} from './lock-screen/lock-screen.component';

export const
    AuthenticationRoutes: Routes = [
  {
        path: '',
        loadChildren: './login/login.module#LoginModule',
        data: {
          breadcrumb: 'Login'
        }
      },
      {
        path: 'forgot',
        component: ForgotComponent,
        data: {
          breadcrumb: 'Forgot'
        }
      },

];
