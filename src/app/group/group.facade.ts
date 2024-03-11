import { Injectable } from '@angular/core';
import {EMPTY, Observable, tap} from "rxjs";
import {GroupService} from "./state/group.service";
import {getGroupState, groupStore} from "./state/group.store";
import {setEntities, updateEntities} from "@ngneat/elf-entities";
import {catchError} from "rxjs/operators";
import { GroupDto, UpdateGroupDto} from "./state/group.model";
import {authStore} from "../auth/state/auth.store";


@Injectable({
  providedIn: 'root'
})
export class GroupFacade{

  constructor(private groupService :GroupService) { }
  getGroups(){
    return this.groupService.getGroups().pipe(
      tap((groups) => {
        groupStore.update(
          (state) => ({
            ...state, groups
          }),
        );

        console.log("groups state" , getGroupState())
      })
      /*tap((groups) => {
        console.log("groups" , groups)

        groupStore.update(
        setEntities((groups as GroupDto[]))
      );
        console.log("groups state facade submit " , getGroupState().groups)

      })*/,
      catchError(() => {
        console.log('une erreur est survenue');
        return EMPTY;
      }),
    );
  }

  updateGroup(updateGroup: UpdateGroupDto, groupId: string | undefined) {
    return this.groupService.editGroup(updateGroup, groupId).pipe(
      tap((group) => {
        groupStore.update((state) => {
          const groupIndex = state.groups.findIndex((existingGroup) => existingGroup._id === group._id);
          if (groupIndex !== -1) {
            state.groups[groupIndex].libelle = group.libelle;
          }
          return { ...state };
        });

        console.log("groups state facad update" , getGroupState().groups)
      }),
      catchError(() => {
        console.log('une erreur est survenue');
        return EMPTY;
      }),
    );
  }


  deleteGroup(groupId:string){
    return this.groupService.deleteGroup(groupId).pipe(
      tap((group) => {
        groupStore.update((state) => {
          const updatedGroups = state.groups.filter((existingGroup) => existingGroup._id !== groupId);
          return { ...state, groups: updatedGroups };
        });

        console.log("groups state facad supprime" , getGroupState().groups)
      }),
      catchError(() => {
        console.log('une erreur est survenue');
        return EMPTY;
      }),
    );
  }
}
