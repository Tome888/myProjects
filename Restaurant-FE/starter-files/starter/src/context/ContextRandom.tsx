import { createContext, useState } from "react";

interface RandomRest{
    children: React.ReactElement
}

interface ContextProps{
    randomNumb: number
    setRandomNum: (randomNumb: number)=>void
}

export const RandomRestaurant = createContext<ContextProps | undefined>(undefined)

export function GetRandomRest({children}: RandomRest){
    const [randomNumb, setRandomNum]= useState(0)
    return<RandomRestaurant.Provider value={{randomNumb, setRandomNum}}>
        {children}
    </RandomRestaurant.Provider>
}