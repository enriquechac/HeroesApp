import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router';
import { SearchScreen } from '../../../components/search/SearchScreen';

describe('Pruebas en <SearchScreen/>', () => {
    test('Debe de mostrarse correctamente con valores de defecto', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <Route path="/search" component={SearchScreen} />
            </MemoryRouter>
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.alert-info').text().trim()).toBe('Search a hero');
    });

    test('Debe de mostrar a batman y el input con el valor del query string', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Route path="/search" component={SearchScreen} />
            </MemoryRouter>
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('input').prop('value')).toBe('batman');
    });

    test('Debe de mostrar un herro si no se encuentra el hero', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=error']}>
                <Route path="/search" component={SearchScreen} />
            </MemoryRouter>
        );

        expect(wrapper).toMatchSnapshot();

        expect(wrapper.find('.alert-info').text().trim()).toBe(
            'Hero error was not found'
        );
    });

    test('Debe de llamr el push del history', () => {
        const history = {
            push: jest.fn(),
        };
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=error']}>
                <Route
                    path="/search"
                    component={() => <SearchScreen history={history} />}
                />
            </MemoryRouter>
        );

        wrapper.find('input').simulate('change', {
            target: {
                name: 'seachText',
                value: 'batman',
            },
        });

        wrapper.find('form').prop('onSubmit')({ preventDefault() {} });

        expect(history.push).toHaveBeenCalledWith('?q=error');
    });
});
