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

function MainFoods({ results, type, dispatchResults }) {
  const history = useHistory();

  useEffect(() => {
    async function fetchApi() {
      const oi = await fetchRecipeInfos('meal', 'search', 's', '');
      dispatchResults(await oi.meals);
    }
    fetchApi();
  }, [dispatchResults, type]);

  useEffect(() => {
    const oneResult = async () => {
      if (results !== null && results.length === 1 && results[0].idMeal !== '52968') {
        history.push(`/foods/${results[0].idMeal}`);
      }
    };
    const nullResult = async () => {
      const oi2 = await fetchRecipeInfos('meal', 'search', 's', '');
      await dispatchResults(await oi2.meals);
    };
    if (results === null) {
      nullResult();
    }
    oneResult();
  }, [dispatchResults, history, results]);

  const mN = 12;
  return (
    <div className="container-recipes">
      <Header />
      <div className="recipe-container">
        {results === null || results.length === 0
          ? <img src={ profilewallp } alt="loading" />
          : results.slice(0, mN).map((e, i) => (
            <Recipes
              key={ i }
              index={ i }
              name={ e.strMeal }
              img={ e.strMealThumb }
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

MainFoods.propTypes = {
  type: PropTypes.string.isRequired,
  dispatchResults: PropTypes.func.isRequired,
  results: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainFoods);
