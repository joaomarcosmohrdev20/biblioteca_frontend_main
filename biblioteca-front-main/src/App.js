import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [livros, setLivros] = useState([]);
  const [novo, setNovo] = useState({ titulo: "", autor: "", ano: "" });

  const listar = async () => {
    const res = await axios.get(API_URL);
    setLivros(res.data);
  };

  const salvar = async () => {
    await axios.post(API_URL, novo);
    setNovo({ titulo: "", autor: "", ano: "" });
    listar();
  };

  const deletar = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    listar();
  };

  useEffect(() => { listar(); }, []);

  return (
    <div>
      <h1>CRUD Livros</h1>
      <input placeholder="Título" value={novo.titulo}
        onChange={e => setNovo({ ...novo, titulo: e.target.value })} />
      <input placeholder="Autor" value={novo.autor}
        onChange={e => setNovo({ ...novo, autor: e.target.value })} />
      <input placeholder="Ano" value={novo.ano}
        onChange={e => setNovo({ ...novo, ano: e.target.value })} />
      <button onClick={salvar}>Salvar</button>

      <ul>
        {livros.map(l => (
          <li key={l.id}>
            {l.titulo} - {l.autor} ({l.ano})
            <button onClick={() => deletar(l.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
