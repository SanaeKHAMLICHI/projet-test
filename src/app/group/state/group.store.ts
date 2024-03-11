import { createStore, withProps } from '@ngneat/elf';
import { withEntities } from '@ngneat/elf-entities';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';
import {GroupDto, GroupState} from "./group.model";
import {AuthenticatedState} from "../../auth/state/auth.model";
import {authStore} from "../../auth/state/auth.store";

export const GROUPS_STORE_NAME = 'groups';

export const groupStore = createStore(
  { name: GROUPS_STORE_NAME },
  withProps<GroupState>({ entities: {}, ids: [] , groups:[]})
);

persistState(groupStore, {
  key: 'groups',
  storage: localStorageStrategy,
});

export function getGroupState() {
  return groupStore.getValue();
}
