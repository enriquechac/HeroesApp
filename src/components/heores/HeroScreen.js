import React, { useMemo } from 'react';
import { Redirect, useParams } from 'react-router';
import { heroImages } from '../../helpers/heroImages';
import { getHeroesById } from '../../selectors/getHeroesById';

// import batman from '../../assets/heroes/dc-batman.jpg';

// const heroImages = require.context('../../assets/heroes', true);

export const HeroScreen = ({ history }) => {
    const { heroeId } = useParams();
    const hero = useMemo(() => getHeroesById(heroeId), [heroeId]);

    // console.log('Hero: ', hero, 'HeroId: ', heroeId);

    if (!hero) {
        return <Redirect to="/" />;
    }

    const {
        superhero,
        id,
        publisher,
        alter_ego,
        first_appearance,
        characters,
    } = hero;

    const handleReturn = () => {
        if (history.length <= 2) {
            history.push('/');
        } else {
            history.goBack();
        }
    };

    return (
        <div>
            <h1>HeroScreen</h1>
            <hr />
            <div className="row mt-5 animate__animated animate__fadeIn">
                <div className="col-4">
                    <img
                        // src={`../assets/heroes/${id}.jpg`} / Usando assets en la carpeta public
                        // src={batman} / Al usar import
                        src={heroImages(`./${id}.jpg`).default}
                        alt={superhero}
                        className="img-thumbnail"
                    />
                </div>
                <div className="col-8">
                    <h3>{superhero}</h3>
                    <ul className="list-goup list-group-flush">
                        <li className="list-group-item">
                            <b>Alter ego: {alter_ego}</b>
                        </li>
                        <li className="list-group-item">
                            <b>Publisher: {publisher}</b>
                        </li>
                        <li className="list-group-item">
                            <b>First Appearance: {first_appearance}</b>
                        </li>
                    </ul>
                    <h5>Characters</h5>
                    <p>{characters}</p>
                    <button
                        className="btn btn-outline-info"
                        onClick={handleReturn}
                    >
                        Return
                    </button>
                </div>
            </div>
        </div>
    );
};
