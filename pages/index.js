import Head from 'next/head'
import { useState, useEffect } from 'react'
import { TWITTER_LINK,DISCORD_LINK,GITHUB_LINK, OPENSEA_LINK } from '../constants/constants'
import Navbar from '../components/NavBar'
import Link from 'next/link'


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
    query: "{\n  tokens(first: 8) {\n    id\n    tokenId\n    owner \n    fractionContract\n    originalContract \n    fractionCount\n    tokenURI\n  }\n}",
    variables: {}
})

const fetchAllFractionData = async ({setFractionData}) => {
  let fractionData = [];

  let response = await fetch("https://api.thegraph.com/subgraphs/name/cpp-phoenix/scatter", requestOptions(FETCH_ALL_NFTs));

  if(response.status === 200) {
      let data = await response.json();
      console.log("Data is:", data);
      data.data.tokens.map((token) => {
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
      })
  }
  console.log("Fraction Data is: ", fractionData);
  setFractionData(fractionData);
}

export const BottomBar = () => {
  return (
    <div className="flex flex-row justify-center w-screen lg:h-content bg-gin-100 p-2">
      <div className="flex flex-col lg:flex-row items-center w-5/12 lg:w-7/12 h-full">
        <div className="flex flex-row">
          <div className="px-1 sm:px-2 text-sm sm:font-semibold text-greenKelp-500">Careers</div>
          <div className="px-1 sm:px-2 text-sm sm:font-semibold text-greenKelp-500">Cookies</div>
          <div className="px-1 sm:px-2 text-sm sm:font-semibold text-greenKelp-500">Disclaimer</div>
          <div className="px-1 sm:px-2 text-sm sm:font-semibold text-greenKelp-500">Terms</div>
          <div className="px-1 sm:px-2 text-sm sm:font-semibold text-greenKelp-500">Privacy</div>
        </div>
        <div className="flex-1"></div>
        <div className="flex flex-row">
          <div className="px-2"><Link href={GITHUB_LINK} target="_blank" rel="noopener noreferrer"><a><svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" className="w-8 h-8 md:w-10 md:h-10 fill-greenKelp-100 hover:fill-greenKelp-200"><path d="M17.791,46.836C18.502,46.53,19,45.823,19,45v-5.4c0-0.197,0.016-0.402,0.041-0.61C19.027,38.994,19.014,38.997,19,39 c0,0-3,0-3.6,0c-1.5,0-2.8-0.6-3.4-1.8c-0.7-1.3-1-3.5-2.8-4.7C8.9,32.3,9.1,32,9.7,32c0.6,0.1,1.9,0.9,2.7,2c0.9,1.1,1.8,2,3.4,2 c2.487,0,3.82-0.125,4.622-0.555C21.356,34.056,22.649,33,24,33v-0.025c-5.668-0.182-9.289-2.066-10.975-4.975 c-3.665,0.042-6.856,0.405-8.677,0.707c-0.058-0.327-0.108-0.656-0.151-0.987c1.797-0.296,4.843-0.647,8.345-0.714 c-0.112-0.276-0.209-0.559-0.291-0.849c-3.511-0.178-6.541-0.039-8.187,0.097c-0.02-0.332-0.047-0.663-0.051-0.999 c1.649-0.135,4.597-0.27,8.018-0.111c-0.079-0.5-0.13-1.011-0.13-1.543c0-1.7,0.6-3.5,1.7-5c-0.5-1.7-1.2-5.3,0.2-6.6 c2.7,0,4.6,1.3,5.5,2.1C21,13.4,22.9,13,25,13s4,0.4,5.6,1.1c0.9-0.8,2.8-2.1,5.5-2.1c1.5,1.4,0.7,5,0.2,6.6c1.1,1.5,1.7,3.2,1.6,5 c0,0.484-0.045,0.951-0.11,1.409c3.499-0.172,6.527-0.034,8.204,0.102c-0.002,0.337-0.033,0.666-0.051,0.999 c-1.671-0.138-4.775-0.28-8.359-0.089c-0.089,0.336-0.197,0.663-0.325,0.98c3.546,0.046,6.665,0.389,8.548,0.689 c-0.043,0.332-0.093,0.661-0.151,0.987c-1.912-0.306-5.171-0.664-8.879-0.682C35.112,30.873,31.557,32.75,26,32.969V33 c2.6,0,5,3.9,5,6.6V45c0,0.823,0.498,1.53,1.209,1.836C41.37,43.804,48,35.164,48,25C48,12.318,37.683,2,25,2S2,12.318,2,25 C2,35.164,8.63,43.804,17.791,46.836z"/></svg></a></Link></div>
          <div className="px-2"><Link href={TWITTER_LINK} target="_blank" rel="noopener noreferrer"><a><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" className="w-8 h-8 md:w-10 md:h-10 fill-greenKelp-100 hover:fill-greenKelp-200"><path d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"/></svg></a></Link></div>
          <div className="px-2"><Link href={DISCORD_LINK} target="_blank" rel="noopener noreferrer"><a><svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" className="w-8 h-8 md:w-10 md:h-10 fill-greenKelp-100 hover:fill-greenKelp-200"><path d="M 41.625 10.769531 C 37.644531 7.566406 31.347656 7.023438 31.078125 7.003906 C 30.660156 6.96875 30.261719 7.203125 30.089844 7.589844 C 30.074219 7.613281 29.9375 7.929688 29.785156 8.421875 C 32.417969 8.867188 35.652344 9.761719 38.578125 11.578125 C 39.046875 11.867188 39.191406 12.484375 38.902344 12.953125 C 38.710938 13.261719 38.386719 13.429688 38.050781 13.429688 C 37.871094 13.429688 37.6875 13.378906 37.523438 13.277344 C 32.492188 10.15625 26.210938 10 25 10 C 23.789063 10 17.503906 10.15625 12.476563 13.277344 C 12.007813 13.570313 11.390625 13.425781 11.101563 12.957031 C 10.808594 12.484375 10.953125 11.871094 11.421875 11.578125 C 14.347656 9.765625 17.582031 8.867188 20.214844 8.425781 C 20.0625 7.929688 19.925781 7.617188 19.914063 7.589844 C 19.738281 7.203125 19.34375 6.960938 18.921875 7.003906 C 18.652344 7.023438 12.355469 7.566406 8.320313 10.8125 C 6.214844 12.761719 2 24.152344 2 34 C 2 34.175781 2.046875 34.34375 2.132813 34.496094 C 5.039063 39.605469 12.972656 40.941406 14.78125 41 C 14.789063 41 14.800781 41 14.8125 41 C 15.132813 41 15.433594 40.847656 15.621094 40.589844 L 17.449219 38.074219 C 12.515625 36.800781 9.996094 34.636719 9.851563 34.507813 C 9.4375 34.144531 9.398438 33.511719 9.765625 33.097656 C 10.128906 32.683594 10.761719 32.644531 11.175781 33.007813 C 11.234375 33.0625 15.875 37 25 37 C 34.140625 37 38.78125 33.046875 38.828125 33.007813 C 39.242188 32.648438 39.871094 32.683594 40.238281 33.101563 C 40.601563 33.515625 40.5625 34.144531 40.148438 34.507813 C 40.003906 34.636719 37.484375 36.800781 32.550781 38.074219 L 34.378906 40.589844 C 34.566406 40.847656 34.867188 41 35.1875 41 C 35.199219 41 35.210938 41 35.21875 41 C 37.027344 40.941406 44.960938 39.605469 47.867188 34.496094 C 47.953125 34.34375 48 34.175781 48 34 C 48 24.152344 43.785156 12.761719 41.625 10.769531 Z M 18.5 30 C 16.566406 30 15 28.210938 15 26 C 15 23.789063 16.566406 22 18.5 22 C 20.433594 22 22 23.789063 22 26 C 22 28.210938 20.433594 30 18.5 30 Z M 31.5 30 C 29.566406 30 28 28.210938 28 26 C 28 23.789063 29.566406 22 31.5 22 C 33.433594 22 35 23.789063 35 26 C 35 28.210938 33.433594 30 31.5 30 Z"/></svg></a></Link></div>
        </div>
      </div>
    </div>
  )
}

