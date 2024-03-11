export interface GroupDto {
  _id:string;
  libelle: string;
}


export interface NewGroupDto {
  libelle: string;
}
export interface UpdateGroupDto {
  libelle: string;
}
export  interface GroupState {
  entities: { [id: string]: GroupDto };
  ids: string[];
  groups: GroupDto[]
}

export interface GetGroupsDto {
  groups: GroupDto[];
}
