import { useCallback, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import positives from "../../data/positive";

function ContractBtns({ setValue }) {
  const { state: { contract, accounts } } = useEth();
  const [inputValue, setInputValue] = useState("");
  const nums = [0.531283905, 0.531385916, 0.531453759, 0.531492545, 0.531509996, 0.531521744, 0.531541864, 0.531571537, 0.531605781, 0.531637952, 0.531652455, 0.531633435, 0.531579212, 0.531495468, 0.531391317, 0.531282022, 0.53118071, 0.5310906, 0.531007734, 0.530924564, 0.530825145, 0.530693351, 0.530527107, 0.530333738, 0.530124394, 0.529913202, 0.529711292, 0.529524004, 0.52934963, 0.529179394, 0.528996252, 0.528783337, 0.528538287, 0.528270703, 0.527993068, 0.527717772, 0.527454536, 0.527209281, 0.5269834, 0.526768922, 0.526546756, 0.526298543, 0.526023094, 0.525732117, 0.525437652, 0.525150764, 0.524880197, 0.524630911, 0.524406407, 0.524200785, 0.523992976, 0.523762821, 0.523510879, 0.52325016, 0.522991407, 0.522745011, 0.522519268, 0.522318473, 0.522146658, 0.521999963, 0.521856867, 0.521695927, 0.521518678, 0.521338272, 0.521164619, 0.521007772, 0.520875797, 0.520772564, 0.520701744, 0.520659706, 0.520624776, 0.520575224, 0.520512464, 0.520449274, 0.520395499, 0.520361254, 0.520354636, 0.520379441, 0.52043893, 0.520527899, 0.520624499, 0.520707884, 0.520777705, 0.520845601, 0.520922209, 0.521018171, 0.52114194, 0.521297615, 0.521486873, 0.521702288, 0.521922742, 0.522129406, 0.522319578, 0.522502389, 0.522689693, 0.522893068, 0.523121637, 0.523379702, 0.523665904, 0.523970902, 0.524275486, 0.524562555, 0.524828456, 0.525079168, 0.525326131, 0.525582593, 0.525859008, 0.52615856, 0.526477362, 0.526806405, 0.527128234, 0.527427024, 0.527700051, 0.527950975, 0.528189248, 0.52842987, 0.528684943, 0.528955348, 0.529235184, 0.529517202, 0.529785384, 0.5300249, 0.530233972, 0.530415671, 0.530577501, 0.53073489, 0.530901264, 0.53107644, 0.53125412,];

  const handleInputChange = e => {
      setInputValue(e.target.value);
  };

  const read = async () => {
    const value = await contract.methods.read().call({ from: accounts[0] });
    setValue(value);
  };

  const write = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputValue === "") {
      alert("Please enter a value to write.");
      return;
    }
    const newValue = parseInt(inputValue);
    await contract.methods.write(newValue).send({ from: accounts[0] });
  };

  const run = async() => {
    nums.map((vals) =>contract.methods.write(parseInt(vals)).send({ from: accounts[0] }));
    // const newValue = parseInt(678);
    // await contract.methods.write(newValue).send({ from: accounts[0] });
  };

  return (
    <div className="btns">

    {/* <div>{positives.map((v) => <div>{v}</div>)}</div> */}

    {/* <div><button onClick={run}>RUN</button></div> */}

      <div onClick={write} className="input-btn">
        Set(<input
          type="text"
          placeholder="int"
          value={inputValue}
          onChange={handleInputChange}
        />)
      </div>

      <div>
        <button onClick={read}>Call</button>
      </div>
    </div>
  );
}

export default ContractBtns;
