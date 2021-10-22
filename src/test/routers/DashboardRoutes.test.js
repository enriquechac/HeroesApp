import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { AuthContext } from '../../auth/AuthContext';
import { DashboardRoutes } from '../../routers/DashboardRoutes';

describe('Pruebas en <DashboardRoutes/> debe mostrarse correctamente', () => {
    test('Debe mostrarse correctamente', () => {
        const authValue = {
            dispath: jest.fn(),
            user: {
                logged: true,
                name: 'Enrique',
            },
        };

        const wrapper = mount(
            <MemoryRouter>
                <AuthContext.Provider value={authValue}>
                    <DashboardRoutes />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe('Enrique');
    });
});
