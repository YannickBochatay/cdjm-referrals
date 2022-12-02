import { createContext, useEffect, useState } from "react";

export const DataContext = createContext("datacontext")

export default function Data({ children }) {

    const [data, setData] = useState({ avis : [] })

    useEffect(() => {
        const fetchData = async() => {
            const res = await fetch("https://yannguegan.pythonanywhere.com/data/dzc/cdjm-data.json")
            setData(await res.json())
        }
        fetchData()
    }, [])

    return <DataContext.Provider value={ data }>{ children }</DataContext.Provider>
}