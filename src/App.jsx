import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import React, { useEffect } from 'react';


import GlobalStyle from './assets/styles/Global';
import { Config } from './Config';

import CountryService from './services/CountryService';
import { connect } from 'react-redux';
import { loadCountries } from './redux/actions/actions';
import { bindActionCreators } from 'redux';

import Home from './pages/Home/Home'
import Favs from './pages/Favs/Favs'
import Detail from './pages/Detail/Detail'

const App = props => {
   const { theme, loadCountries } = props;
   document.title = Config.PAGE_TITLE;

   useEffect(() => {
      const countryService = new CountryService();
      countryService.getAllCountriesFromApi().then(res => {
         console.log(res.data)
         loadCountries(res.data);
      });
   }, [loadCountries]);

   return (
      <ThemeProvider theme={{ scheme: theme.scheme }}>
         <BrowserRouter>
            <Switch>
               <Route exact path="/" render={() => <Home />} />
               <Route path="/country/:numericcode" render={localProps => <Detail {...localProps} />} />
               <Route path="/favs" render={() => <Favs />} />
            </Switch>
         </BrowserRouter>
         <GlobalStyle />
      </ThemeProvider>
   );
};

const mapDispatchToProps = dispatch => bindActionCreators({ loadCountries }, dispatch);

const mapStateToProps = store => ({
   theme: store.changeThemeReducer.theme
});

export default connect(mapStateToProps, mapDispatchToProps)(App);  