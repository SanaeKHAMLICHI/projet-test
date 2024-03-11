import {addEntities, withEntities} from "@ngneat/elf-entities";
import {AuthenticatedState, AuthenticationResponseDto, UserDto} from "./auth.model";
import { createStore, select, setProps, withProps } from '@ngneat/elf';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';
import {
  createRequestsStatusOperator,
  withRequestsStatus,
} from '@ngneat/elf-requests';
export const AUTHENTICATED_STORE_NAME = 'authenticated';

export const USERS_STORE_NAME = 'user';

export const authStore = createStore(
  {
    name: AUTHENTICATED_STORE_NAME,
  },
  withProps<AuthenticatedState>({
    user: null,
    authorizationHeader: null,
  }),
  withRequestsStatus(),

);
export const trackAuthedRequestsStatus =
  createRequestsStatusOperator(authStore);

persistState(authStore, {
  key: 'top-authed',
  storage: localStorageStrategy,
});
export function getState(): AuthenticatedState {
  return authStore.getValue();
}



