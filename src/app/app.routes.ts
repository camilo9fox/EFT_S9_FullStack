import { Routes } from '@angular/router';
import { HomePageComponent } from './store/pages/HomePage/HomePage.component';
import { StorePageComponent } from './store/pages/StorePage/StorePage.component';
import { AboutUsPageComponent } from './store/pages/AboutUsPage/AboutUsPage.component';
import { LoginPageComponent } from './login/pages/LoginPage/LoginPage.component';
import { RegisterPageComponent } from './login/pages/RegisterPage/RegisterPage.component';
import { RecoveryPasswordPageComponent } from './login/pages/RecoveryPasswordPage/RecoveryPasswordPage.component';
import { AuthGuard } from './login/guards/Auth.guard';
import { MyProfilePageComponent } from './store/pages/MyProfilePage/MyProfilePage.component';
import { OrderComponent } from './store/pages/Order/Order.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'tienda', component: StorePageComponent },
  { path: 'nosotros', component: AboutUsPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'registro', component: RegisterPageComponent },
  { path: 'recuperar-contraseña', component: RecoveryPasswordPageComponent },
  { path: 'pedido', component: OrderComponent },
  {
    path: 'mi-perfil',
    component: MyProfilePageComponent,
    canActivate: [AuthGuard],
  },
];
