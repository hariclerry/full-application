import React from 'react';
import { Link } from 'react-router-dom';
import Table from '../common/table';
// import { getMovie } from "../../services/moviesService";
// import Movie from './components/movies/movie';

const MoviesTable = ({ allMovies, onDelete, onLike, onSort, sortColumn, user }) => {
  // const likedMovies = movie.likes === true ? "fa fa-heart" : "fa fa-heart-o"
  const columns = [
    { key: 'number', label: '#' },
    { path: 'title', label: 'Title', content: movie => {
      return (
        user ?
      <Link
        to={`/movies/${movie._id}`}>{movie.title}
      </Link> :
      movie.title
    ) }},
    { path: 'genre.name', label: 'Genre'},
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    {
      key: 'like',
      label: 'Likes',
      content: movie => (
        <i
          className={movie.likes === true ? 'fa fa-heart' : 'fa fa-heart-o'}
          onClick={() => onLike(movie)}></i>
      )
    },
    {
      key: 'delete',
      label: 'Action',
      content: movie => (
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => onDelete(movie)}>
          Delete
        </button>
      )
    }
  ];

  return (
    <Table
      columns={columns}
      onSort={onSort}
      sortColumn={sortColumn}
      data={allMovies}
    />
  );
};

export default MoviesTable;
