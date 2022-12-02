import { useContext } from "react"
import Select from "react-select"
import Form from 'react-bootstrap/Form'
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { DataContext } from "./DataProvider"

export default function Filters() {
    const { data, setData } = useContext(DataContext)
    const setFilter = (key, value) => setData({ ...data, filters : { ...data.filters, [key] : value }})

    return (
        <Form>
            <Row>
                <Col>
                    <Form.Label htmlFor="mediumFilter">Média</Form.Label>
                    <Form.Control
                        type="text"
                        id="mediumFilter"
                        value={ data.filters.medium }
                        onChange={ e => setFilter("medium", e.target.value) }
                    />
                </Col>
                <Col>
                    <Form.Label htmlFor="topicFilter">Sujet</Form.Label>
                    <Form.Control
                        type="text"
                        id="topicFilter"
                        value={ data.filters.topic }
                        onChange={ e => setFilter("topic", e.target.value) }
                    />
                </Col>
                {/* <Col>
                    <Form.Label htmlFor="summaryFilter">Résumé</Form.Label>
                    <Form.Control
                        type="text"
                        id="summaryFilter"
                        value={ data.filters.summary }
                        onChange={ e => setFilter("summary", e.target.value) }
                    />
                </Col> */}
                <Col>
                    <Form.Label htmlFor="statusFilter">Statut de la saisine</Form.Label>
                    <Select
                        id="statusFilter"
                        value={ data.filters.status.map(status => ({ value : status, label : status })) }
                        onChange={ status => setFilter("status", status?.map(({ value }) => value)) }
                        options={ data.statuts.map(item => ({ value : item.status, label : item.status })) }
                        isMulti
                    />
                </Col>
                <Col>
                    <Form.Label htmlFor="groupByFilter">Grouper par</Form.Label>
                    <Select
                        id="groupByFilter"
                        value={ data.groupBy }
                        onChange={ groupBy => setData({ ...data, groupBy, orderBy : null }) }
                        options={ [
                            { value : "medium", label : "média" },
                            { value : "status", label : "statut" }
                        ] }
                        isClearable
                    />
                </Col>
            </Row>
        </Form>
    )
}