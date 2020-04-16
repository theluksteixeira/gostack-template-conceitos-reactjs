import React, { useState } from "react";
import api from "./services/api";

import "./styles.css";
import { useEffect } from "react";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    await api
      .post("/repositories", {
        title: `teste ${Date.now()}`,
        url: "http: teste.com.br",
        techs: ["node, reactjs"],
      })
      .then((repository) => setRepositories([...repositories], repository));
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`).then(() => {
      const idIndex = repositories.findIndex(
        (repository) => (repository.id = id)
      );
      repositories.splice(idIndex);
      setRepositories([...repositories], repositories);
    });
  }

  useEffect(() => {
    api.get("/repositories").then((response) => {
      setRepositories(response.data);
    });
  }, [repositories]);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
