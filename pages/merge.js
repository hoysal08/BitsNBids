import Navbar from '../components/NavBar';
import { useState, useEffect } from 'react';
import { BottomBar } from '.';
import { ethers } from 'ethers';
import { OPENSEA_LINK, METAMASK_NOT_INSTALLED, CHAINID_NOT_SUPPORTED } from '../constants/constants';
import contractABI from '../public/fractionABI.json';
import ERC1155ABI from '../public/ERC1155ABI.json';

var myHeaders = new Headers();
myHeaders.append("content-type", "application/json");

var requestOptions = (FETCH_TYPE) => {
    return {
        method: 'POST',
        headers: myHeaders,
        body: FETCH_TYPE,
        redirect: 'follow'
    }
};

function FETCH_OWNER_FRAC_NFTS(owner) {
    let jsonData = JSON.stringify({
        query: `{\n  tokens(where: { fractionCount_gt: 0}) {\n    id\n    tokenId\n    owner\n    fractionContract\n    tokenURI\n originalContract\n    fractionCount\n  }\n}\n`,
        variables: {}
        })
    return  jsonData;
}

const MergeCard = ({nftData={}, walletContext}) => {
    const[data,setdata] = useState({...nftData, imageLoading:true});

    const fetchFractionCount = async () => {
        const fractionalAddress = new ethers.Contract(data.fractionAddress, ERC1155ABI, walletContext.provider);
        const signedFractionalAddress = await fractionalAddress.connect(walletContext.signer);
        const availableFractionCount = await signedFractionalAddress.balanceOf(walletContext.address, data.tokenID);
        availableFractionCount = BigInt(availableFractionCount);
        return availableFractionCount.toString();
    }

    const mergeFraction = async () => {
        if(walletContext && !walletContext.errorCode) {
            const stakingContract = new ethers.Contract(walletContext.chain.fractionContract, contractABI, walletContext.provider);
            const signedStakingContract = await stakingContract.connect(walletContext.signer);
            
            const tokenAddress = new ethers.Contract(data.fractionAddress, ERC1155ABI, walletContext.provider);
            const signedTokenAddress = await tokenAddress.connect(walletContext.signer);
            const isApproved = await signedTokenAddress.isApprovedForAll(data.owner, walletContext.chain.fractionContract);

            console.log("Approver is: ", isApproved);
        
            if(!isApproved) {
                const txnReceipt = await signedTokenAddress.setApprovalForAll(walletContext.chain.fractionContract, true);
                console.log("Transcation Receipt: ", txnReceipt);
                <div className="bg-green-100 rounded-lg py-5 px-6 mb-4 text-base text-green-700 mb-3" role="alert">
                    Transaction has been sent with Reciept: {txnReceipt.hash}
                </div>
            } else {
                console.log("Can merge now!");
                const txnReceipt = await signedStakingContract.merge(data.fractionAddress, data.tokenID);
                console.log("Transcation Receipt: ", txnReceipt);
                <div className="bg-green-100 rounded-lg py-5 px-6 mb-4 text-base text-green-700 mb-3" role="alert">
                    Transaction has been sent with Reciept: {txnReceipt.hash}
                </div>
            } 
        }
    }

    const fetchImageSrc = async () => {
        let nftResponse = await fetch(data.nftImage.replace('ipfs://','https://ipfs.io/ipfs/'));
        let nftMeta = await nftResponse.json();
        let availableFractionCount = '0';
        if(walletContext && !walletContext.errorCode) {
            availableFractionCount = fetchFractionCount();
        }
        availableFractionCount = await fetchFractionCount();

        let nftImage = nftMeta.image.replace('ipfs://','https://ipfs.io/ipfs/');
        setdata({...data, availableFractionCount: availableFractionCount, nftImage:nftImage, imageLoading:false});
    }

    useEffect(() => {
        fetchImageSrc();
    },[]);
    
    return (
        <>
            <div className="rounded-lg shadow-lg bg-white w-fit mb-0" key={data.originalAddress + "-" + data.tokenID}>
                <div>
                {
                    data.imageLoading ? (
                    <div className="animate-pulse flex items-center justify-center h-80 w-80 md:h-80 md:w-80 lg:h-72 lg:w-72">
                        <svg className="h-72 w-72 md:h-72 md:w-72 lg:h-64 lg:w-64 rounded-lg bg-gray-200" viewBox="0 0 24 24"/>
                    </div>
                    ) : (
                        <img className="rounded-t-lg h-80 w-80 md:h-80 md:w-80 lg:h-72 lg:w-72" src={data.nftImage} alt=""/>
                    ) 
                }
                </div>
                <div className="w-content">
                    <div className="px-4 py-2 lg:py-4">
                        <div className="flex flex-row">
                            <p className="text-emerald-700 text-sm font-semibold mb-2">Original Address: </p>
                            <div className="flex-1" />
                            <a className="text-sm text-emerald-900 hover:text-emerald-700" href={`${walletContext.chain.blockExplorer + data.originalAddress}`} rel="noreferrer" target="_blank">{data.originalAddress.substring(0,2) + "..." + data.originalAddress.substring(data.originalAddress.length-4,data.originalAddress.length)} </a> 
                        </div>
                        <div className="flex flex-row">
                            <p className="text-emerald-700 text-sm font-semibold mb-2">Fraction Address: </p>
                            <div className="flex-1" />
                            <a className="text-sm text-emerald-900 hover:text-emerald-700" href={`${walletContext.chain.blockExplorer + data.fractionAddress}`} rel="noreferrer" target="_blank">{data.fractionAddress.substring(0,2) + "..." + data.fractionAddress.substring(data.fractionAddress.length-4,data.fractionAddress.length)}  </a>
                        </div>
                        <div className="flex flex-row">
                            <p className="text-emerald-700 text-sm font-semibold mb-2">Token Id: </p>
                            <div className="flex-1" />
                            <p className="text-sm text-emerald-900">{data.tokenID}</p>
                        </div>
                        <div className="flex flex-row">
                            <p className="text-emerald-700 text-sm font-semibold mb-2">Fractions:</p>
                            <div className="flex-1" />
                            <p className="text-sm text-emerald-900">{data.availableFractionCount}/{data.fractionCount} </p>
                        </div>
                    </div>
                    <div className="h-full w-full">
                    {
                        data.availableFractionCount === data.fractionCount ? <button onClick={() => mergeFraction()} className="rounded-b-lg font-sans w-full py-4 bg-stiletto-500 hover:bg-stiletto-600 text-white font-semibold md:text-sm text-lg lg:text-xl">Merge</button> : <button className="rounded-b-lg font-sans w-full py-4 bg-gray-500 text-white font-semibold md:text-sm text-lg lg:text-xl" disabled>Insufficient Fractions</button>
                    }
                    </div>
                </div>
            </div>
        </>
    )
    
}

