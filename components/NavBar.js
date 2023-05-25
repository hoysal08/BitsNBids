import { ethers, utils } from "ethers";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NewTag } from "./CommonUtils"; 
import { METAMASK_NOT_INSTALLED, CHAINID_NOT_SUPPORTED, SUPPORTED_CHAINS } from "../constants/constants";

const navOptions = [
    ['Create','/create', true, true],
    ['Fraction', '/fraction', true, false],
    ['Trade', '/trade', true, false],
    ['Merge', '/merge', true, false],
    
]

const PopulateNav = ({pageLoad}) => {
    return (
        <div className="flex flex-row">
            {
            navOptions.map(([title, url, active, newTag]) => (
                
                <a key={title} href={active ? url : ''} >
                    <div className="relative w-content h-content">
                        {
                            !active ? (
                                <div className="cursor-not-allowed absolute flex flex-row items-start justify-end w-full h-full z-0">
                                    <div className="rounded-full flex bg-red-500 text-[10px] px-1 mt-2 text-white font-semibold">dev</div>
                                </div>
                            ) : (
                                    newTag ? <NewTag/> : ''
                                )
                        } 
                        <div className={ `z-10 py-3 text-l font-semibold ${active ? 'px-3 text-emerald-900 text-slate-700 hover:text-slate-900 hover:font-bold' : 'pr-7 pl-3 rounded text-zinc-400 cursor-not-allowed disabled'} ${pageLoad === title ? 'border-b-2 border-emerald-500' : '' } ${newTag ? 'mr-5 pl-3' : ''}` }>{title}</div>
                    </div>
                </a>   
            ))}
        </div>
    )

}

const PopulateBottomNav = ({pageLoad}) => {
    return (
        <div className="rounded-[16px] m-auto flex flex-row justify-center items-center w-auto bg-stiletto-600 border-2 border-stiletto-400 text-white">
            {
                navOptions.map(([title, url, active, newTag]) => (
                    active ? <a key={title} href={active ? url : ''} className={`rounded-[16px] text-white px-4 py-3 text-semibold ${active ? 'hover:text-gray-100 text-white hover:text-slate-900' : 'rounded text-zinc-400 cursor-not-allowed disabled'} ${pageLoad === title ? 'font-bold bg-stiletto-400' : 'font-semibold' }` }>{title}</a> : ''
            ))}
        </div>
    )
}

const BurgerMenu = ({setBurgerMenu, pageLoad}) => {
    return (
        <div className="absolute w-screen h-screen border-4 z-40 bg-gin-50">
            <div className="absolute right-0 mt-6 mr-4">
                <img src="close.png" className="w-8 h-7" onClick={() => setBurgerMenu(false)}/>
            </div>
            <div className="flex flex-col pt-20 pl-8">
                {
                    navOptions.map(([title, url, active, newTag]) => (
                        <a key={title} href={active ? url : ''} className="text-3xl md:text-4xl m-4 md:m-5 text-greenKelp-500 hover:text-greenKelp-100 m-1 font-bold">{title}</a>
                    ))
                }
            </div>
        </div>
    )
}

const FaucetBar = () => {
    return (
        <div className="w-full h-10 border-b-2 border-stiletto-700 bg-stiletto-600 flex flex-row justify-center items-center">
            <div className="text-white text-[12px] font-semibold">To Mint Testnet NFTs <Link href="/faucet"><button className="rounded-full mx-2 px-3 py-1 bg-white text-stiletto-600 hover:bg-stiletto-700 hover:text-white font-bold">Click Here</button></Link></div>
        </div>
    )
}

async function changeNetwork(wallet, chain, toggleNetworkBar, setWallet, setWalletContext) {
    if(chain.active) {
        if(chain.chainId !== wallet.chain.chainId) {
            console.log("Wallet: ", wallet);
            console.log("Chain: ", chain);

            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{
                    chainId: utils.hexValue(chain.chainId),
                    // rpcUrls: chain.rpcUrls,
                    // chainName: chain.chainName,
                    // nativeCurrency: chain.nativeCurrency,
                    // blockExplorerUrls: [chain.blockExplorer]
                }]
            });

            connectWallet(wallet, setWallet, setWalletContext);
        }
        toggleNetworkBar(false);
    }
}

