const setPageName = (history, setTitle, dispatchSetApi, recipes) => {
  if (history.location.pathname === '/profile') {
    setTitle('Profile');
  }
  if (history.location.pathname === '/drinks') {
    setTitle('Drinks');
    dispatchSetApi('cocktail');
  }
  if (history.location.pathname === '/foods') {
    setTitle('Foods');
    dispatchSetApi('meal');
  }
  if (history.location.pathname === '/done-recipes') {
    setTitle(recipes.doneRecipes);
  }
  if (history.location.pathname === '/favorite-recipes') {
    setTitle(recipes.favoriteRecipes);
  }
};

export default setPageName;
