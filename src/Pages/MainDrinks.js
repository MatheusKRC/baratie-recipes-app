import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setResultsAction } from '../redux/Actions/index';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Recipe from '../Components/Recipe';
import fetchRecipeInfos from '../0 - Services/API/requestAPI';

function MainDrinks({ results, type, dispatchResults }) {
  const history = useHistory();
  const oneResult = () => {
    if (results.length === 1) {
      history.push(`/drinks/${results[0].idDrink}`);
    }
  };
  useEffect(() => {
    async function fetchApi() {
      const oi = await fetchRecipeInfos('cocktail', 'search', 's', '');
      dispatchResults(await oi.drinks);
      console.log(results);
    }
    fetchApi();
    oneResult();
  }, [type]);

  useEffect(() => {
    oneResult();
  }, [results]);
  const mN = 12;
  return (
    <div className="container-recipes">
      <Header />
      {!results
        ? <h1>Loading...</h1>
        : results.slice(0, mN).map((e, i) => (
          <Recipe
            key={ i }
            index={ i }
            name={ e.strDrink }
            img={ e.strDrinkThumb }
          />
        ))}
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  results: state.page.setResults,
  type: state.page.setApi,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchResults: (results) => dispatch(setResultsAction(results)),
});

MainDrinks.propTypes = {
  type: PropTypes.string.isRequired,
  dispatchResults: PropTypes.func.isRequired,
  results: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainDrinks);