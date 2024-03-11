export interface AuthenticationDto {
  email: string;
  password:string;
}
export interface RegisterDto{
  firstName: string;
  lastName: string;
  email: string;
  password:string;
}
export interface UserDto {
  id: string;
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}
export interface AuthenticationResponseDto {
  id: string;
  user: UserDto;
  accessToken: string;
}
export interface AuthenticatedState {
  readonly user: UserDto | null;
  readonly authorizationHeader: string | null;
}



