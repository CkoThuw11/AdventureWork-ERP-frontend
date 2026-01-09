/**
 * API Response Interfaces
 * 
 * This file defines interfaces for API responses.
 * These match the backend DTOs.
 */

export interface UserDto {
  id: number;
  email: string;
  username: string;
  full_name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateUserCommand {
  email: string;
  username: string;
  full_name: string;
}

export interface UpdateUserCommand {
  full_name?: string;
}

export interface ApiError {
  error: string;
  message: string;
}