export const FooterData = () => {
  return (
    <div className="w-full h-content">
        <div className="bg-greenKelp-500 grid place-items-center h-full pt-4 md:pt-6 xl:pt-8 pb-2 md:pb-4 xl:pb-6">
          <div>
            <p className="text-center font-sans font-semibold text-white text-3xl sm:text-4xl md:text-5xl">Join our community</p>
            <p className="text-center text-white text-sm sm:text-lg md:text-xl xl:text-2xl x-20 py-2 md:py-2 lg:py-4 mx-4 sm:mx-16 md:mx-28 lg:mx-40 xl:mx-60">Chat with the team and others in the community to learn more about dev.tryBitsNBids.xyz and provide you feedback to help us serve the community better.</p>
            <div className="flex justify-center flex-row">        
              
              <div className="rounded-lg h-20 w-24 sm:h-20 sm:w-36 md:h-32 md:w-48 lg:h-32 lg:w-48 xl:h-40 xl:w-64 m-2 md:m-6 xl:m-10 flex items-center justify-center bg-greenKelp-100 hover:bg-gin-400">
                <Link href={GITHUB_LINK} target="_blank" rel="noopener noreferrer">
                  <a className="w-full h-full flex flex-col items-center justify-center">
                    <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 md:w-12 md:h-12 xl:w-20 xl:h-20 fill-white" viewBox="0 0 50 50"><path d="M17.791,46.836C18.502,46.53,19,45.823,19,45v-5.4c0-0.197,0.016-0.402,0.041-0.61C19.027,38.994,19.014,38.997,19,39 c0,0-3,0-3.6,0c-1.5,0-2.8-0.6-3.4-1.8c-0.7-1.3-1-3.5-2.8-4.7C8.9,32.3,9.1,32,9.7,32c0.6,0.1,1.9,0.9,2.7,2c0.9,1.1,1.8,2,3.4,2 c2.487,0,3.82-0.125,4.622-0.555C21.356,34.056,22.649,33,24,33v-0.025c-5.668-0.182-9.289-2.066-10.975-4.975 c-3.665,0.042-6.856,0.405-8.677,0.707c-0.058-0.327-0.108-0.656-0.151-0.987c1.797-0.296,4.843-0.647,8.345-0.714 c-0.112-0.276-0.209-0.559-0.291-0.849c-3.511-0.178-6.541-0.039-8.187,0.097c-0.02-0.332-0.047-0.663-0.051-0.999 c1.649-0.135,4.597-0.27,8.018-0.111c-0.079-0.5-0.13-1.011-0.13-1.543c0-1.7,0.6-3.5,1.7-5c-0.5-1.7-1.2-5.3,0.2-6.6 c2.7,0,4.6,1.3,5.5,2.1C21,13.4,22.9,13,25,13s4,0.4,5.6,1.1c0.9-0.8,2.8-2.1,5.5-2.1c1.5,1.4,0.7,5,0.2,6.6c1.1,1.5,1.7,3.2,1.6,5 c0,0.484-0.045,0.951-0.11,1.409c3.499-0.172,6.527-0.034,8.204,0.102c-0.002,0.337-0.033,0.666-0.051,0.999 c-1.671-0.138-4.775-0.28-8.359-0.089c-0.089,0.336-0.197,0.663-0.325,0.98c3.546,0.046,6.665,0.389,8.548,0.689 c-0.043,0.332-0.093,0.661-0.151,0.987c-1.912-0.306-5.171-0.664-8.879-0.682C35.112,30.873,31.557,32.75,26,32.969V33 c2.6,0,5,3.9,5,6.6V45c0,0.823,0.498,1.53,1.209,1.836C41.37,43.804,48,35.164,48,25C48,12.318,37.683,2,25,2S2,12.318,2,25 C2,35.164,8.63,43.804,17.791,46.836z"/></svg>
                    <p className="text-white text-sm lg:text-base xl:text-lg md:font-semibold pt-2 lg:pt-4">Github</p>
                  </a>
                </Link>
              </div>
                
              <div className="rounded-lg h-20 w-24 sm:h-20 sm:w-36 md:h-32 md:w-48 lg:h-32 lg:w-48 xl:h-40 xl:w-64 m-2 md:m-6 xl:m-10 flex items-center justify-center bg-greenKelp-100 hover:bg-gin-400">
                <Link href={TWITTER_LINK} target="_blank" rel="noopener noreferrer">
                  <a className="w-full h-full flex flex-col items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 md:w-12 md:h-12 xl:w-24 xl:h-24 fill-white" viewBox="0 0 50 50"><path fill="#03A9F4" d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"/></svg>
                    <p className="text-white text-sm lg:text-base xl:text-lg md:font-semibold">Twitter</p>
                  </a>
                </Link>
              </div>
              
              <div className="flex flex-col items-center justify-center rounded-lg h-20 w-24 sm:h-20 sm:w-36 md:h-32 md:w-48 lg:h-32 lg:w-48 xl:h-40 xl:w-64 m-2 md:m-6 xl:m-10 flex items-center justify-center bg-greenKelp-100 hover:bg-gin-400">
                <Link href={DISCORD_LINK} target="_blank" rel="noopener noreferrer">
                  <a className="w-full h-full flex flex-col items-center justify-center">
                    <svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" className="w-8 h-8 md:w-12 md:h-12 xl:w-24 xl:h-24 fill-white"><path d="M 41.625 10.769531 C 37.644531 7.566406 31.347656 7.023438 31.078125 7.003906 C 30.660156 6.96875 30.261719 7.203125 30.089844 7.589844 C 30.074219 7.613281 29.9375 7.929688 29.785156 8.421875 C 32.417969 8.867188 35.652344 9.761719 38.578125 11.578125 C 39.046875 11.867188 39.191406 12.484375 38.902344 12.953125 C 38.710938 13.261719 38.386719 13.429688 38.050781 13.429688 C 37.871094 13.429688 37.6875 13.378906 37.523438 13.277344 C 32.492188 10.15625 26.210938 10 25 10 C 23.789063 10 17.503906 10.15625 12.476563 13.277344 C 12.007813 13.570313 11.390625 13.425781 11.101563 12.957031 C 10.808594 12.484375 10.953125 11.871094 11.421875 11.578125 C 14.347656 9.765625 17.582031 8.867188 20.214844 8.425781 C 20.0625 7.929688 19.925781 7.617188 19.914063 7.589844 C 19.738281 7.203125 19.34375 6.960938 18.921875 7.003906 C 18.652344 7.023438 12.355469 7.566406 8.320313 10.8125 C 6.214844 12.761719 2 24.152344 2 34 C 2 34.175781 2.046875 34.34375 2.132813 34.496094 C 5.039063 39.605469 12.972656 40.941406 14.78125 41 C 14.789063 41 14.800781 41 14.8125 41 C 15.132813 41 15.433594 40.847656 15.621094 40.589844 L 17.449219 38.074219 C 12.515625 36.800781 9.996094 34.636719 9.851563 34.507813 C 9.4375 34.144531 9.398438 33.511719 9.765625 33.097656 C 10.128906 32.683594 10.761719 32.644531 11.175781 33.007813 C 11.234375 33.0625 15.875 37 25 37 C 34.140625 37 38.78125 33.046875 38.828125 33.007813 C 39.242188 32.648438 39.871094 32.683594 40.238281 33.101563 C 40.601563 33.515625 40.5625 34.144531 40.148438 34.507813 C 40.003906 34.636719 37.484375 36.800781 32.550781 38.074219 L 34.378906 40.589844 C 34.566406 40.847656 34.867188 41 35.1875 41 C 35.199219 41 35.210938 41 35.21875 41 C 37.027344 40.941406 44.960938 39.605469 47.867188 34.496094 C 47.953125 34.34375 48 34.175781 48 34 C 48 24.152344 43.785156 12.761719 41.625 10.769531 Z M 18.5 30 C 16.566406 30 15 28.210938 15 26 C 15 23.789063 16.566406 22 18.5 22 C 20.433594 22 22 23.789063 22 26 C 22 28.210938 20.433594 30 18.5 30 Z M 31.5 30 C 29.566406 30 28 28.210938 28 26 C 28 23.789063 29.566406 22 31.5 22 C 33.433594 22 35 23.789063 35 26 C 35 28.210938 33.433594 30 31.5 30 Z"/></svg>
                    <p className="text-white text-sm lg:text-base xl:text-lg md:font-semibold pt-1 lg:pt-2">Discord</p>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <BottomBar />
      </div>
  )
}


