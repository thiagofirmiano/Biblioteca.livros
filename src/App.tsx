import './styles/styles.css'
import { FiLink, FiUser, FiBook, FiSearch } from "react-icons/fi";
import { api } from "./components/services/api.js";
import { ChangeEvent, useState } from "react";

type Hit = {
  title: string;
  url: string;
  author: string;
  objectID: string;
  created_at: string;
};

type DataProps = {
  hits: Hit[];
};

export function App() {
  const [hits, setHits] = useState<Hit[]>([]);
  const [searchKey, setSearchKey] = useState<string>("")


  function handleInputChange(event: ChangeEvent<HTMLInputElement>){
    const { value } = event.target; 
    setSearchKey(value)
  }
  async function getBook(e: React.FormEvent) {
    e.preventDefault();

    const { data } = await api.get<DataProps>(`search?query=${searchKey}`);

    const hits = data.hits.map((hit: { title: any; url: any; author: any; objectID: any; created_at: any; }) => {
        return {
          title: hit.title,
          url: hit.url,
          author: hit.author,
          objectID: hit.objectID,
          created_at: hit.created_at
        };
    });

    setHits(hits);
  }

  return (

    <>
    <header>
      <div className="container">
        <h1>Biblioteca</h1>

        <form onSubmit={getBook}>
          <input type="text" id="search" onChange={handleInputChange}/>
          <button type="submit"><FiSearch/></button>
        </form>
      </div>
    </header>
    
    <main>

      {hits.map((hit) => {
        return (
          <div key={hit.objectID} className="post-Area">
            <div>
              <h1><FiUser/> {hit.author}</h1>
            </div>

            <div >
              <h1><FiBook/> {hit.title ? hit.title : "Não informado"}</h1>
            </div>
            
            <div>
              <FiLink />
              <a className={hit.url ? "" : "no_information"} href={hit.url}>{hit.url ? hit.url : "Não informado"}</a>
            </div>
          </div>
        );
      })}
    </main>

    </>
  );
}
