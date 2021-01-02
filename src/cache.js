import { InMemoryCache, Reference, makeVar } from '@apollo/client';

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          }
        },
        isLoginModalOpen: {
          read() {
            return isLoginModalOpenVar();
          }
        },
      }
    }
  }
});

export const isLoggedInVar = makeVar(!!localStorage.getItem('token'));
export const isLoginModalOpenVar = makeVar(false);
