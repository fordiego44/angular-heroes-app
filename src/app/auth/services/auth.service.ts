import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { User } from '../interfaces/user.interface';
import { tap, Observable, of, map, catchError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

  private baseUrl: string = environments.baseUrl;
  private user?: User;

  constructor(private http: HttpClient) { }

  get currentUser(): User | undefined {
    if (!this.user) return undefined;
    return structuredClone( this.user );
  }

  login( email:string, password: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/1`)
            .pipe(
              tap( user => this.user = user ),
              tap( user => localStorage.setItem('token', '34534f53.12d3cd43654.x1235c563') )
            );
  }

  checkAuthentication(): Observable<boolean> {
    if ( !localStorage.getItem('token')) return of(false);

    return this.http.get<User>(`${this.baseUrl}/users/1`)
            .pipe(
              tap( user => this.user = user ),
              map( user=> !!user),
              catchError( err => of(false))
            );
  }

  logout():void {
    this.user = undefined;
    localStorage.clear();
  }



}
