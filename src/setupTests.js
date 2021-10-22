// learn more about Jest-Dom: https://github.com/testing-library/jest-dom
// import '@testing-library/jest-dom';

// 1. Instalamos Enzyme : npm install --save-dev enzyme

// 1.1 Instalamos Enzyme-to-json : npm install --save-dev enzyme-to-json

// 2. Instalamos Adaptador para React 17: npm install --save-dev @wojtekmaj/enzyme-adapter-react-17 --legacy-peer-deps
// https://github.com/wojtekmaj/enzyme-adapter-react-17

// 3. Pruebas con Hooks con:
//   https://react-hooks-testing-library.com/
//   npm install --save-dev @testing-library/react-hooks

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { createSerializer } from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));
