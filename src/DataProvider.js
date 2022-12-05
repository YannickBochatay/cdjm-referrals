import { createContext, useEffect, useState } from "react";
import objectData from "./cdjm-data.json"

export const DataContext = createContext("datacontext")

const defaultFilters = {
    filters : { status : [] },
    orderBy : "date_decision",
    orderDirection : -1,
    groupBy : null
}

const normalizeData = data => {
    return {
        ...data,
        avis : data.avis.map(item => ({
            ...item,
            medium : item.medium.trim()
        })),
        ...defaultFilters
    }
}

export default function Data({ children }) {

    const [data, setData] = useState({ avis : [], statuts : [], ...defaultFilters })

    useEffect(() => {
        const fetchData = async() => {
            /* const res = await fetch("https://yannguegan.pythonanywhere.com/data/dzc/cdjm-data.json")
            const objectData = await res.json() */
            setData(normalizeData(objectData))
        }
        fetchData()
    }, [])

    return <DataContext.Provider value={ { data, setData } }>{ children }</DataContext.Provider>
}