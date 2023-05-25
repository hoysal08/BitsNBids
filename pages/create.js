import Navbar from '../components/NavBar';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import { FileUploader } from "react-drag-drop-files";
import { METAMASK_NOT_INSTALLED, CHAINID_NOT_SUPPORTED, FILE_TYPES } from '../constants/constants';
import mintABI from '../public/MintABI.json';
import { Web3Storage } from 'web3.storage'

function getAccessToken () {
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDIxQzc5Qjk4ZTE1ODIwNWEwNzMzMzM1NzEyZWIwMDRiRjhhN0Q0QzciLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjE2MzE4MDAxOTgsIm5hbWUiOiJTY2F0dGVyIn0.H0D97M3xr4g3eP7tn_8URf31vQYz5KrBT2NjB8gZB24";
}

function makeStorageClient () {
  return new Web3Storage({ token: getAccessToken() })
}

async function storeFiles(files) {
    const client = makeStorageClient()
    const cid = await client.put(files)
    return cid
  }

const Create = () => {
    const[walletContext, setWalletContext] = useState();
    const [file, setFile] = useState(null);
    const [createObjectURL, setCreateObjectURL] = useState(null);
    const handleChange = file => {
        console.log("File Data: ", file);
        setFile(file);
        setCreateObjectURL(URL.createObjectURL(file));
    };

    const mintNFT = async (ipfsLink) => {
        console.log("Walet Context: ", walletContext);
        const mintContract = new ethers.Contract(walletContext.chain.mintContract, mintABI, walletContext.provider);
        const signedMintContract = mintContract.connect(walletContext.signer);

        console.log("Signed Mint: ", signedMintContract);

        let maxSupply = await signedMintContract.maxSupply();
        let tokenCount = await signedMintContract.tokenCount();

        console.log("Max Supply:", maxSupply);

        const txnReceipt = await signedMintContract.mintToken(ipfsLink);

        console.log("Transaction Receipt: ", txnReceipt);
    }

    const uploadToIPFS = async () => {
        if(file) {
            let files = [];
            files.push(file);
            let ipfsLink = await storeFiles(files);
            console.log("IPFS Link: ", ipfsLink);

            let jsonFileName = "meta.json";
            let ipfsLinkFinal = "ipfs://" + ipfsLink + "/" + file.name;
                
            const jsonFile = new File([`{\"image\": \"${ipfsLinkFinal}\"}`], jsonFileName, {
                lastModified: Date.now(),
                type: "json"
            });

            let jsonFiles = []
            jsonFiles.push(jsonFile);
            let outputLink = await storeFiles(jsonFiles);
            console.log("Output Link: ", outputLink);

            //Contract Call
            mintNFT("ipfs://" + outputLink + "/" + jsonFileName);
        }
    }

    useEffect(() => {
        if(walletContext && walletContext.errorCode === METAMASK_NOT_INSTALLED) {
            console.log("Fraction and metamask not installed!!");
        } else if(walletContext && !walletContext.errorCode) {
            // fetchAllFractionData(walletContext.address, setOwnerFractionData);
        }
    },[walletContext]);

    return (
        <div className="w-full min-h-content bg-gin-50">
            <Navbar pageLoad="Create" setWalletContext={setWalletContext}/>
            <div className="h-screen z-10 w-full pb-20 py-10">
                {
                    (walletContext && !walletContext.loading && walletContext.errorCode === METAMASK_NOT_INSTALLED) ? (
                        <>
                            <div className="h-screen w-full bg-gin-50 flex items-center justify-center">
                                <a className="rounded-lg bg-stiletto-500 text-white py-4 px-6 md:py-8 md:px-8 text-base md:text-lg font-bold hover:bg-stiletto-400" href="https://metamask.io/" rel="noreferrer" target="_blank"> Install Metamask </a>
                            </div>
                        </>
                    ) : ( (walletContext && !walletContext.loading && walletContext.errorCode === CHAINID_NOT_SUPPORTED) ? (
                    <>
                        <div className="h-screen w-full bg-gin-50">
                        </div> 
                    </>
                        ) : 
                        (
                            <div className="pt-28 z-0 h-5/6 w-full flex justify-center items-center">
                                <div className="flex flex-col justify-center"> 
                                    {
                                        file ? (
                                            <div className="flex flex-col items-center mt-28">
                                                <img className="rounded-lg h-80" src={createObjectURL} />
                                                <button onClick={() => uploadToIPFS()} className="rounded-lg w-full h-12 mt-2 bg-stiletto-500 hover:bg-stiletto-400 text-white font-bold text-xl"> Mint</button>
                                            </div>) : 
                                        <FileUploader 
                                            multiple={false}
                                            label="Upload or drop a file right here"
                                            handleChange={handleChange} 
                                            name="nft" 
                                            types={FILE_TYPES} 
                                        />
                                    }
                                </div>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    )
}

export default Create;