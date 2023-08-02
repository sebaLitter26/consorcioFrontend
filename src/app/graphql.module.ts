import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { ApolloClientOptions, ApolloLink, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { onError } from '@apollo/client/link/error';
import { environment } from 'src/environments/environment';

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      console.log('GraphQL Error', graphQLErrors);
    }

    if (networkError) {
      console.log('Network Error', networkError);
    }
  });
  const http = ApolloLink.from([errorLink, httpLink.create({ uri: `${environment.apiUrl}` })]);
  return {
    link: http,
    cache: new InMemoryCache(),
  };
}

@NgModule({
  imports: [HttpClientModule, ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
