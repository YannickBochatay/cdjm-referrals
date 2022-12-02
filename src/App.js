import './App.css';
import Container from 'react-bootstrap/Container';
import DataProvider from "./DataProvider"
import Table from "./Table"

function App() {
  return (
    <div>
      <header>
        <h1>Statistiques des saisines du CDJM</h1>
      </header>
      <main>
        <Container className="p-3">
          <DataProvider>
            <Table/>
          </DataProvider>
        </Container>
      </main>
    </div>
  );
}

export default App;
