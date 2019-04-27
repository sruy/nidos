import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.scss']
})
export class TopHeaderComponent implements OnInit {

  constructor(private router: Router, private usersService: UsersService) { }

  get fullUserName() {
    return this.usersService.isLogged() && `${UsersService.authUser && UsersService.authUser.userName }` || ''//`${UsersService.authUser.firstName} ${UsersService.authUser.lastName}` || '';
  }

  get logged() {
    return this.usersService.isLogged();
  }

  ngOnInit() {
    if (this.usersService.isLogged()) {
      this.router.navigate(['/home']);
    }
  }

  goToPublic() {
    this.router.navigate(['/']);
  }

  signOut() {
    this.usersService.logOut().subscribe(() => {

    });
  }

}
