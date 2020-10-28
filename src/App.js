import React, {useEffect, useState} from "react";
import api from './services/api.js';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    api.get('repositories').then(resp =>{
        setRepositories(resp.data);
        //console.log('resposta',resp);
    });
  },[]);

  async function handleAddRepository() {
    
    const resp = await api.post('repositories',{
      title:`Novo Repositório ${Date.now()}`,
      url:"http://localhost:3333",
      techs:"ReactJS",
    });

    const repository = resp.data;
    // console.log(repository);
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const newRepositories = repositories.filter(
      repository => repository.id !== id)

    setRepositories(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <li key={repository.id}>{repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
            </button>
          </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
