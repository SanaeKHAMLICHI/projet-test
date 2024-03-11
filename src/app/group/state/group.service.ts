import {inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GroupDto, NewGroupDto} from "./group.model";
import {environment} from "../../environments/environments";
import {TeamDto} from "../../teams/state/teams.model";

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private http = inject(HttpClient);
  private readonly groupsBaseUrl = `${environment.apiUrl}/groups`;

  addGroup(libelleGroup: string | null | undefined): Observable<GroupDto> {
    return this.http.post<GroupDto>(this.groupsBaseUrl, { libelle: libelleGroup });
  }
  editGroup(newGroup: NewGroupDto, groupId: string | undefined): Observable<GroupDto> {
    return this.http.put<GroupDto>(`${this.groupsBaseUrl}/${groupId}`, newGroup);
  }
  getGroups(): Observable<GroupDto[]> {
    return this.http.get<GroupDto[]>(this.groupsBaseUrl);
  }
  deleteGroup(groupId:string){
    return this.http.delete(`${this.groupsBaseUrl}/${groupId}`);
  }
}
