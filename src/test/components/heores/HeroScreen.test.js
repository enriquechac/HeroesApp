import { mount, shallow } from 'enzyme';
import { MemoryRouter, Redirect, Route } from 'react-router';
import { HeroScreen } from '../../../components/heores/HeroScreen';

describe('Pruebas en el componente <HeroScreen/>', () => {
    const historyMock = {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn(),
    };

    test('Debe de mostrar el componente redirect si no hay argumentos en el URL', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <HeroScreen history={historyMock} />
            </MemoryRouter>
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('Redirect').exists()).toBe(true);
    });

    test('Debe de mostrar un heroe si el parametro existe', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route path="/hero/:heroeId" component={HeroScreen} />
            </MemoryRouter>
        );
        expect(wrapper.find('.row').exists()).toBe(true);
    });

    test('Debe de regresar a la pantalla anterior con push ', () => {
        const historyMock = {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn(),
        };

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route
                    path="/hero/:heroeId"
                    component={() => <HeroScreen history={historyMock} />}
                />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect(historyMock.push).toHaveBeenCalledWith('/');
        expect(historyMock.goBack).not.toHaveBeenCalled();
    });

    test('Debe de regresar a la pantalla anterior goBack ', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route
                    path="/hero/:heroeId"
                    component={() => <HeroScreen history={historyMock} />}
                />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect(historyMock.push).toHaveBeenCalledTimes(0);
        expect(historyMock.goBack).toHaveBeenCalled();
    });

    test('Debe de llamar el redirect si el hero no existe', () => {
        const historyMock = {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn(),
        };

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/-------']}>
                <Route
                    path="/hero/:heroeId"
                    component={() => <HeroScreen history={historyMock} />}
                />
            </MemoryRouter>
        );
        expect(wrapper.text()).toBe('');
    });
});
