import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createStore from '../../store/create-store';
import { newGame } from '../../store/actions/app';
import Smiley from '../../components/smiley';
import Timer from '../../components/timer';
import Cell from '../../components/cell';
import App from './index';

function createApplication() {
  return new Promise(resolve => {
    const store = createStore();
    store.dispatch(newGame());
    resolve(mount(<Provider store={store}><App /></Provider>));
  });
}

describe('acceptance/smoke tests', () => {
  it('contains smiley ', async function() {
    console.log('Contains one smiley');
    const target = await createApplication();
    expect(target.find(Smiley)).to.have.length(1);
  });

  it('contains one timer', async function() {
    console.log('Contains one timer');
    const target = await createApplication();
    expect(target.find(Timer)).to.have.length(1);
  });

  it('contains 9 rows with 9 columns by default', async function() {
    console.log('Default board size is 9 x 9');
    const target = await createApplication();
    expect(target.find(Cell)).to.have.length(81);
  });
});