const fetchAllFractionData = async (owner, setOwnerFractionData) => {
    let ownerFractionData = [];

    let response = await fetch("https://api.thegraph.com/subgraphs/name/cpp-phoenix/scatter", requestOptions(FETCH_OWNER_FRAC_NFTS(owner)));

    if(response.status === 200) {
        let data = await response.json();
        await data.data.tokens.map(async (token) => { 
            if(token.fractionCount !== '0') {
                ownerFractionData.push({
                    owner: token.owner,
                    nftImage: token.tokenURI,
                    originalAddress: token.originalContract,
                    fractionAddress: token.fractionContract,
                    tokenID: token.tokenId,
                    fractionCount: token.fractionCount,
                    availableFractionCount: "0",
                    openSeaLink: OPENSEA_LINK + token.fractionContract + '/' + token.tokenId,
                    id:token.id
                });
            }
        });
    }
    setOwnerFractionData(ownerFractionData);
}

const Merge = () => {
    const[walletContext, setWalletContext] = useState();
    const[ownerFractionData, setOwnerFractionData] = useState([]);

    useEffect(() => {
        if(walletContext && walletContext.errorCode === METAMASK_NOT_INSTALLED) {
            console.log("Fraction and metamask not installed!!");
        } else if(walletContext && !walletContext.errorCode) {
            fetchAllFractionData(walletContext.address, setOwnerFractionData);
        }
    },[walletContext]);

    return (   
        <div className="w-full min-h-content bg-gin-50">
            <Navbar pageLoad="Merge" setWalletContext={setWalletContext}/>  
            <div className="min-h-screen z-10 w-full pb-20 py-10">
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
                        <div className="pt-28 z-0 w-full">
                            <div className="flex flex-rows justify-center w-full">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-6 lg:gap-10 xl:gap-12">
                                    {
                                        ownerFractionData.map((data) => 
                                            <MergeCard key={data.id} nftData={data} walletContext={walletContext}/>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    )
                    )
                }
            </div>
            {/* <BottomBar /> */}
        </div>
    )
}

export default Merge;