import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setResultsAction } from '../redux/Actions/index';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Recipes from '../Components/Recipes';
import fetchRecipeInfos from '../0 - Services/API/requestAPI';
import profilewallp from '../images/pirate/profilewallp.png';

function MainDrinks({ results, type, dispatchResults }) {
  const history = useHistory();

  useEffect(() => {
    async function fetchApi() {
      const oi = await fetchRecipeInfos('cocktail', 'search', 's', '');
      dispatchResults(await oi.drinks);
    }
    fetchApi();
  }, [dispatchResults, type]);

  useEffect(() => {
    const oneResult = async () => {
      if (results !== undefined && results.length === 1) {
        history.push(`/drinks/${results[0].idDrink}`);
      }
    };
    const nullResult = async () => {
      const oi2 = await fetchRecipeInfos('cocktail', 'search', 's', '');
      // console.log(oi2);
      await dispatchResults(await oi2.drinks);
    };
    if (results === null || results === undefined) {
      nullResult();
    }
    oneResult();
  }, [dispatchResults, history, results]);
  // console.log(results);
  const mN = 12;
  return (
    <div className="container-recipes">
      <Header />
      <div className="recipe-container">
        {results === null || results === undefined
          ? <img src={ profilewallp } alt="loading" />
          : results.slice(0, mN).map((e, i) => (
            <Recipes
              key={ i }
              index={ i }
              name={ e.strDrink }
              img={ e.strDrinkThumb }
            />))}
      </div>
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