const NFTCard = ({nftData}) => {
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
    <div className="rounded-lg shadow-lg bg-white w-fit mb-6" key={data.originalAddress + "-" + data.tokenID}>
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
          <div className="px-4 pt-2">
            <div className="flex flex-row">
                <p className="text-emerald-700 text-sm font-semibold mb-2">Original Address: </p>
                <div className="flex-1" />
                <a className="text-sm text-emerald-900 hover:text-emerald-700" href={`https://mumbai.polygonscan.com/address/${data.originalAddress}`} rel="noreferrer" target="_blank">{data.originalAddress.substring(0,2) + "..." + data.originalAddress.substring(data.originalAddress.length-4,data.originalAddress.length)} </a> 
            </div>
            <div className="flex flex-row">
                <p className="text-emerald-700 text-sm font-semibold mb-2">Fraction Address: </p>
                <div className="flex-1" />
                <a className="text-sm text-emerald-900 hover:text-emerald-700" href={`https://mumbai.polygonscan.com/address/${data.fractionAddress}`} rel="noreferrer" target="_blank">{data.fractionAddress.substring(0,2) + "..." + data.fractionAddress.substring(data.fractionAddress.length-4,data.fractionAddress.length)}  </a>
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
          <div className="h-full w-full mt-2">
            <button onClick={() => window.open(data.openSeaLink, '_blank', 'noopener,noreferrer')} type="button"  className="rounded-b-lg font-sans w-full py-4 bg-stiletto-500 hover:bg-stiletto-600 text-white font-semibold text-l ">Trade On Opensea</button>
          </div>
        </div>
    </div>
  )
}

