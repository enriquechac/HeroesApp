import { mount, shallow } from 'enzyme';
import { AuthContext } from '../../../auth/AuthContext';
import { LoginScreen } from '../../../components/login/LoginScreen';
import { types } from '../../../types/types';

describe('Pruebas en <LoginScreen/>', () => {
    const contextValue = {
        dispatch: jest.fn(),
    };

    const historyValue = {
        replace: jest.fn(),
    };

    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <LoginScreen history={historyValue} />
        </AuthContext.Provider>
    );
    test('Debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Debe de realizar el dispatch y la navegacion', () => {
        const handleClick = wrapper.find('button').prop('onClick');

        handleClick();

        expect(contextValue.dispatch).toHaveBeenCalledWith({
            type: types.login,
            payload: {
                name: 'Enrique',
            },
        });

        expect(historyValue.replace).toHaveBeenCalledWith('/');

        localStorage.setItem('lastpath', '/dc');
        handleClick();

        expect(historyValue.replace).toHaveBeenCalledWith('/dc');
    });
});
