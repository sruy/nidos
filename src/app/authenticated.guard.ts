import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';
import { UsersService } from './users/users.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {
    constructor(private usersService: UsersService, private router: Router) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.usersService.isLogged() || !this.usersService.hasAuthorizedRole()) {
            if (next.routeConfig.path === 'home') {
                this.router.navigate(['/']);
                return false;
            }
            
            return this.router.parseUrl('/notAuthorized');
        } else {
            return true;
        }
    }
}