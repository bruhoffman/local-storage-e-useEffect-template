import { useEffect, useState } from "react";

export default function App() {
  // Estado para armazenar a lista de compras
  const [listaCompras, setListaCompras] = useState([]);

  // Estado para armazenar o valor do item sendo digitado
  const [item, setItem] = useState("");

  // Função para adicionar um item à lista de compras
  const adicionarItem = () => {
    if (item.trim() !== "") {
      // Verifica se o item não está vazio ou contém apenas espaços em branco
      setListaCompras([...listaCompras, item]); // Adiciona o item à lista de compras
      setItem(""); // Limpa o campo de entrada
    }
  };

  const saveLocalStorage = () => {
    // Transforma a listaCompras em um array.
    const listaString = JSON.stringify(listaCompras);
    // Grava as lista no Local Storage.
    localStorage.setItem("Lista", listaString);
  };

  //  Foi para dentro do useEffect.
  // listaCompras.length > 0 && saveLocalStorage();

  const getItensLocalStorage = () => {
    //Pegar do Local Storage
    const listaLocalStorage = localStorage.getItem("Lista");
    //Transformar as informações para String novamente
    const listaArray = JSON.parse(listaLocalStorage);
    //Atualizar a variável estado
    listaArray && setListaCompras(listaArray); // => Isso é exatamente o que "if (listaArray){setListaCompras(listaArray)}"
  };

  const removerLocalStorage = () => {
    localStorage.removeItem("Lista");
    setListaCompras([]);
  };

  //useEffect com dependências vazias é executado apenas 1x na montagem da tela.
  useEffect(() => {
    getItensLocalStorage();
  }, []);

  // Este useEfferct será executado toda vez que a listaCompras for atualizada, isto é, toda vez que um 1 item é add.
  useEffect(() => {
    listaCompras.length > 0 && saveLocalStorage();
  }, [listaCompras]);

  return (
    <div>
      <h1>Lista de Compras</h1>
      <input
        type="text"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        placeholder="Digite um item"
      />
      <button onClick={adicionarItem}>Adicionar</button>
      {/* <button onClick={saveLocalStorage}>Salvar Lista</button> */}
      {/* <button onClick={getItensLocalStorage}>Listar Compras</button> */}
      <button onClick={removerLocalStorage}>Limpar Local Storage</button>
      <ol>
        {listaCompras.map((compra, index) => (
          <li key={index}>{compra}</li>
        ))}
      </ol>
    </div>
  );
}
