import React, { useMemo } from 'react';
import queryString from 'query-string';

import { useLocation } from 'react-router';
import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../heores/HeroCard';
import { getHeroesByName } from '../../selectors/getHeroesByName';

export const SearchScreen = ({ history }) => {
    const location = useLocation();
    const { q = '' } = queryString.parse(location.search);

    const initialForm = {
        searchInput: q,
    };

    const [formValues, handleInputChange] = useForm(initialForm);

    const { searchInput } = formValues;

    const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);

    const handleSearch = (e) => {
        e.preventDefault();
        // console.log('Search...', searchInput);
        history.push(`?q=${searchInput}`);
    };

    return (
        <div>
            <h1>Search Screen</h1>
            <hr />
            <div className="row">
                <div className="col-5">
                    <h4>Search Form</h4>
                    <hr />
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            value={searchInput}
                            name="searchInput"
                            placeholder="Find your hero"
                            onChange={handleInputChange}
                            autoComplete="off"
                            className="form-control"
                        />
                        <button
                            type="submit"
                            className="btn w-100 btn-outline-primary my-3"
                        >
                            Search..
                        </button>
                    </form>
                </div>
                <div className="col-7">
                    <h4>Results</h4>
                    <hr />
                    {q === '' && (
                        <div className="alert alert-info"> Search a hero </div>
                    )}

                    {q !== '' && heroesFiltered.length === 0 && (
                        <div className="alert alert-info">
                            Hero {q} was not found
                        </div>
                    )}

                    {heroesFiltered.map((hero) => (
                        <HeroCard key={hero.id} {...hero} />
                    ))}
                </div>
            </div>
        </div>
    );
};
