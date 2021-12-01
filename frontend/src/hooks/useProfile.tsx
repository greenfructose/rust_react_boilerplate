import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'


interface ProfileContextInterface {
  first_name: string
  last_name: string
  email: string
//   setFirstName: (firstName: string | undefined) => void
//   setLastName: (lastName: string | undefined) => void
//   setEmail: (email: string | undefined) => void
}

const errorContext = {
    first_name: 'Error',
    last_name: 'Error',
    email: 'Error'
}

export let ProfileContext = createContext(errorContext);



export const useProfile = (user_id: number) => {
    fetch(`/api/profile/${user_id}`)
    .then((response) => response.json())
    .then((profile) => {
        ProfileContext = createContext ({
        first_name: profile.first_name,
        last_name: profile.last_name,
        email: profile.email
    })
    });
    return ProfileContext
//         <ProfileContext.Provider value={profileContext}>...</ProfileContext.Provider>
}


