import React, {Fragment} from 'react';

const Movie = ({match}) => {
  return ( 
    <Fragment>
    <h1> View {match.params.id} detail</h1>
    <button className="btn btn-primary"> Save </button>
    </Fragment>
   );
}
 
export default Movie;