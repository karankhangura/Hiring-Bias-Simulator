import React from "react";
import axios from 'axios';

function clientTest() {

    function addFeeling() {
        const data = { option: 'Happy'};
        axios.post('http://3.141.7.156:8080/api/addfeeling', data)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            })
    }

    function addOverall() {
        const data = { option: 'Unfair'};
        axios.post('http://3.141.7.156:8080/api/addoverall', data)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            })
    }

    function addInfluence() {
        const data = { option: 'Culture'};
        axios.post('http://3.141.7.156:8080/api/addinfluence', data)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            })
    }

    function addValid() {
        const data = { option: 'Yes'};
        axios.post('http://3.141.7.156:8080/api/addvalid', data)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            })
    }
    function addOpinion() {
        const data = { option: 'No'};
        axios.post('http://3.141.7.156:8080/api/addopinion', data)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            })
    }


    function addUser() {
        const data = { username: 'Peter', password: 'Parker' };
        axios.post('http://3.141.7.156:8080/api/adduser', data)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            })
    }
    function getUsers() {
        axios.get('http://3.141.7.156:8080/api/getusers')
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            })
    }

    function addApplicationChoice() {
        const data = { topchoice: 'Washington', bottomchoice: 'Oregon' };
        axios.post('http://3.141.7.156:8080/api/addapplicationchoice', data)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            })
    }
    function getApplicationChoices() {
        axios.get('http://localhost:8080/api/getapplicationchoices')
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            })
    }

    function addPreferredChoice() {
        const data = { choice: 'Arizona' };
        axios.post('http://3.141.7.156:8080/api/addpreferredchoice', data)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            })
    }
    function getPreferredChoices() {
        axios.get('http://localhost:8080/api/getpreferredchoices')
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            })
    }

    function addVideoChoice() {
        const data = { topchoice: 'Kaleb', bottomchoice: 'Gary' };
        axios.post('http://3.141.7.156:8080/api/addvideochoice', data)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            })
    }
    function getVideoChoices() {
        axios.get('http://3.141.7.156:8080/api/getvideochoices')
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <div>
            
            <button onClick={addFeeling}>add feeling choice</button>
            <button onClick={addOverall}>add overall choice</button>
            <button onClick={addInfluence}>add influence choice</button>
            <button onClick={addValid}>add valid choice</button>
            <button onClick={addOpinion}>add opinion choice</button>

            <button onClick={addUser}>add user</button>
            <button onClick={getUsers}>get users</button>

            <button onClick={addApplicationChoice}>add application choice</button>
            <button onClick={getApplicationChoices}>get application choices</button>

            <button onClick={addPreferredChoice}>add preferred choice</button>
            <button onClick={getPreferredChoices}>get preferred choices</button>

            <button onClick={addVideoChoice}>add video choice</button>
            <button onClick={getVideoChoices}>get video choices</button>
            <h1>BackEnd Test</h1>
        </div>


    );
}

export default clientTest;