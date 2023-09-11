import './App.css'
import Movies from './components/Movies'
import useMovies from './hooks/useMovies'
import { useEffect, useState, useRef } from 'react'

//useRef:
// permite crear referencia mutable que persiste durante el ciclo de
// vida del componente, sirve para guardar cualquier valor o elemento
// del dom, y cuando cambia no renderiza el componente, a diferencia de useState;

//useEffect:
// permite ejecutar codigo cuando el componente se monta, desmonta o actualiza
// se puede ejecutar varias veces, y se ejecuta despues de cada renderizado
// se puede ejecutar despues de cada renderizado o solo cuando cambia un valor
// en especifico, se puede limpiar, y se puede ejecutar despues de que el dom
// se actualiza

//useState:
// permite crear estado en componentes funcionales, y es una funcion que recibe
// un valor inicial y retorna un arreglo con dos elementos, el primero es el
// valor del estado y el segundo es una funcion para actualizar el estado

function useSearch() {
  const [search, updateSearch] = useState('');
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {

    if (isFirstInput.current) {
      isFirstInput.current = search === '';
      return;
    }

    if (search === '') {
      setError('Por favor ingrese un termino de busqueda');
      return;
    }

    setError(null);
  }, [search])

  return {search, updateSearch, error};
}

function App() {
  const { search, updateSearch, error } = useSearch();
  const { movies, getMovies } = useMovies( {search} );

  const handleSubmit = () => {
    event.preventDefault();
    getMovies();
  }

  const handleChange = (event) => {
    updateSearch(event.target.value);
  }

  return (
    <div className="page">

      <header>
        <h1>Buscador de Peliculas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input value={search} name="query" onChange={handleChange} placeholder="Buscar..."/>
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{color: 'red'}}>{error}</p>}
      </header>

      <main>
        <Movies movies={movies} />
      </main>
    </div>
  )
}

export default App