const ConnectWalletButton = ({wallet, pageLoad, setWallet, setWalletContext}) => {
    const [networkBar, toggleNetworkBar] = useState(false);

    const NetworkBar = () => {
        return (
            <div className="border-2 border-slate-500 rounded-[16px] flex flex-col items-start mr-20 md:mr-0 px-4 py-2 fixed mt-3 w-48 sm:w-52 h-48 bg-slate-700 z-100"> 
                <div className="text-gin-50 text-sm">Select a network</div>
                <div className="flex flex-col items-start px-2 py-1">
                    {
                        SUPPORTED_CHAINS.map((chain) => (
                            <div className="flex flex-row items-center text-white py-1.5" key={chain.chainId}>
                                <img src={chain.image} className="w-5 h-5 mr-2"  /> 
                                <div className="relative pr-8">
                                    {
                                        !chain.active ? (
                                            <div className="absolute z-120 flex justify-end w-full"> 
                                                <div className="rounded-lg font-semibold px-1 bg-red-500 text-[10px]">dev</div>
                                            </div>
                                        ) : <> </>
                                    }
                                    <button onClick={() => changeNetwork(wallet, chain, toggleNetworkBar, setWallet, setWalletContext)} className={`${chain.active ? 'text-gin-50 hover:font-semibold': 'relative text-slate-400 cursor-not-allowed disabled'}`}>{chain.name}</button>
                                </div>
                                    
                            </div>
                        ))
                    }  
                </div>
            </div>
        )
    }

    return (
        <>
        { 
            !["Default","Trade"].includes(pageLoad) ? (wallet.loading ? '' : (wallet.errorCode === METAMASK_NOT_INSTALLED
            ? <button disabled className="rounded-lg md:rounded-[22px] bg-red-600 text-white px-3 py-3 sm:px-3 sm:py-3 text-[8px] sm:text-[10px] md:text-[12px] md:px-4 md:py-4 lg:px-5 lg:py-4 border-2 bored-red-800 lg:text-sm font-semibold"> Metamask Not Installed</button> 
            : ( 
            <div className="flex flex rows justify-center items-center">
                <div>
                    {
                        (wallet.errorCode === CHAINID_NOT_SUPPORTED) ? 
                        <div>
                            <button onClick={() => toggleNetworkBar(!networkBar)}  className=" flex flex-rows justify-center items-center md:rounded-[22px] bg-red-500 md:mx-2 md:px-3 md:py-3 text-sm fond-semibold text-white"><img src="/warning.png" className="w-6 h-6 mr-1"  /> Switch Network { networkBar ? <svg xmlns="http://www.w3.org/2000/svg" className="fill-white w-8 h-2" viewBox="0 0 512 319.24"><path d="m5.9 270.28 43.07 43.07c7.86 7.86 20.73 7.84 28.56 0l178.48-178.48L434.5 313.35c7.86 7.86 20.74 7.82 28.56 0l43.07-43.07c7.83-7.84 7.83-20.72 0-28.56L313.72 49.32l-.36-.37-43.07-43.07c-7.83-7.82-20.7-7.86-28.56 0l-43.07 43.07-.36.37L5.9 241.72c-7.87 7.86-7.87 20.7 0 28.56z"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="fill-white w-8 h-2"  viewBox="0 0 512.02 319.26"><path d="M5.9 48.96 48.97 5.89c7.86-7.86 20.73-7.84 28.56 0l178.48 178.48L434.5 5.89c7.86-7.86 20.74-7.82 28.56 0l43.07 43.07c7.83 7.84 7.83 20.72 0 28.56l-192.41 192.4-.36.37-43.07 43.07c-7.83 7.82-20.7 7.86-28.56 0l-43.07-43.07-.36-.37L5.9 77.52c-7.87-7.86-7.87-20.7 0-28.56z"/></svg>}</button> 
                            { networkBar ? <NetworkBar /> : ''}
                        </div> : 
                        <div>
                            <button onClick={() => toggleNetworkBar(!networkBar)}  className=" flex flex-rows justify-center items-center rounded-[22px] bg-slate-700 mx-1 px-3 py-1 md:mx-2 md:px-4 md:py-2 text-base fond-semibold text-white"><img src={wallet.chain.image} className="w-6 h-6 mr-2"  /> <div className="invisible absolute md:visible md:relative mr-1 lg:mr-0"> {wallet.chain.name} </div> { networkBar ? <svg xmlns="http://www.w3.org/2000/svg" className="fill-white w-8 h-2" viewBox="0 0 512 319.24"><path d="m5.9 270.28 43.07 43.07c7.86 7.86 20.73 7.84 28.56 0l178.48-178.48L434.5 313.35c7.86 7.86 20.74 7.82 28.56 0l43.07-43.07c7.83-7.84 7.83-20.72 0-28.56L313.72 49.32l-.36-.37-43.07-43.07c-7.83-7.82-20.7-7.86-28.56 0l-43.07 43.07-.36.37L5.9 241.72c-7.87 7.86-7.87 20.7 0 28.56z"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="fill-white w-8 h-2"  viewBox="0 0 512.02 319.26"><path d="M5.9 48.96 48.97 5.89c7.86-7.86 20.73-7.84 28.56 0l178.48 178.48L434.5 5.89c7.86-7.86 20.74-7.82 28.56 0l43.07 43.07c7.83 7.84 7.83 20.72 0 28.56l-192.41 192.4-.36.37-43.07 43.07c-7.83 7.82-20.7 7.86-28.56 0l-43.07-43.07-.36-.37L5.9 77.52c-7.87-7.86-7.87-20.7 0-28.56z"/></svg>}</button> 
                            { networkBar ? <NetworkBar /> : <> </> }
                        </div>
                    }
                </div>
                <button disabled className="rounded-full border-2 border-teal-800 bg-slate-800 text-white px-4 py-1 md:px-6 md:py-2 font-normal text-sm"> {wallet.address.substring(0,4) + '...' + wallet.address.substring(wallet.address.length - 4,wallet.address.length)}</button>
            </div>))) : ''
        }
        </>
    )
}

