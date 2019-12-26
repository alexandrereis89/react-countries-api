import React from 'react';
import Header from '../../components/Header/Header';
import CountryList from '../../components/CountryList/CountryList'
import { connect } from 'react-redux';
import { Container } from '../../assets/styles/Lib';

const Home = props => {
   const { countries } = props;
   return (
      <>
         <Header />
         <Container >
            <CountryList countries={countries} />
         </Container>
      </>
   )

}

const mapStateToProps = store => ({
   countries: store.setCountriesReducer.countries
})

export default connect(mapStateToProps)(Home);