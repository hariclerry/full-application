import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { toast } from "react-toastify";
import Pagination from '../common/pagination';
import { paginate } from '../../utils/paginate';
import ListGroup from '../common/listGroup';
import { getMovies, deleteMovie } from "../../services/moviesService";
import { getGenres } from "../../services/genreService";
import MoviesTable from './moviesTable';
import SearchBox from './searchBox';

class Movies2 extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" }
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];

    const { data: movies } = await getMovies();
    this.setState({ movies, genres });

  }

  handleDelete = async movie => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter(m => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404);
      toast.error("This movie has already been deleted.");

      this.setState({ movies: originalMovies });
    }
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      searchQuery,
      movies: allMovies
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const {
      currentPage,
      pageSize,
      genres,
      selectedGenre,
      sortColumn,
      searchQuery
    } = this.state;
    const numberOfMovies = this.state.movies.length;
    const { totalCount, data: movies } = this.getPagedData();
    const { user } = this.props
    return (
      <Fragment>
        {numberOfMovies === 0 ? (
          'There are no movies to display'
        ) : (
          <div className="row">
            <div className="col-3" style={{ margin: '100px 0' }}>
              <ListGroup
                items={genres}
                onItemSelelct={this.handleSelectGenre}
                selectedItem={selectedGenre}
              />
            </div>
            <div className="col">
              <p style={{ margin: '50px 0' }}>
                {' '}
                Showing {totalCount} Movies in the database{' '}
              </p>
              <SearchBox value={searchQuery} onChange={this.handleSearch} />
              {user && (<Link className="btn btn-primary" to={'/movieForm'}>
                Add Movie
              </Link>)}

              <div style={{ margin: '50px 0' }}>
                <MoviesTable
                  allMovies={movies}
                  onDelete={this.handleDelete}
                  onLike={this.handleLike}
                  onSort={this.handleSort}
                  sortColumn={sortColumn}
                  user={user}
                />
              </div>
              <Pagination
                itemsCount={totalCount}
                pageSize={pageSize}
                onPageChange={this.handlePageChange}
                currentPage={currentPage}
              />
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

export default Movies2;
