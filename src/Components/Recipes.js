import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

function Recipes({ index, name, img, results }) {
  const history = useHistory();
  const handleClick = () => {
    if (history.location.pathname === '/drinks') {
      history.push(`/drinks/${results[index].idDrink}`);
    }
    if (history.location.pathname === '/foods') {
      history.push(`/foods/${results[index].idMeal}`);
    }
  };
  return (
    <button
      type="button"
      onClick={ handleClick }
    >
      <div className="card-container" data-testid={ `${index}-recipe-card` }>

        <p className="card-name" data-testid={ `${index}-card-name` }>{name}</p>
        <img
          className="card-image"
          data-testid={ `${index}-card-img` }
          src={ img }
          alt="cardThumb"
        />

      </div>
    </button>
  );
}

const mapStateToProps = (state) => ({
  results: state.page.setResults,
});

Recipes.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  results: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default connect(mapStateToProps)(Recipes);