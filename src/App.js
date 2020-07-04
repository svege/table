import React from 'react';
import './App.scss';
import Main from "./containers/Main";
import Header from "./components/Header/Header";

function App() {
    return (
        <div className="App">
            <Header/>
            <Main/>
        </div>
    );
}

export default App;
