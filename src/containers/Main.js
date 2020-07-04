import React, {Component} from 'react';
import Table from "./Table/Table";
import Search from "./Search/Search";
import Form from "./Form/Form";
import Spinner from "../components/Spinner/Spinner";
import SortingButtons from "./SortingButtons/SortingButtons";
import Container from "../components/Container/Container";

class Main extends Component {
    state = {
        initialData: [],
        employees: [],
        fields: {
            name: "name",
            job_title: "job title",
            department: "department",
            month_salary: "monthly salary"
        },
        error: false,
        isLoaded: false,
        sorting: {
            value: null,
            direction: null
        }
    };

    componentDidMount() {
        let employees = JSON.parse(localStorage.getItem('employees'));
        if (employees) {
            console.log('get')
            this.setState({
                isLoaded: true,
                initialData: employees,
                employees: employees,
            });
        } else {
            localStorage.clear();
            fetch("https://database-dc5a8.firebaseio.com/employees.json")
                .then(res => res.json())
                .then(
                    (res) => {
                        this.setState({
                            isLoaded: true,
                            initialData: Object.values(res),
                            employees: Object.values(res),
                        });
                        localStorage.setItem('employees', JSON.stringify(Object.values(res)))
                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    }
                )
        }
    }

    handleSearch = foundArr => {
        this.setState({employees: foundArr});
    };

    handleSubmit = newEmployee => {
        this.setState({
            initialData: [...this.state.initialData, newEmployee],
            employees: [...this.state.employees, newEmployee]
        });
    };

    handleFilter = (sortedArr, sortingValue, sortingDirection) => {
        this.setState({employees: sortedArr, sorting: {value: sortingValue, direction: sortingDirection}})
    };

    handleDelete = (newArr) => {
        this.setState({employees: newArr});
    };

    render() {
        let content = <Spinner/>;

        if (this.state.error) {
            content = <p>{this.state.error}</p>
        }

        if (this.state.initialData.length > 0) {
            content = (
                <React.Fragment>
                    <Search onSearchChange={this.handleSearch}
                            initialData={this.state.initialData}/>
                    <SortingButtons
                        employees={this.state.employees}
                        onFilterClick={this.handleFilter}
                        sorting={this.state.sorting}
                        fields={this.state.fields}
                    />
                    <Table
                        employees={this.state.employees}
                        fields={this.state.fields}
                        onDeleteClick={this.handleDelete}/>
                    <Form fields={this.state.fields}
                          onFormSubmit={this.handleSubmit}/>
                </React.Fragment>
            )
        }

        return (
            <Container>
                {content}
            </Container>
        )
    }
}

export default Main;
