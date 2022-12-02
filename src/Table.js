import { useContext, useState } from "react";
import BTable from "react-bootstrap/Table"
import { DataContext } from "./DataProvider"
import Button from 'react-bootstrap/Button'

export default function Table() {
    const data = useContext(DataContext)
    const [orderBy, setOrderBy] = useState("date_decision")
    const [way, setWay] = useState(1)

    const sortedJudgments = [...data.avis].sort((a, b) => {
        const compare = a[orderBy].localeCompare(b[orderBy])
        return compare * way
    })

    const handleClick = key => () => {
        if (key === orderBy) setWay(oldWay => oldWay * -1)
        else {
            setOrderBy(key)
            setWay(1)
        }
    }

    return (
        <BTable striped bordered hover>
      <thead>
        <tr>
          <th>
            <Button onClick={ handleClick("medium") }>Média</Button>
        </th>
          <th>
            <Button onClick={ handleClick("status") }>Statut</Button>
        </th>
          <th>
          <Button onClick={ handleClick("date_decision") }>Date</Button>
          </th>
          <th/>
        </tr>
      </thead>
      <tbody>
        { sortedJudgments.map(avis => (
            <tr key={ avis.id }>
                <td>{ avis.medium }</td>
                <td>{ avis.status }</td>
                <td>{ avis.date_decision }</td>
                <td>
                    <a href={ `https://cdjm.org/avis-${avis.id}/` }>Détails</a>
                </td>
            </tr>
        )) }
      </tbody>
    </BTable>
    )
}