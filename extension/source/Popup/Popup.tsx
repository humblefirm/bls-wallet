import { Component, ReactNode } from 'react';
import TaskQueue from '../common/TaskQueue';

import type App from '../App';
import { AppState } from '../App';
import LoadingScreen from './components/LoadingScreen';
import Page from '../components/Page';
import WalletHomeScreen from './components/WalletHomeScreen';
import WelcomeScreen from './components/WelcomeScreen';
import KeyEntryScreen from './components/KeyEntryScreen';

import '../styles/index.scss';

type Props = {
  appPromise: Promise<App>;
};

type State = {
  app?: App;
  appState?: AppState;
};

const useNewUI = true;

export default class Popup extends Component<Props, State> {
  cleanupTasks = new TaskQueue();

  constructor(props: Props) {
    super(props);

    this.state = {};

    this.props.appPromise.then((app) => {
      this.setState({ app });

      app.events.on('state', appStateListener);
      this.cleanupTasks.push(() => app.events.off('state', appStateListener));
    });

    const appStateListener = (appState: AppState) => {
      this.setState({ appState });
    };
  }

  componentWillUnmount(): void {
    this.cleanupTasks.run();
  }

  render(): ReactNode {
    if (!this.state.app) {
      return (
        <div className="popup">
          <LoadingScreen />
        </div>
      );
    }

    return (
      <Page classes={['popup']} events={this.state.app.pageEvents}>
        {(() => {
          if (this.state.app.state.privateKey === undefined) {
            return useNewUI ? (
              <WelcomeScreen />
            ) : (
              <KeyEntryScreen app={this.state.app} />
            );
          }

          return <WalletHomeScreen app={this.state.app} />;
        })()}
      </Page>
    );
  }
}
