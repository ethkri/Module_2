import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Avirbhav.sol/Avirbhav.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [score, setScore] = useState(undefined);
  const [newTeam, setNewTeam] = useState("");
  const [newScore, setnewScore] = useState("");
  const [team, setTeam] = useState("");

  const contractAddress = "0xF03E8065a7F7ddA1780103372298a3dB1f62656C";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getScore = async () => {
    console.log("getScore");
    if (atm) {
      console.log("inside atm");
      const _score = await atm.getScore(team, {
        from: account[0],
      });
      setScore(_score);
      console.log(_score);
    }
  };

  const addATeam = async () => {
    if (atm) {
      console.log(`newTeam ${newTeam}, message: ${newScore}`);
      let tx = await atm.addATeam(newTeam, newScore, {
        from: account[0],
      });
      await tx.wait();
    }
  };

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>;
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return (
        <button onClick={connectAccount}>
          Please connect your Metamask wallet
        </button>
      );
    }
    return (
      <div>
        <p>Your Account: {account[0]}</p>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>Welcome to Avirbhav</h1>
      </header>
      {initUser()}
      <style jsx>
        {`
          .container {
            text-align: center;
          }
        `}
      </style>
      <div>
        Enter a Team Name:
        <input
          type="text"
          value={newTeam}
          placeholder="Team Name"
          onChange={(e) => setNewTeam(e.target.value)}
        />
        <br></br>
        Enter the score of that team:
        <input
          type="text"
          placeholder="Score"
          value={newScore}
          onChange={(e) => setnewScore(e.target.value)}
        />
        <br></br>
        <button onClick={addATeam}>Send Message</button>
        <br></br>
        Enter the Name of the Team to Check score
        <input
          type="text"
          placeholder="Team Name"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
        />
        <br></br>
        <button onClick={getScore}>Get Score</button>
      </div>
    </main>
  );
}
