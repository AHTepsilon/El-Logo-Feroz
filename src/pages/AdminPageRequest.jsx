import React, { Component } from 'react'
import {getRequestsById} from '../script/auth'
import {useParams} from 'react-router-dom'
import queryString from 'query-string';

export default class AdminPageRequest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            current: {}
        }
    }

    async componentDidMount(){
        //this.setState({current: getRequestsById(this.props.match.params.id)})
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const foo = params.get('id');
        console.log(foo);
    }

    render(){
        return <>
            <h1></h1>
        </>
    }
}