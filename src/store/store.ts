// adding store

import { create } from 'zustand';


interface AppState
{
    userEmail: string;
    
}

interface AppstateActions
{
    setUserEmail: (email : string) => void;

}

export const useAppStore = create<AppState&AppstateActions>((set) =>(
    
{

     userEmail: localStorage.getItem('userEmail') ||'',
     
    setUserEmail:(email:string)=>
    {
        set({userEmail: email});
        localStorage.setItem('userEmail',email)//key "userEmail" value "email"
    }
 
}

))