import Navbar from '../components/navbar'
import Footer from '../components/footer'
import { Link } from 'react-router-dom';
import '../components/styles.css';

function Home(){
    return (
        <>
            <Navbar />
            <div className='homebody'>
                <div className='intro'>
                    <p>Organizing an international conference can be a real headache, especially when deciding a host nation acceptable to all.</p>
                    <p>We help you decide on the perfect host nation keeping in mind Individual Visa Restrictions, Centrality, Presence of Appropriate infrastructure and overall aesthetic choice.</p>
                    <p>
                        If you are ready, then so are we...
                    </p>
                </div>
                <Link className='styleremover' to='/planner'>
                    <div className='buttons'>
                        Lets get started!
                    </div>
                </Link>
            </div>
            <Footer /> 
        </>
    );
}

export default Home;