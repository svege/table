import React, {Component} from 'react';
import Table from '../Table/Table';
import Search from '../Search/Search';
import Form from '../Form/Form';
import Spinner from '../../components/Spinner/Spinner';
import SortingButtons from '../SortingButtons/SortingButtons';
import Container from '../../components/Container/Container';
import API_ROOT from '../../api';

class Main extends Component {
    state ={
        initialData: [],
        employees: [],
        fields: {
            name: 'name',
            job_title: 'job title',
            department: 'department',
            month_salary: 'monthly salary'
        },
        error: false,
        isLoaded: false,
        sorting: {
            value: '',
            direction: ''
        }
    };

    componentDidMount() {
        const employees = JSON.parse(localStorage.getItem('employees'));
        if (employees) {
            this.setState({
                isLoaded: true,
                initialData: employees,
                employees,
            });
        } else {
            localStorage.clear();
            fetch(`${API_ROOT}/employees.json`)
                .then(res => res.json())
                .then(
                    (res) => {
                        this.setState({
                            isLoaded: true,
                            initialData: res,
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
        const {initialData, employees} = this.state;
        this.setState({
            initialData: [...initialData, newEmployee],
            employees: [...employees, newEmployee]
        });
    };

    handleFilter = (sortedArr, sortingValue, sortingDirection) => {
        this.setState({employees: sortedArr, sorting: {value: sortingValue, direction: sortingDirection}})
    };

    handleDelete = (newArr) => {
        this.setState({employees: newArr});
    };

    render() {
        const {error, isLoaded, initialData, employees, fields, sorting} = this.state;

        let content ='';

        if (error) {
            content = <p>Ошибка: {error.message}</p>;
        } else if (!isLoaded) {
            content = <Spinner/>;
        } else {
            content = <>
                <Search onSearchChange={this.handleSearch}
                        initialData={initialData}/>
                <SortingButtons
                    employees={employees}
                    onFilterClick={this.handleFilter}
                    sorting={sorting}
                    fields={fields}
                />
                <Table
                    initialData = {initialData}
                    employees={employees}
                    fields={fields}
                    onDeleteClick={this.handleDelete}/>
                <Form fields={fields}
                      onFormSubmit={this.handleSubmit}/>
            </>
        }

        return (
            <Container>
                {content}
            </Container>
        )
    }
}

export default Main;
