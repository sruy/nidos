import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { MessageService } from 'primeng/api';
import { catchError, map } from 'rxjs/operators';
import { User } from './models/user';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { SRUY_AUTH_TOKEN, SRUY_USER_ID } from '../models/constants';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  static authUser: User;
  backendCreate: string;
  backendLogin: string;
  backendSingle: string;

  constructor(private apollo: Apollo, private router: Router, private messageService: MessageService) {
    this.backendCreate = gql`
mutation createUser($data: UserInput) {
  createUser(data: $data) {
    id
    discordId
    userName
    firstName
    lastName
    jwt
    role {
      id
      discordId
      name
    }
  }
}`;

  this.backendLogin = gql`
query loginUser($userName: String!, $password: String!) {
  loginUser(userName: $userName, password: $password) {
    id
    discordId
    userName
    firstName
    lastName
    jwt
    role {
      id
      discordId
      name
    }
  }
}`;

  this.backendSingle = gql`
query getUser {
  getUser {
    id
    discordId
    userName
    firstName
    lastName
    email
    role {
      id
      discordId
      name
    }
    jwt
  }
}`;
  }

  registerUser(userInput: any, messageService: MessageService) {
    const input = userInput;
    delete input.confirmPassword;

    return this.apollo.mutate({
      mutation: this.backendCreate,
      variables: {
        data: input
      }
    })
    .pipe(catchError((err, inp) => {
      if (!!messageService) {
        messageService.add({ severity: 'error', summary: 'No se pudo completar la operación', detail: err.toString().substr(130) });
      }

      return inp;
    }))
    .pipe(map((result) => {
      if (!messageService) {
        messageService.add({ severity: 'success', summary: 'Operación completada', detail: `Bienvenido ${input.firstName} ${input.lastName}!` });
      }

      const flatten = <User>(<any>(<any>result).data).createUser;

      return flatten;
    }));
  }

  login(loginInput: any, messageService: MessageService) {
    return this.apollo.subscribe({
      query: this.backendLogin,
      variables: {
        userName: loginInput.userName,
        password: loginInput.password
      }
    })
    .pipe(map(result => {
      const flatten = <User>(<any>(<any>result).data).loginUser;

      UsersService.authUser = flatten;
      sessionStorage.setItem(SRUY_USER_ID, flatten.userName);
      sessionStorage.setItem(SRUY_AUTH_TOKEN, flatten.jwt);

      return flatten;
    }))
    .pipe(catchError((error, inp) => {
      const err = error.graphQLErrors && error.graphQLErrors[0] && JSON.parse(error.graphQLErrors[0].message);
      console.error('SRUY: Failed to login user'); // create debug error called SruyException
      
      if (err && (err.errorId === 1  || err.errorId === 2)) {
        this.messageService.add({ severity: 'error', summary: 'No se pudo completar la operación', detail: 'Autenticación fallida' })
      }
      return of({ inp, err });
    }));
  }

  getAuthenticatedUser() {
    return this.apollo.subscribe({
      query: this.backendSingle
    })
    .pipe(map(result => {
      const flatten = <User>(<any>(<any>result).data).getUser;

      return flatten;
    }))
    .pipe(catchError((err, inp) => {
      throw ('SRUY: Failed to get logged in user'); // create debug error called SruyException
      console.error(err);
      return inp;
    }));
  }

  isLogged() {
    const id = sessionStorage.getItem(SRUY_USER_ID);

    return id || !!UsersService.authUser && !!UsersService.authUser.jwt;
  }

  hasAuthorizedRole() {
    return !!UsersService.authUser && !!UsersService.authUser.role && [1,2].lastIndexOf(UsersService.authUser.role.id) !== -1;
  }

  logOut() {
    UsersService.authUser = null;
    sessionStorage.removeItem(SRUY_AUTH_TOKEN);
    sessionStorage.removeItem(SRUY_USER_ID);
    this.router.navigate(['/']);
    return of(true);
  }
}
