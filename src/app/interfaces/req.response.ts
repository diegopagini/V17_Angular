export interface UsersResponse {
  data: User[];
  page: number;
  per_page: number;
  support: Support;
  total_pages: number;
  total: number;
}

export interface User {
  avatar: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
}

export interface Support {
  text: string;
  url: string;
}

export interface UserResponse {
  data: User;
  support: Support;
}
