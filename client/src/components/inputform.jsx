import { useState } from 'react';

export const InputForm = () => {
    const [inputs, setInputs] = useState([{name: "", city: "", nationality: ""}]);
    
    const handleInputChange = (e,i) => {
        const field = e.target.name;
        const newInputs = [...inputs]
        newInputs[i][field] = e.target.value;
        setInputs(newInputs);
    };

    const handleAddInput = () => {
        setInputs([...inputs, {name:"",city:"",nationality:""}]);
    };

    const handleDeleteInput = (i) => {
        const newInputs = [...inputs]
        newInputs.splice(i,1)
        setInputs(newInputs)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);
        setInputs([]);
    }

    return(
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
                        <option value="France">France</option>
                        <option value="India">India</option>
                        <option value="United States of America">United States of America</option>
                        {/* yaha options dalna hai */}
                    </select>
                    <button onClick={() => handleDeleteInput(index)}>Delete</button>
                </div>
            ))}
            <button onClick={handleAddInput}>Add Participant</button>
            <button type='submit'>Submit List</button>
        </form>
    )
}

export default InputForm;