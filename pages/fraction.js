import Navbar from '../components/NavBar'
import { ethers } from 'ethers';
import { useEffect, useReducer, useState } from 'react';
import { BottomBar } from '.'
import { ERC_721, MAX_FRACTION_COUNT, FRACTION_CONTRACT_ADDRESS} from '../constants/constants';
import contractABI from '../public/fractionABI.json';
import ERC721ABI from '../public/ERC721ABI.json';
import { METAMASK_NOT_INSTALLED, CHAINID_NOT_SUPPORTED } from "../constants/constants";

const maxFractionCount = MAX_FRACTION_COUNT;

const executeFractionalisation = async ({walletContext, contractAddress, tokenID, tokenCount}) => {
    const stakingContract = new ethers.Contract(walletContext.chain.fractionContract,contractABI,walletContext.provider);
    const signedStakingContract = await stakingContract.connect(walletContext.signer);

    const tokenAddress = new ethers.Contract(contractAddress, ERC721ABI, walletContext.provider);
    const signedTokenAddress = await tokenAddress.connect(walletContext.signer);
    const tokenApproved = await signedTokenAddress.getApproved(tokenID);

    console.log("Approver is: ", tokenApproved);

    if(tokenApproved.toLowerCase() !== walletContext.chain.fractionContract.toLowerCase()) {
        const txnReceipt = await signedTokenAddress.approve(walletContext.chain.fractionContract,tokenID);
        console.log("Transcation Receipt: ", txnReceipt);
        <div className="bg-green-100 rounded-lg py-5 px-6 mb-4 text-base text-green-700 mb-3" role="alert">
            Transaction has been sent with Reciept: {txnReceipt.hash}
        </div>
    } else {
        console.log("Can fractionalise now!");
        const txnReceipt = await signedStakingContract.fractionalize(contractAddress, tokenID, tokenCount);
        console.log("Transcation Receipt: ", txnReceipt);
        <div className="bg-green-100 rounded-lg py-5 px-6 mb-4 text-base text-green-700 mb-3" role="alert">
            Transaction has been sent with Reciept: {txnReceipt.hash}
        </div>
    }
}

