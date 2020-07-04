import React, {Component} from 'react';
import classes from "./Search.module.scss";

class Search extends Component {
    state ={
        searchTerm:''
    };

    searchTable = (e) => {
        let searchedArr = [...this.props.initialData];
        let result = searchedArr.filter(item => {
            return (
                item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
                item.job_title.toLowerCase().includes(e.target.value.toLowerCase()) ||
                item.department.toLowerCase().includes(e.target.value.toLowerCase()) ||
                item.month_salary.toString().includes(e.target.value.toLowerCase())
            )
        });
        this.setState( { searchTerm: e.target.value})
        this.props.onSearchChange(result);
    };


    render() {
        return (
            <div className={classes.Container}>
                <label htmlFor="search">Search</label>
                <input id="search"
                       type="text"
                       placeholder="Search..."
                       value={this.state.searchTerm}
                       onChange={( event ) => this.searchTable(event)}
                       autoComplete="off"/>
            </div>
        );
    }
}

export default Search;
