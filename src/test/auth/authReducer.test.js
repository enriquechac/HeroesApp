import { authReducer } from '../../auth/authReducer';
import { types } from '../../types/types';

describe('Pruebas en authReducer', () => {
    // const state = {
    //     name: 'Enrique',
    //     logged: true,
    // };

    test('Debe de retornar el estado por defecto', async () => {
        const state = await authReducer({ logged: false }, {});
        expect(state).toEqual({ logged: false });
    });

    test('Debe de autenticar y colocar el name del usuario', async () => {
        const action = {
            type: types.login,
            payload: {
                name: 'Enrique',
            },
        };

        const state = await authReducer({ logged: false }, action);

        expect(state).toEqual({
            name: 'Enrique',
            logged: true,
        });
    });
    test('Debe de borrar el name del usuario y logged en false', async () => {
        const action = {
            type: types.logout,
        };

        const state = await authReducer(
            {
                name: 'Enrique',
                logged: true,
            },
            action
        );

        expect(state).toEqual({ logged: false });
    });
});
