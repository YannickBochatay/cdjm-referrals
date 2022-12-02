import './App.css';
import Container from 'react-bootstrap/Container';
import DataProvider from "./DataProvider"
import Table from "./Table"
import SocialNetworks from "./SocialNetworks"
import ExternalLink from './ExternalLink'
import Filters from "./Filters"

function App() {
  return (
    <div>
      <header>
        <h1>Statistiques des saisines du&nbsp;
          <ExternalLink href="https://cdjm.org/" style={ { color:"white"} }>CDJM</ExternalLink>
        </h1>
        <SocialNetworks/>
      </header>
      <main>
        <Container className="p-3">
          <DataProvider>
            <Filters/>
            <Table/>
          </DataProvider>
        </Container>
      </main>
    </div>
  );
}

export default App;
