import { FunctionComponent } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import OnboardingPage from './Onboarding/OnboardingPage';
import { WalletPage } from './Wallet/WalletPage';

const QuillPage: FunctionComponent = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/wallet/*" element={<WalletPage />} />
      </Routes>
    </HashRouter>
  );
};

export default QuillPage;