const RecentActivity = ({fractionData}) => {
  if(fractionData && fractionData.length > 0) {
    return (
      <div className="bg-gin-50 flex justify-center py-10">
        <div className="w-11/12">
          <div className="flex flex-row items-center md:mx-14 lg:mx-10 xl:mx-16">
            <div className="text-2xl md:text-3xl text-greenKelp-400 font-semibold">Recent Activity</div>
            <div className="flex-1"></div>
            <Link href="/trade"><a><div className="flex justify-center items-center rounded-full bg-stiletto-400 text-white w-20 md:w-28 h-8 md:h-10 font-semibold text-sm md:text-lg border-2 border-stiletto-500">View All</div></a></Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-4 mt-10">
            {
              fractionData.map((nftData) => (
                  <NFTCard nftData={nftData} key={nftData.originalAddress + "-" + nftData.tokenID}/>
              ))
            }
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <>
      </>
    )
  }
}

const ResourceVideo = () => {
  return (
    <div className="w-full h-content flex flex-col items-center bg-gin-100 py-4 lg:py-8">
      <div className="text-greenKelp-200 font-bold py-2 text-sm md:text-lg">RESOURCES FOR GETTING STARTED</div>
      <div className="text-center text-greenKelp-400 px-4 font-bold tex-lg sm:text-xl md:text-2xl pb-2 lg:pb-4">A Beginner’s Guide to Understand the BitsNBids UI</div>
      <iframe className="rounded-lg border-4 border-greenKelp-400 my-4 w-[350px] h-[280px] sm:h-[400px] sm:w-[600px] md:h-[500px] md:w-[750px] lg:h-[550px] lg:w-[1000px]"
        src="https://www.youtube.com/embed/Kp4VOPONK6Y"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="video"
      />{" "}
    </div>
  )
}

