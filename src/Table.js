import { useContext } from "react"
import BTable from "react-bootstrap/Table"
import { DataContext } from "./DataProvider"
import Badge from 'react-bootstrap/Badge'
import lgroupBy from "lodash/groupBy"
import ExternalLink from "./ExternalLink"
import Th from "./Th"
import { noCaseSensitiveIncludes } from "./utils"

export default function Table() {
    const { data : { avis, filters, groupBy, orderBy, orderDirection } } = useContext(DataContext)

    let judgments = avis.filter(avis => {
        return Object.entries(filters).every(([key, value]) => {
            return Array.isArray(value) ? (
                !value.length || value.some(v => noCaseSensitiveIncludes(avis[key], v))
            ) : (
                !value || noCaseSensitiveIncludes(avis[key], value)
            )
        })
    })

    if (groupBy?.value) {
        const groupsObject = lgroupBy(judgments, avis => avis[groupBy.value])

        judgments = Object.keys(groupsObject).map(key => {
            return {
                id : key,
                [groupBy.value] : key,
                [groupBy.value === "medium" ? "status" : "medium"] : String(groupsObject[key].length)
            }
        })
    }

    if (orderBy) {
        judgments.sort((a, b) => {
            const compare = a[orderBy].localeCompare(b[orderBy])
            return compare * orderDirection
        })
    }

    return (
        <>
            <div style={ { textAlign : "right", margin : "10px 0 5px 0" } }>
                <Badge bg="secondary">
                { judgments.length } résultat{judgments.length > 1 ? "s" : ""}
                </Badge>
            </div>
            <BTable striped bordered hover>
                <thead>
                    <tr>
                        { !groupBy && (
                            <>
                                <Th value="medium" label="Média"/>
                                <Th value="topic" label="Sujet"/>
                                <Th value="status" label="Statut"/>
                                <Th value="date_decision" label="Date"/>
                            </>
                        ) }
                        { groupBy?.value === "medium" && (
                            <>
                                <Th value="medium" label="Média"/>
                                <Th value="status" label="Nombre de saisines"/>
                            </>
                        ) }
                        { groupBy?.value === "status" && (
                            <>
                                <Th value="status" label="Statut"/>
                                <Th value="medium" label="Nombre de médias"/>
                            </>
                        ) }
                    </tr>
                </thead>
                <tbody>
                    { judgments.map(avis => (
                        <tr key={ avis.id }>
                        { !groupBy && (
                            <>
                                <td>{ avis.medium }</td>
                                <td>
                                    <ExternalLink href={ `https://cdjm.org/avis-${avis.id}/` }>
                                        { avis.topic || "Non renseigné" }
                                    </ExternalLink>
                                </td>
                                <td>{ avis.status }</td>
                                <td>{ avis.date_decision }</td>
                            </>
                        ) }
                        { groupBy?.value === "medium" && (
                            <>
                                <td>{ avis.medium }</td>
                                <td>{ avis.status }</td>
                            </>
                        ) }
                        { groupBy?.value === "status" && (
                            <>
                                <td>{ avis.status }</td>
                                <td>{ avis.medium }</td>
                            </>
                        ) }
                        </tr>
                    )) }
                </tbody>
            </BTable>
        </>
    )
}