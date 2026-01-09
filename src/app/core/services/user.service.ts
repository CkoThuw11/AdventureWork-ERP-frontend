/**
 * User Service
 * 
 * This service handles all user-related HTTP operations.
 * Components should NOT know about HTTP - they only interact with this service.
 */

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateUserCommand, UpdateUserCommand, UserDto } from '../models/api-response.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/users`;

  /**
   * Get all users
   */
  getUsers(skip = 0, limit = 100): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(this.baseUrl, {
      params: { skip: skip.toString(), limit: limit.toString() }
    });
  }

  /**
   * Get a user by ID
   */
  getUserById(id: number): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.baseUrl}/${id}`);
  }

  /**
   * Create a new user
   */
  createUser(command: CreateUserCommand): Observable<UserDto> {
    return this.http.post<UserDto>(this.baseUrl, command);
  }

  /**
   * Update a user
   */
  updateUser(id: number, command: UpdateUserCommand): Observable<UserDto> {
    return this.http.patch<UserDto>(`${this.baseUrl}/${id}`, command);
  }

  /**
   * Deactivate a user
   */
  deactivateUser(id: number): Observable<UserDto> {
    return this.http.post<UserDto>(`${this.baseUrl}/${id}/deactivate`, {});
  }
}