export default function Home() {
  const[fractionData, setFractionData] = useState([]);

  useEffect(() => {
    fetchAllFractionData({setFractionData});
  },[]);
  return (
    <div>
      <Head>
        <title>BitsNBids</title>
        <meta
          name="description"
          content="Fractionalise your NFTs for more liquidity"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        <div className="flex flex-col lg:flex-row pt-10 bg-gin-50 h-content">
          <div className="flex flex-col justify-center items-center w-full h-2/6 lg:w-1/2 md:h-1/2 lg:h-5/6 pt-16 px-4 sm:px-10 sm:pt-16 sm:pb-2 md:p-20 md:pb-2 md:pt-24 lg:py-28 lg:pt-36 xl:pt-40">
            <div className="text-center text-3xl md:text-5xl lg:text-5xl xl:text-6xl text-greenKelp-400 font-bold font-sans ">
              <Link href="/fractionalise">
                <a className="text-stiletto-300 hover:text-stiletto-500">
                  {" "}
                  Fractionalise
                </a>
              </Link>
              ,
              <Link href="/trade">
                <a className="text-stiletto-300 hover:text-stiletto-500">
                  {" "}
                  Trade{" "}
                </a>
              </Link>
              or
              <Link href="/merge">
                <a className="text-stiletto-300 hover:text-stiletto-500">
                  {" "}
                  Merge{" "}
                </a>
              </Link>
              your NFTs
            </div>
            <div className="text-sm text-center text-xl md:text-xl lg:text-lg xl:text-xl mt-4 md:mt-6 lg:mt-6 text-greenKelp-400">
              BitsNBids provides ownership of the world’s most sought after NFTs
              in fractions. BitsNBids omits creator fees, reduces entry costs,
              expand communities and increases access.
            </div>
          </div>
          <div className="relative flex justify-center items-center w-full h-2/6 lg:w-1/2 md:h-1/2 lg:h-5/6 sm:py-2 md:py-6 lg:p-24">
            <div className="flex justify-center items-center h-64 w-64 md:h-84 md:w-84 lg:h-96 lg:w-96 lg:pr-10">
              <img
                src="WAW.png"
                className="rounded-lg mr-32 sm:mr-60 md:mr-60 lg:mr-60 xl:mr-80 blur-sm absolute w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-72 lg:h-72"
              />
              <img
                src="murakamiFlower.png"
                className="rounded-lg ml-32 sm:ml-60 md:ml-60 lg:ml-60 xl:ml-80 blur-sm absolute w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-72 lg:h-72"
              />
              <img
                src="WowG.png"
                className="absolute rounded-lg w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 lg:w-80 lg:h-80 "
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center px-4 bg-gin-100 py-4 md:py-6 lg:py-8">
          <div className="text-2xl md:text-3xl lg:text-4xl font-semibold text-greenKelp-400 text-center">
            {" "}
            <span className="text-stiletto-300">Collective</span> ownership of
            iconic and historic NFTs
          </div>
          <div className="sm:px-10 md:px-6 mt-2 md:mt-4 text-base md:text-xl lg:text-2xl fond-semibold text-greenKelp-400 text-center">
            Fractionalization allows new investers to be part of the community
            and increases the overall adoption.
          </div>
        </div>
        <RecentActivity fractionData={fractionData} />
        {/* <ResourceVideo/> */}
        <FooterData />
      </main>
    </div>
  );
}
