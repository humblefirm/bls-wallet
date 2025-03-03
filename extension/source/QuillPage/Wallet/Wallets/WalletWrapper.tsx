import { FunctionComponent, useEffect, useState } from 'react';
import Button from '../../../components/Button';
import { WalletSummary } from './WalletSummary';

export interface IWallet {
  address: string;
  name: string;
  ether: number;
  networks: number;
  tokens: number;
}

export const WalletsWrapper: FunctionComponent = () => {
  const [selected, setSelected] = useState<number>(0);
  const [wallets, setWallets] = useState<IWallet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const setSelectedAddress = (address: string) => {
    window.QuillController().getApi().setSelectedAddress(address);
  };

  useEffect(() => {
    setLoading(true);

    const accounts = window.KeyringController().getAccounts();

    setWallets(
      accounts.map((address: string, index: number) => {
        return {
          address,
          name: `wallet ${index}`,
          ether: 0,
          networks: 1,
          tokens: 0,
        };
      }),
    );
    setLoading(false);

    setSelectedAddress(accounts[0]);
  }, []);

  return (
    <div className="">
      <div className="flex justify-between place-items-center">
        <div className="text-body">Wallets</div>
        <Button
          onPress={async () => {
            await window.KeyringController().createHDAccount();
            window.location.reload();
          }}
          children={'Add Wallet'}
          className="btn-secondary"
        />
      </div>

      {loading ? (
        'Loading'
      ) : (
        <div className="flex flex-col gap-6 mt-8">
          {wallets.map((wallet, index) => (
            <WalletSummary
              onClick={() => {
                setSelected(index);
                setSelectedAddress(wallet.address);
              }}
              key={wallet.name}
              wallet={wallet}
              expanded={index === selected}
            />
          ))}
        </div>
      )}
    </div>
  );
};
