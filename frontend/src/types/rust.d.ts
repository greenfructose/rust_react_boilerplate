/* This file is generated and managed by tsync */

type ID = number

type UTC = Date

interface PaginationParams {
  page: number
  page_size: number
}

interface Permission {
  from_role: string
  permission: string
}

interface RolePermission {
  role: string
  permission: string
  created_at: UTC
}

interface UserPermission {
  user_id: ID
  permission: string
  created_at: UTC
}

interface UserRole {
  user_id: ID
  role: string
  created_at: UTC
}

interface Profile {
  id: ID
  user_id: ID
  first_name: string
  last_name: string
  email: string
}

interface ProfileChangeset {
  user_id: ID
  first_name: string
  last_name: string
  email: string
}

interface Todo {
  id: ID
  text: string
  created_at: UTC
  updated_at: UTC
}

interface TodoChangeset {
  text: string
}

interface User {
  id: ID
  first_name: string
  last_name: string
  email: string
  hash_password: string
  activated: boolean
  created_at: UTC
  updated_at: UTC
}

interface UserChangeset {
  first_name: string
  last_name: string
  email: string
  hash_password: string
  activated: boolean
}

interface UserSession {
  id: ID
  user_id: ID
  refresh_token: string
  device: string | undefined
  created_at: UTC
  updated_at: UTC
}

interface UserSessionChangeset {
  user_id: ID
  refresh_token: string
  device: string | undefined
}

interface UserSessionJson {
  id: ID
  device: string | undefined
  created_at: UTC
  updated_at: UTC
}

interface UserSessionResponse {
  sessions: Array<UserSessionJson>
  num_pages: number
}

interface AccessTokenClaims {
  exp: number
  sub: ID
  token_type: string
  permissions: Array<Permission>
}

interface ProfileJson {
  text: string
}

interface Todo {
  id: number
  text: string
  created_at: Date
  updated_at: Date
}

interface TodoJson {
  text: string
}
