import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.7.1/ethers.min.js";

const connectBtn = document.getElementById("connectBtn");
const walletAddr = document.getElementById("walletAddr");

async function connectWallet() {
  if (typeof window.ethereum === "undefined") {
    alert("MetaMask is not installed. Please install it to use this DApp!");
    return;
  }

  try {
    // Request account access
    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();

    // Show address in UI
    walletAddr.textContent = address;
    connectBtn.textContent = "Connected ✅";
    connectBtn.disabled = true;

    console.log("Connected account:", address);
  } catch (err) {
    console.error("User rejected request:", err);
  }
}

// Attach click handler
connectBtn.addEventListener("click", connectWallet);
