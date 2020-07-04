import React, {Component} from 'react';
import classes from "./Table.module.scss";
import Row from "../../components/Row/Row";

class Table extends Component {
    deleteRow = person => {
        let filtered = [...this.props.employees];
        let result = filtered.filter(item => item.name !== person.name);
        this.props.onDeleteClick(result);
    };

    render() {
        let fields = Object.entries(this.props.fields);
        let headrow = fields.map(item =>
            <th key={`headcell` + item[0]}>
                {item[0] === "month_salary" ? item[1]+ `, $` : item[1] }
            </th>);

        let content = '';

        if (this.props.employees.length > 0) {
            content = this.props.employees.map(person => (
                <Row
                    key={person.id}
                    employee={person}
                    deleted={() => this.deleteRow(person)}
                />)
            );
        }

        return (
            <table className={classes.Table}>
                <thead>
                <tr>
                    {headrow}
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    {content}
                </tbody>
            </table>
        );
    }
}

export default Table;
