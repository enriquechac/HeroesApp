import { mount } from 'enzyme';
import { MemoryRouter, Router } from 'react-router';
import { AuthContext } from '../../../auth/AuthContext';
import { Navbar } from '../../../components/ui/Navbar';
import { types } from '../../../types/types';

describe('Pruebas en el componente <Navbar/>', () => {
    const historyMock = {
        push: jest.fn(),
        location: {},
        replace: jest.fn(),
        listen: jest.fn(),
        createHref: jest.fn(),
    };

    const authValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: 'Enrique',
        },
    };

    const wrapper = mount(
        <MemoryRouter>
            <AuthContext.Provider value={authValue}>
                <Router history={historyMock}>
                    <Navbar />
                </Router>
            </AuthContext.Provider>
        </MemoryRouter>
    );

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Se debe de montar el componente correctamente ', () => {
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe('Enrique');
    });

    test('Debe de llamar el logout y usar el history', () => {
        wrapper.find('button').prop('onClick')();
        expect(authValue.dispatch).toHaveBeenCalledTimes(1);
        expect(authValue.dispatch).toHaveBeenCalledWith({ type: types.logout });
        expect(historyMock.replace).toHaveBeenCalledWith('/login');
    });
});
