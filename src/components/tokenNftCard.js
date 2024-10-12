"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ethers } from 'ethers';
import { abi } from "./abi/abi";
import { useAccount, useChainId } from 'wagmi';

const TokenNftCard = ({ nft }) => {

  // const [logo, setLogos] = useState("");
  // const [desc, setdesc] = useState("");
  // const [brandid, setbrandid] = useState("");
  const [priceUSD, setPriceUSD] = useState("");
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const chainId = useChainId();
  const account = useAccount();
  const walletAddress = account.address;

  // useEffect(() => {
  //   // const brandmatch = async () => {
  //   //   const baseUri = process.env.NEXT_PUBLIC_URI || 'https://app.myriadflow.com';

  //   //   try {
  //   //     const res = await fetch(`${baseUri}/brands/all/554b4903-9a06-4031-98f4-48276c427f78`, {
  //   //       method: 'GET',
  //   //       headers: {
  //   //         'Content-Type': 'application/json'
  //   //       }
  //   //     });

  //   //     const webxrres = await fetch(`${baseUri}/webxr/all/554b4903-9a06-4031-98f4-48276c427f78`, {
  //   //       method: 'GET',
  //   //       headers: {
  //   //         'Content-Type': 'application/json'
  //   //       }
  //   //     });

  //   //     if (!res.ok || !webxrres.ok) {
  //   //       throw new Error('Failed to fetch data');
  //   //     }

  //   //     const result = await res.json();
  //   //     const webxrresult = await webxrres.json();

  //   //     // Find the webxrresult item matching the targetId
  //   //     const matchingWebxr = webxrresult.find(webxr => webxr.id === nft?.id);

  //   //     if (matchingWebxr) {
  //   //       // Find the corresponding brand in result
  //   //       const matchedBrand = result.find(brand => brand.name === matchingWebxr.brand_name);
  //   //       if (matchedBrand) {
  //   //         setLogos(matchedBrand.logo_image);
  //   //         setdesc(matchedBrand.description);
  //   //         setbrandid(matchedBrand.id);
  //   //       }
  //   //     }

  //   //     // console.log("logo", logo, result, phyresult);

  //   //   } catch (error) {
  //   //     console.error('Error fetching data:', error);
  //   //   }
  //   // }

  //   brandmatch();
  // }, [])



  // useEffect(() => {
  //   const pricetoUSD = async () => {
  //     // Fetch the current ETH to USD conversion rate
  //     const conversionRateRes = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');

  //     if (!conversionRateRes.ok) {
  //       throw new Error('Failed to fetch ETH to USD conversion rate');
  //     }

  //     const conversionRateResult = await conversionRateRes.json();
  //     const ethToUsdRate = conversionRateResult.ethereum.usd;

  //     console.log("Current ETH to USD rate:", ethToUsdRate);

  //     // Convert the lowest price from ETH to USD
  //     const lowestPriceInUSD = nft?.price * ethToUsdRate;
  //     console.log("The lowest price in USD is:", lowestPriceInUSD.toFixed(2));
  //     setPriceUSD(lowestPriceInUSD.toFixed(2));
  //   }

  //   pricetoUSD();
  // }, [])



  // const buyasset = async () => {
  //   setLoading(true);
  //   try {

  //     if (typeof window !== "undefined" && window.ethereum && walletAddress) {
  //       const provider = new ethers.providers.Web3Provider(window.ethereum)

  //       const contract = new ethers.Contract(
  //         `${nft?.contract_address}`,
  //         abi,
  //         provider.getSigner()
  //       )

  //       const tx = await contract.mint(1, { value: ethers.utils.parseEther(nft?.price.toString()) });

  //       const result = await tx.wait();

  //       console.log("Result:", result);
  //       setLoading(false);
  //       window.location.href = `/confirm/${nft?.id}`;
  //     }
  //     else {
  //       toast.warning('Connect your wallet');
  //       setLoading(false);
  //     }

  //   } catch (error) {
  //     console.error("Error handling buy asset:", error);
  //     setLoading(false); // Set loading state to false in case of error
  //   }
  // };


  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* Main Link for NFT */}
      <Link href={`/nfts/${nft.phygital_id}`}>
        <div
          style={{
            width: "330px",
            borderRadius: "30px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
            overflow: "hidden",
            cursor: "pointer",
          }}
        >
          <div style={{ position: 'relative' }}>
            <img
              src={`https://nftstorage.link/ipfs/${nft?.free_nft_image.slice(7)}`}
              className="rounded"
              style={{ padding: "20px", borderRadius: '30px' }}
              alt="Gold Headphones"
            />
          </div>

          <div
            className="flex justify-between"
            style={{ paddingLeft: "20px", paddingRight: "20px", justifyContent: 'space-between' }}
          >
            {/* <div className="font-bold text-lg">{nft?.name}</div> */}
            <div>...</div>
          </div>
        </div>
      </Link>

      <ToastContainer />

      {loading && (
        <div
          style={{
            display: "flex",
            overflowY: "auto",
            overflowX: "hidden",
            position: "fixed",
            inset: 0,
            zIndex: 50,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            maxHeight: "100%",
          }}
          id="popupmodal"
        >
          <div style={{ position: "relative", padding: "1rem", width: "100%", maxHeight: "100%" }}>
            <div style={{ position: "relative", borderRadius: "0.5rem", boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)" }}>
              <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
                <img
                  src="https://i.pinimg.com/originals/36/3c/2e/363c2ec45f7668e82807a0c053d1e1d0.gif"
                  alt="Loading icon"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

}

export default TokenNftCard;
