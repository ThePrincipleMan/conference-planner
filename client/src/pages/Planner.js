import Navbar from '../components/navbar'
import Footer from '../components/footer'
import InputForm from '../components/inputform'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../components/styles.css';

function Planner(){
    const [inputs, setInputs] = useState([{name: "", city: "", nationality: ""}]);
    
    function handleInputChange(e,i){
        const field = e.target.name;
        const newInputs = [...inputs]
        newInputs[i][field] = e.target.value;
        setInputs(newInputs);
    };

    function handleAddInput(){
        setInputs([...inputs, {name:"",city:"",nationality:""}]);
    };

    function handleDeleteInput(e,i){   // delete functionality irregular needs fixing
        e.preventDefault()            // this was the fix for it
        const newInputs = [...inputs]
        console.log(i)
        newInputs.splice(i,1)
        console.log(newInputs)
        setInputs(newInputs)
        // console.log('delete successful')
        // console.log(JSON.stringify(inputs))
    };

    async function handleSubmit(event){
        event.preventDefault();
        console.log(JSON.stringify(inputs));
        let response = await fetch('http://localhost:8000/planner', {
            method: 'POST',
            body: JSON.stringify(inputs),
            headers: {
                'content-type' : 'application/json'
            },
        });
        let res = await response.json();
        console.log(res);
        setInputs([]);
    }

    return (
        <>
            <Navbar />
            <div className='plannerbody'>
                <form onSubmit={handleSubmit}>
                    {inputs.map((input, index)=> (
                        <div key={index}>
                            <input 
                                type='text'
                                placeholder='Name'
                                name = 'name'
                                value = {input.name}
                                onChange = {(e) => handleInputChange(e, index)}
                                required
                            />
                            <select
                                value = {input.city}
                                name = 'city'
                                onChange = {(e) => handleInputChange(e,index)}
                                required
                            >
                                <option value="">Nearest City</option>
                                <option value="Mumbai">Mumbai</option>
                                <option value='New York'>New York</option>
                                <option value='Paris'>Paris</option>
                                {/* options here */}
                            </select>
                            <select
                                value = {input.nationality}
                                name = 'nationality'
                                onChange = {(e) => handleInputChange(e,index)}
                                required
                            >
                                <option value="">Nationality</option>
                                <option value="FRA">France</option>
                                <option value="IND">India</option>
                                <option value="USA">United States of America</option>
                                {/* yaha options dalna hai */}
                            </select>
                            <button onClick={(e) => handleDeleteInput(e,index)}>Delete</button>
                        </div>
                    ))}
                    <button onClick={handleAddInput}>Add Participant</button>
                    <button type="submit">Submit List</button>
                </form>
            </div>
            <Footer /> 
        </>
    );
}

export default Planner;