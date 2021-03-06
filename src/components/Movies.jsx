import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './common/Like';
import Pagination from './common/Pagination';

export default class Movies extends Component {
	state = {
		movies: getMovies(),
		pageSize: 4
	};
	handleDelete = (movie) => {
		// because there is a 'movie' argument, the onClick has to be edited t include the 'movie' object from map!
		const movies = this.state.movies.filter((m) => m._id !== movie._id);
		// the above creates a new movies array. It takes the movies in the state and filters the deleted one by id, returnng a new array without the deleted movie. We then set the state to this new movies array below.
		this.setState({ movies });
	};

	handleLike = (movie) => {
		const movies = [...this.state.movies];
		const index = movies.indexOf(movie);
		movies[index] = { ...movies[index] };
		movies[index].liked = !movies[index].liked;
		this.setState({ movies });
	};

	handlePageChange = (page) => {
		console.log(page);
	};

	render() {
		const movies = this.state.movies;
		const { length: count } = movies;
		if (count === 0) return <p>There are no movies in the database! Fail.</p>;

		return (
			<>
				<p>There are currently {count} movies in the database</p>
				<table className='table'>
					<thead>
						<tr>
							<th scope='col'>Title</th>
							<th scope='col'>Genre</th>
							<th scope='col'>Stock</th>
							<th scope='col'>Rate</th>
							<th scope='col'></th>
							<th scope='col'></th>
						</tr>
					</thead>
					<tbody>
						{movies.map((movie) => (
							<tr key={movie._id}>
								<td>{movie.title}</td>
								<td>{movie.genre.name}</td>
								<td>{movie.numberInStock}</td>
								<td>{movie.dailyRentalRate}</td>
								<td>
									<Like liked={movie.liked} onClick={() => this.handleLike(movie)} />
								</td>
								<td>
									<button
										onClick={() => this.handleDelete(movie)}
										className='btn btn-danger btn-sm'>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<Pagination
					itemsCount={count}
					pageSize={this.state.pageSize}
					onPageChange={this.handlePageChange}
				/>
			</>
		);
	}
}
