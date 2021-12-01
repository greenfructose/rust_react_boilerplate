import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'


interface ProfileContextInterface {
  firstName: string | undefined
  lastName: string | undefined
  email: string | undefined
//   setFirstName: (firstName: string | undefined) => void
//   setLastName: (lastName: string | undefined) => void
//   setEmail: (email: string | undefined) => void
}

const context = createContext<ProfileContextInterface | null>(null);

const getProfile = (id: number) => {
    const response = fetch(`/api/profile_service/${id}`)
    const jsonResponse = response.json()
    const profileContext: ProfileContextInterface = {
        firstName: jsonResponse.first_name,
        lastName: jsonResponse.last_name,
        email: jsonResponse.email
    }
    return profileContext
}

export const App = () => (
    <context.Provider value={getProfile()}
)

