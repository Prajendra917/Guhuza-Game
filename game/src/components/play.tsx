import React from 'react';
import Container from 'react-bootstrap/Container';
import Quiz from '../components/src/quiz';
import Header from './Header';
import Footer from './Footer';
// import { Home } from 'lucide-react';
const play: React.FC = () => {
  return (
    <><Header/>
    <Container>
      
        <Quiz/>
    </Container>
    <Footer/>
    </>
  );
};
export default play;