const connect =  async (wallet) => {
    if(typeof window.ethereum !== 'undefined') {
        console.log("Wallet is Installed!!");
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        const providerId = await provider.getNetwork();
        console.log("Provider is: ", providerId);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();

        let errorCode = CHAINID_NOT_SUPPORTED;
        let chain = {};
        SUPPORTED_CHAINS.forEach(function (chainObj) {
            if(chainObj.active && chainObj.chainId === providerId.chainId) {
                errorCode = '';
                chain = chainObj;
            }
        });
        
        return {...wallet, chain:chain, provider: provider, signer: signer, address: address, loading:false, errorCode: errorCode};
    } else {
        console.log("Wallet Not Installed!!");
        return {...wallet, address: null , errorCode: METAMASK_NOT_INSTALLED, loading:false}
    }
}

const connectWallet = async (wallet, setWallet, setWalletContext) => {
    const localwallet = await connect(wallet);
    setWallet(localwallet);
    setWalletContext(localwallet);
}

const Navbar = ({pageLoad='Default', setWalletContext}) => {

    const [wallet,setWallet] = useState({
        provider:'',
        address: '',
        signer: '',
        chain: {},
        errorCode: '',
        signedStakingContract: '',
        signedTokenAddress: '',
        loading:true,
    });

    const [burgerMenu, setBurgerMenu] = useState(false);

    useEffect(() => {
        if(!["Default","Trade"].includes(pageLoad)) {
            connectWallet(wallet, setWallet, setWalletContext);
        }
    },[]);

    return (
        <>
        <div className="fixed z-50">
        {
            burgerMenu === true ? <BurgerMenu setBurgerMenu={setBurgerMenu} pageLoad={pageLoad}/> : ''
        }
        </div>
        <div className="lg:invisible fixed flex flex-row justify-center bottom-0 mb-2 w-full">
            {
                pageLoad !== 'Default' ? <PopulateBottomNav pageLoad={pageLoad}/> : ''
            }
        </div>
        <div className="fixed top-0 border-b-2 border-emerald-900 bg-gin-100 w-full z-20 h-content">
            <div>
                {
                    !['Default','Faucet'].includes(pageLoad) ? <FaucetBar /> : ''
                }
            </div>
            <nav className="m-1 md:m-2 flex items-center space-x-1 lg:space-x-6">
                <Link href="/">
                    <a className="font-serif w-38 lg:border-r-2 border-black md:px-3 md:py-3 text-greenKelp-500 hover:text-emerald-700 text-lg md:text-2xl font-semibold md:font-bold">BitsNBids</a>
                </Link>
                <div className="invisible absolute lg:relative lg:visible min-w-0">
                    {
                        <PopulateNav pageLoad={pageLoad}/>
                    }
                </div>
                <div className="flex-1"> </div>
                <div className="visible lg:invisible">
                    {
                        pageLoad === "Default" ? (<div>
                            {
                                burgerMenu !== true ? <img onClick={() => setBurgerMenu(true)} src="hamburger.png" className="mr-6 w-8 h-6 lg:w-8 lg:h-8 md:mr-4" /> : ''
                            }
                            </div>) : ''
                    }
                </div>
                {
                    <ConnectWalletButton wallet={wallet} pageLoad={pageLoad}  setWallet={setWallet} setWalletContext = {setWalletContext}/>
                }

            </nav>
        </div>
        </>
    )
}

export default Navbar;