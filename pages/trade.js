import Navbar from '../components/NavBar'
import { BottomBar } from '.'
import { OPENSEA_LINK, MUMBAI_CONTRACT_BASE_URL } from '../constants/constants';
import { useEffect, useState } from 'react';

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

var FETCH_ALL_NFTs = JSON.stringify({
    query: "{\n  tokens(where: { fractionCount_gt: 0}) {\n    id\n    tokenId\n    owner \n    fractionContract\n    originalContract \n    fractionCount\n    tokenURI\n  }\n}",
    variables: {}
})

const TradeCard = ({nftData={}}) => {

    const[data,setdata] = useState({...nftData, imageLoading:true});

    const fetchImageSrc = async () => {
        let nftResponse = await fetch(data.nftImage.replace('ipfs://','https://ipfs.io/ipfs/'));
        let nftMeta = await nftResponse.json();
        let nftImage = nftMeta.image.replace('ipfs://','https://ipfs.io/ipfs/');
        setdata({...data, nftImage: nftImage, imageLoading: false});
    }

    useEffect(() => {
        fetchImageSrc();
    },[]);

    return (
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
            <div>
                <div className="px-4 py-2 lg:py-4">
                    <div className="flex flex-row">
                        <p className="text-emerald-700 text-sm font-semibold mb-2">Original Address: </p>
                        <div className="flex-1" />
                        <a className="text-sm text-emerald-900 hover:text-emerald-700" href={`${MUMBAI_CONTRACT_BASE_URL + data.originalAddress}`} rel="noreferrer" target="_blank">{data.originalAddress.substring(0,2) + "..." + data.originalAddress.substring(data.originalAddress.length-4,data.originalAddress.length)} </a> 
                    </div>
                    <div className="flex flex-row">
                        <p className="text-emerald-700 text-sm font-semibold mb-2">Fraction Address: </p>
                        <div className="flex-1" />
                        <a className="text-sm text-emerald-900 hover:text-emerald-700" href={`${MUMBAI_CONTRACT_BASE_URL + data.fractionAddress}`} rel="noreferrer" target="_blank">{data.fractionAddress.substring(0,2) + "..." + data.fractionAddress.substring(data.fractionAddress.length-4,data.fractionAddress.length)}  </a>
                    </div>
                    <div className="flex flex-row">
                        <p className="text-emerald-700 text-sm font-semibold mb-2">Token Id:</p>
                        <div className="flex-1" />
                        <p className="text-sm text-emerald-900">{data.tokenID}</p>
                    </div>
                    <div className="flex flex-row">
                        <p className="text-emerald-700 text-sm font-semibold mb-2">Fraction Count:</p>
                        <div className="flex-1" />
                        <p className="text-sm text-emerald-900">{data.fractionCount}</p>
                    </div>
                </div>
                <div className="h-full w-full">
                    <button onClick={() => window.open(data.openSeaLink, '_blank', 'noopener,noreferrer')} type="button"  className="rounded-b-lg font-sans w-full py-4 bg-stiletto-500 hover:bg-stiletto-600 text-white font-semibold md:text-sm text-lg lg:text-xl">Trade On Opensea</button>
                </div>
            </div>
        </div>
    )
}

const Trade = () => {
    
    const[fractionData, setFractionData] = useState([]);

    const fetchAllFractionData = async () => {
        let fractionData = [];
    
        let response = await fetch("https://api.thegraph.com/subgraphs/name/cpp-phoenix/scatter", requestOptions(FETCH_ALL_NFTs));
    
        if(response.status === 200) {
            let data = await response.json();
            await data.data.tokens.map(async (token) => {
                if(token.fractionCount !== '0') {
                    fractionData.push({
                        nftImage: token.tokenURI,
                        originalAddress: token.originalContract,
                        fractionAddress: token.fractionContract,
                        tokenID: token.tokenId,
                        fractionCount: token.fractionCount,
                        openSeaLink: OPENSEA_LINK + token.fractionContract + '/' + token.tokenId,
                        id:token.id
                    });
                }
            });
        }
        setFractionData(fractionData);
    }

    useEffect(() => {
        fetchAllFractionData();
    },[]);

    return (
        <>
            <Navbar pageLoad="Trade" />
            <div className="bg-gin-50">
                {/* <div className="fixed w-full h-fit pb-6 pt-24 lg:pt-28 bg-gin-50 z-10">
                    <div className="flex justify-center">
                        <div className="w-content">
                            <div className="input-group relative flex items-stretch w-full">
                                <input type="search" className="border-4 form-control w-90 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-emerald-900 focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon3"/>
                                <button className="btn text-white inline-block px-6 py-2 bg-emerald-900 text-white font-base md:font-medium text-xs uppercase rounded hover:bg-emerald-700" type="button" id="button-addon3">Search</button>
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className="pt-4 lg:pt-10 min-h-screen z-0">
                    <div className="pt-28 z-0 w-full pb-20 py-10">
                        <div className="flex flex-rows justify-center w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-6 lg:gap-10 xl:gap-12">
                                {
                                    fractionData.map((data) => 
                                        <TradeCard key={data.id} nftData={data} />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <BottomBar /> */}
        </>
    )
}

export default Trade;