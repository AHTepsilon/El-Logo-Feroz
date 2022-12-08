import React, {Component} from 'react'
import {getImage} from '../script/auth'

export default class RequestPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            headline: 'EL LOGO FEROZ! ESTÁ DISEÑANDO.',
            isPending: true,
        }
    }

    async componentDidMount(){

    }

    render(){
        return <>
        <div>
            <h1>{this.state.headline}</h1>
            <div>
                <img src={getImage('examplePics', 'example1')}></img>
                <img src={getImage('examplePics', 'example2')}></img>
                <img src={getImage('examplePics', 'example3')}></img>
            </div>
        </div>
        </>
    }
}