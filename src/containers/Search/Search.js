import React, {Component} from 'react';
import {func, shape} from 'prop-types';
import classes from './Search.module.scss';

class Search extends Component {
    state ={
        searchTerm:''
    };

    searchTable = (e) => {
        const {initialData, onSearchChange} = this.props;
        const searchedArr = Object.values([...initialData]);
        const result = searchedArr.filter(item => {
            return (
                item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
                item.job_title.toLowerCase().includes(e.target.value.toLowerCase()) ||
                item.department.toLowerCase().includes(e.target.value.toLowerCase()) ||
                item.monthly_salary.toString().includes(e.target.value.toLowerCase())
            )
        });
        this.setState( { searchTerm: e.target.value});
        onSearchChange(result);
    };


    render() {
        const {searchTerm} = this.state;

        return (
            <div className={classes.Container}>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor='search'>Search</label>
                <input id='search'
                       type='search'
                       placeholder='Search...'
                       value={searchTerm}
                       onChange={(e) => this.searchTable(e)}
                       autoComplete='off'/>
            </div>
        );
    }
}

Search.propTypes = {
    onSearchChange: func.isRequired,
    initialData: shape([]).isRequired
};

export default Search;
