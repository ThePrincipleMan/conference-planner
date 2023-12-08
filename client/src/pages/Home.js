import Navbar from '../components/navbar'
import Footer from '../components/footer'
import { Link } from 'react-router-dom';

function Home(){
    return (
        <>
            <Navbar />
            <div className='homebody'>
                <Link className='styleremover' to='/planner'>
                    <div className='gobutton'>
                        Lets get started!
                    </div>
                </Link>
            </div>
            <Footer /> 
        </>
    );
}

export default Home;