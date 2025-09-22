import { TonConnectUIProvider, useTonConnectUI, useTonAddress } from '@tonconnect/ui-react';
import './App.css';

// 🔑 GANTI dengan URL GitHub Pages nanti
const manifestUrl = 'https://fragment-sell.github.io/ton-simple-app/tonconnect-manifest.json';

function TransferApp() {
  const [tonConnectUI] = useTonConnectUI();
  const address = useTonAddress();
  const connected = !!address;

  // ✅ FUNGSI TRANSFER SEDERHANA
  const sendTON = async () => {
    const recipient = prompt('Masukkan address penerima:');
    const amount = prompt('Jumlah TON:');
    
    if (!recipient || !amount) return;

    try {
      // Konversi TON ke nanotons (1 TON = 1e9 nanotons)
      const amountInNano = (parseFloat(amount) * 1000000000).toString();
      
      const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 300, // 5 menit
        messages: [
          {
            address: recipient,
            amount: amountInNano
          }
        ]
      };

      const result = await tonConnectUI.sendTransaction(transaction);
      alert(`✅ Transfer berhasil!\nTx Hash: ${result.boc}`);
      
    } catch (error) {
      if (error.message.includes('rejection')) {
        alert('❌ Transfer dibatalkan user');
      } else {
        alert('❌ Error: ' + error.message);
      }
    }
  };

  return (
    <div className="container">
      <header>
        <h1>💎 TON Transfer</h1>
        <p>Kirim TON dengan mudah</p>
      </header>

      <div className="card">
        {!connected ? (
          // 🔗 TAMPILAN BELUM CONNECT
          <div className="connect-section">
            <h3>🔗 Connect Wallet</h3>
            <p>Connect wallet TON Anda untuk mulai transfer</p>
            <button 
              onClick={() => tonConnectUI.connectWallet()}
              className="btn-connect"
            >
              Connect Wallet
            </button>
          </div>
        ) : (
          // ✅ TAMPILAN SUDAH CONNECT
          <div className="connected-section">
            <div className="wallet-info">
              <span className="status-badge">✅ Connected</span>
              <p className="address">
                {address.slice(0, 8)}...{address.slice(-6)}
              </p>
            </div>
            
            <div className="transfer-section">
              <h3>💸 Transfer TON</h3>
              <button onClick={sendTON} className="btn-transfer">
                Kirim TON
              </button>
              <p className="hint">Klik untuk transfer TON</p>
            </div>

            <button 
              onClick={() => tonConnectUI.disconnect()}
              className="btn-disconnect"
            >
              🔌 Disconnect
            </button>
          </div>
        )}
      </div>

      <footer>
        <p>Powered by TON • Simple & Fast</p>
      </footer>
    </div>
  );
}

// 🎯 APP UTAMA
function App() {
  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <TransferApp />
    </TonConnectUIProvider>
  );
}

export default App;
