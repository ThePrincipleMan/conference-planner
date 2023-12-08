import Navbar from '../components/navbar'
import Footer from '../components/footer'
import InputForm from '../components/inputform'
import { Link } from 'react-router-dom';

function Planner(){
    return (
        <>
            <Navbar />
            <div className='plannerbody'>
                <InputForm />
            </div>
            <Footer /> 
        </>
    );
}

export default Planner;