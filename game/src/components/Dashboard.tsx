import React from 'react';
import Container from 'react-bootstrap/Container';
import HomePage from '../components/src_HomePage/src/App';
import Header from './Header';
import Footer from './Footer';
// import { Home } from 'lucide-react';
const Dashboard: React.FC = () => {
  return (
    <><Header/>
    <Container>
      
        <HomePage/>
    </Container>
    <Footer/>
    </>
  );
};
export default Dashboard;