const FractionCard = ({walletNFTsList = [], walletContext}) => {

    const reducer = (state, action) => {
        return state.set(action.key,action.value);
    }

    const [fractionCount, dispatch] = useReducer(reducer,new Map([]));

    const fractionalise = ({key,contractAddress,tokenID}) => {
        const tokenCount = fractionCount.get(key);
        console.log("Fraction Count: ", tokenCount, " Contract: ", contractAddress, " TokenID: ", tokenID);
        if(tokenCount <= 0 || tokenCount > maxFractionCount) {
            <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 z-50" role="alert">
                <span className="font-medium">Fraction Count should be less than {MAX_FRACTION_COUNT}</span>
            </div>
        } else if(walletContext){
            executeFractionalisation({walletContext, contractAddress, tokenID, tokenCount});
        }
    }

    return (
        <>
            <div className="pt-28 z-0 w-full">
                <div className="flex flex-rows justify-center w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-6 lg:gap-10 xl:gap-12">
                        {
                            walletNFTsList.map((data) => 
                                <div className="rounded-lg shadow-lg bg-white w-fit mb-0" key={data.originalAddress + "-" + data.tokenID}>
                                    <div className="m-h-60">
                                        <img className="rounded-t-lg h-80 w-80 md:h-80 md:w-80 lg:h-72 lg:w-72" src={data.nftImage} alt=""/>
                                    </div>
                                    <div>
                                        <div className="px-4 py-2 lg:py-4">
                                            <div className="flex flex-row">
                                                <p className="text-emerald-700 text-sm font-semibold mb-2">Original Address: </p>
                                                <div className="flex-1" />
                                                <a className="text-sm text-emerald-900 hover:text-emerald-700" href={`${walletContext.chain.blockExplorer + data.originalAddress}`} rel="noreferrer" target="_blank">{data.originalAddress.substring(0,2) + "..." + data.originalAddress.substring(data.originalAddress.length-4,data.originalAddress.length)} </a> 
                                            </div>
                                            <div className="flex flex-row">
                                                <p className="text-emerald-700 text-sm font-semibold mb-2">Token Id:</p>
                                                <div className="flex-1" />
                                                <p className="text-sm text-emerald-900">{data.tokenID}</p>
                                            </div>
                                            <div className="flex flex-row">
                                                <p className="text-emerald-700 text-sm font-semibold mb-2">Fraction Count:</p>
                                                <div className="flex-1" />
                                                <input value={fractionCount.get(data.originalAddress + "-" + data.tokenID)} onChange={(e) => dispatch({value: e.target.value, key: (data.originalAddress + "-" + data.tokenID)})} min="1" max={maxFractionCount} className="min-w-0 block w-20 lg:w-28 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-emerald-900 focus:outline-none" type='number' name="fractionCount" required/>
                                            </div>
                                        </div>
                                        <div className="h-full w-full">
                                            <button onClick={() => fractionalise({key: (data.originalAddress + "-" + data.tokenID), contractAddress: data.originalAddress, tokenID: data.tokenID})} type="button"  className="rounded-b-lg font-sans w-full py-4 bg-stiletto-500 hover:bg-stiletto-600 text-white font-semibold md:text-sm text-lg lg:text-xl">Fractionalise</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

function fetchNfts(walletContext, setNftsList) {
    let nftsList = [];

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    console.log("Walet Coonext: ", walletContext);

    fetch(`${walletContext.chain.nftInfraURL}getNFTs/?owner=${walletContext.address}`, requestOptions)
    .then(response => response.json())
    .then(result => {
        result.ownedNfts.map((nft) => {
            if(nft.id.tokenMetadata.tokenType === ERC_721 && (nft && nft.media && nft.media[0].gateway)) {
                nftsList.push(
                    {
                        nftImage: nft.media[0].gateway,
                        originalAddress: nft.contract.address,
                        tokenID: parseInt(nft.id.tokenId,16),
                    }
                );
            }
        });
        setNftsList(nftsList);
    })
    .catch(error => console.log('error', error));
    return nftsList;
}

const Fractionalise = () => {

    const[walletContext, setWalletContext] = useState();
    const[nftsList, setNftsList] = useState([]);

    useEffect(() => {
        console.log("Wallet Context: ", walletContext);
        if(walletContext && walletContext.errorCode === METAMASK_NOT_INSTALLED) {
            console.log("Wallet: ", walletContext);
        } else if(walletContext && walletContext.errorCode === '') {
            fetchNfts(walletContext, setNftsList);
            console.log("Nfts List: ", nftsList);
        }
    },[walletContext]);

    return (
        <>
            <Navbar pageLoad='Fraction' setWalletContext={setWalletContext}/>
            <div className="w-full min-h-content bg-gin-50">
                {
                    (walletContext && !walletContext.loading && walletContext.errorCode === METAMASK_NOT_INSTALLED) ? (
                        <>
                            <div className="h-screen w-full bg-gin-50 flex items-center justify-center my-10">
                                <a className="rounded-lg bg-stiletto-500 text-white py-4 px-6 md:py-8 md:px-8 text-base md:text-lg font-bold hover:bg-stiletto-400" href="https://metamask.io/" rel="noreferrer" target="_blank"> Install Metamask </a>
                            </div>
                        </>
                    ) : ( (walletContext && !walletContext.loading && walletContext.errorCode === CHAINID_NOT_SUPPORTED) ? (
                        <>
                            <div className="h-screen w-full bg-gin-50">
                            </div> 
                        </>
                        ) : (
                        <div className="pb-20 py-10 min-h-screen z-10 w-full">
                            <FractionCard walletNFTsList={nftsList}  walletContext={walletContext}/>
                        </div>
                        )
                    )
                }
            </div>
            {/* <BottomBar /> */}
        </>
    )
}

export default Fractionalise;