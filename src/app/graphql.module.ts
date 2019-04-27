import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import { environment } from '../environments/environment'
import { ApolloLink } from 'apollo-link';
import { SRUY_AUTH_TOKEN } from './models/constants';
import { HttpHeaders } from '@angular/common/http';

const uri = `${environment.graphqlURL}/graphql`; // <-- add the URL of the GraphQL server here
const middleware = new ApolloLink((operation, forward) => {
  const token = sessionStorage.getItem(SRUY_AUTH_TOKEN);
  if (token) {
    operation.setContext({
      headers: new HttpHeaders().set('Authorization', `${token}`)
    });
  }
  return forward(operation);
});

export function createApollo(httpLink: HttpLink) {
  return {
    link: middleware.concat(httpLink.create({uri})),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
