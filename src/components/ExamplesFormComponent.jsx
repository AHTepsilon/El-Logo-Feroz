import React from 'react';
import './styles/ExamplesFormComponent.scss'

function ExamplesFormComponent(){
    return <form className='form'>
        <div>
            <h4></h4>
            <p></p>
        </div>
        <div>
            <div>
                <h4>LOGO 1</h4>
                <input type='file'></input>
                <p>DIME ALGO DE ESE LOGO (OPCIONAL)</p>
                <textarea></textarea>
            </div>
            <div>
                <h4>LOGO 2</h4>
                <input type='file'></input>
                <p>DIME ALGO DE ESE LOGO (OPCIONAL)</p>
                <textarea></textarea>
            </div>
            <div>
                <h4>LOGO 3</h4>
                <input type='file'></input>
                <p>DIME ALGO DE ESE LOGO (OPCIONAL)</p>
                <textarea></textarea>
            </div>
        </div>
    </form>
}

export default ExamplesFormComponent;