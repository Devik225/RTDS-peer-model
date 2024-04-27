import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Web3 from 'web3';
import positives from "../../data/positive";
import negatives from "../../data/negative";

const web3 = new Web3("http://127.0.0.1:7545");

// Station credentials
const key = "0x0380230621Bf79A3B955a4c23a4A92c42A469DCe";
const senderAddress = key;
const senderPrivateKey = "0x4a50ed2e608caea03d742611e1eec36fd20dcca53f64cc2d22ecd85251988c42";


function Index() {
  const { state: { contract, accounts } } = useEth();
  const [value, setValue] = useState("?");
  const [station1, setStation1] = useState(key);
  const [station2, setStation2] = useState(key);
  const [contractAddress, setContractAddress] = useState("not deployed yet")
  

  // const positives = [0.531283905, 0.539385916, 0.453759, 0.531492545, 0.531509996, 0.531521744, 0.531541864, 0.531571537, 0.531605781, 0.531637952, 0.531652455, 0.531283905, 0.531385916, 0.531453759, 0.531492545, 0.531509996, 0.531521744, 0.531541864, 0.531571537, 0.531605781, 0.531637952, 0.531652455];
  // const negatives = [-0.431285696, -0.531387708, -0.531455551, -0.531494337, -0.431511788, -0.531523535, -0.531543655, -0.531573329, -0.531607573, -0.531639744, -0.470654247, -0.431285696, -0.531387708, -0.531455551, -0.531494337, -0.431511788, -0.531523535, -0.531543655, -0.531573329, -0.531607573, -0.531639744, -0.470654247]; 
  let [cTransactions, setCTransactions] = useState([]);
  let [transactions, setTransactions] = useState([]);
  

  let addTransact = (v) => {
    setCTransactions([v]);
  }    
  

  const handleS1Change = e => {
    setStation1(e.target.value);
  };

  const handleS2Change = e => {
    setStation2(e.target.value);
  };

  const callAddress = async () =>{
    const tempAdd = await contract.methods.getContractAddress().call({from: station1 });
    setContractAddress(tempAdd);
  }

  const deployContract = async () =>{
    await contract.methods.setStations(station1, station2).send({from: station1});
    callAddress();
  };

  const delay = async (ms) => {
    return new Promise((resolve) => 
        setTimeout(resolve, ms));
};


const startTransfer = async () =>{
  let temparr=[];
  let cnt = 0;
  for(let i=0; i<positives.length; i++){                                   
  const message = parseInt(positives[i]*1000000);
  // const signature = web3.eth.accounts.sign(message, senderPrivateKey);
  // const {signedMessage, v, r, s} = signature;
  // console.log(signature);
  // const sent = (await contract.methods.executeWrite(message, v, r, s).send({ from: station1}));
  // const sent = (await contract.methods.write(message).send({ from: station1}));

  //Processing transaction
  const functionSignature = contract.methods.write(message, message, message, message).encodeABI(); 
    const nonce = await web3.eth.getTransactionCount(station1, 'pending');
    const gasEstimation = await contract.methods.write(message, message, message, message).estimateGas({ from: station1 });
  // console.log(gasEstimation);

  const rawTransaction = {
      nonce: web3.utils.toHex(nonce),
      from: station1,
      to: contractAddress,
      maxFeePerGas: web3.utils.toHex(web3.utils.toWei('20', 'gwei')), 
      maxPriorityFeePerGas: web3.utils.toHex(web3.utils.toWei('4.5', 'gwei')),
      // gasPrice: await web3.eth.getGasPrice(), 
      gasLimit: web3.utils.toHex(gasEstimation+10000),
      data: functionSignature
  };

  // Signing transaction
  const signedTx = await web3.eth.accounts.signTransaction(rawTransaction, senderPrivateKey);

  // Serializing the signed transaction
  const serializedTx = signedTx.rawTransaction;

  const startTime = new Date();
  const sent = await web3.eth.sendSignedTransaction(serializedTx);  
  // console.log(sent);
  // await delay(20000);
  // let receipt = await web3.eth.getTransactionReceipt(sent.transactionHash);
  // // console.log(receipt);
  // while (receipt.type == "0x0") {
  //   // Sleep for a short interval before checking again
  //   await new Promise(resolve => setTimeout(resolve, 1000));
  //   receipt = await web3.eth.getTransactionReceipt(sent.transactionHash);
  //   console.log("delay...");
  // } 
  let received = await contract.methods.read().call({from: station2});
  while(received.length -1 != cnt){
    received = await contract.methods.read().call({from: station2});
    // console.log("delay...");
  }
  const operationEndTime = new Date();
  console.log(operationEndTime - startTime + "ms");

  const receipt = await web3.eth.getTransactionReceipt(sent.transactionHash);
  // console.log(receipt);
  console.log(received);

  setValue(received);
  const p1 = received[cnt][0];
  cnt++;
  const n1 = Math.ceil(negatives[i]*1000);
  let isFault;
  if(parseInt(message)+parseInt(n1) > 43){isFault = "Fault"}
  else{isFault = "No fault"}
  const customSent = { id: cnt, status:isFault, negative:n1, positive:p1, blockHash:sent.blockHash, blockNumber: sent.blockNumber, transactionHash: sent.transactionHash, gasUsed: sent.gasUsed };

  // updating the states
  temparr.push(customSent);
  setTransactions(prevTransactions => [...prevTransactions, customSent]);
  addTransact(customSent);
  };
};





  return (
    <div className="index">

      <div className="navbar">
        <div>Model for transferring data between power stations using Etherium Blockchain</div>
        <div className="prof">Thesis project under Dr. S R Mohanty</div>
      </div>

      <div className="head">
        Add Station addresses:
      </div>

      <div className="field">
        Sub Station 1 : 
        <input type="text" 
        placeholder="enter station 1 address"
        value={station1}
        onChange={handleS1Change}/>          
        <button>Set</button>
      </div>

      <div className="field">
        Sub Station 2 :
        <input type="text" 
        placeholder="enter station 2 address"
        value={station2}
        onChange={handleS2Change}/>  
        <button>Set</button>
      </div>

      <button className="btn" onClick={deployContract}>Deploy Smart Contract</button>

      <button className="btn" onClick={startTransfer}>Start the Transfer</button>

      <div className="prof">Contract Address :<span>{contractAddress}</span></div>

      

      <div className="head">Current Block:</div>
      <table className="table">
        <tr>
          <th>Block No.</th>
          <th>Block Hash</th>
          <th>Transaction Hash</th>
          <th>Gas used</th>
          <th>Sent</th>
          <th>Received</th>
          <th>Status</th>
        </tr>
          {cTransactions.map((val)=><tr >
            <td>{val.blockNumber}</td>
            <td>{val.blockHash}</td>
            <td>{val.transactionHash}</td>
            <td>{val.gasUsed} Wei</td>
            <td>{val.positive} A</td>
            <td>{val.negative} A</td>
            <td>{val.status}</td>
          </tr>)}
      </table>

      <div className="head">All Blocks:</div>
      <table className="table">
        <tr>
          <th>Block No.</th>
          <th>Block Hash</th>
          <th>Transaction Hash</th>
          <th>Gas used</th>
          <th>Sent</th>
          <th>Received</th>
          <th>Status</th>
        </tr>
          {transactions.map((val)=><tr >
            <td>{val.blockNumber}</td>
            <td>{val.blockHash}</td>
            <td>{val.transactionHash}</td>
            <td>{val.gasUsed} Wei</td>
            <td>{val.positive} A</td>
            <td>{val.negative} A</td>
            <td>{val.status}</td>
          </tr>)}
      </table>


      {/* {index} */}
    </div>
  );
}

export default Index;
