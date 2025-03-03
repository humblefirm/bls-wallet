import { EventEmitter } from 'events';

import ReactDOM from 'react-dom';

import CreateTransaction from './CreateTransaction';
import Page, { PageEvents } from '../components/Page';

import '../ContentScript/index';
import './styles.scss';

const pageEvents = new EventEmitter() as PageEvents;

ReactDOM.render(
  <Page events={pageEvents}>
    <CreateTransaction events={pageEvents} />
  </Page>,
  document.getElementById('create-transaction-root'),
);
