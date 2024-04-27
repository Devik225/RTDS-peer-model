import React, { useState } from "react";
import { ethers } from "ethers";

function App() {
  const [transactionHash, setTransactionHash] = useState("");
  const [error, setError] = useState(null);

  const performTransaction = async () => {
    try {
      // Connect to Ganache
      const provider = new ethers.providers.JsonRpcProvider("http://localhost:7545");

      // Load wallet from a private key
      const privateKey = "0xf110cffb44de54cf76f79d0767f21dd419af77b598d2f5f66cc12134ca23412d";
      const wallet = new ethers.Wallet(privateKey, provider);

      // Construct transaction
      const transaction = {
        to: "0x3468F70a2c361d9a1Fba4052bE76321B21Bf7777",
        value: ethers.utils.parseEther("0.1"), // Sending 0.1 ETH
        gasLimit: 21000, // Gas limit
        gasPrice: ethers.utils.parseUnits("20", "gwei"), // Gas price in Gwei
      };

      // Sign the transaction
      const signedTransaction = await wallet.signTransaction(transaction);

      // Broadcast the signed transaction
      const txResponse = await provider.sendTransaction(signedTransaction);

      // Wait for transaction confirmation
      await txResponse.wait();

      // Set transaction hash
      setTransactionHash(txResponse.hash);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Presigned Transaction Example</h1>
      <button onClick={performTransaction}>Perform Transaction</button>
      {transactionHash && <p>Transaction Hash: {transactionHash}</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default App;
