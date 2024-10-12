"use client"
import { useEffect, useState } from 'react';
import { useAccount, useChainId } from 'wagmi';
import Moralis from 'moralis';
import ProfileNftCard from '../../components/profileNftCard';
import TokenNftCard from '../../components/tokenNftCard';
import Header1 from '../../components/header1';
import Footer from '../../components/footer';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function HomePage({ params }) {
  const { username } = params;

  const { address } = useAccount();
  const chainId = useChainId();
  const router = useRouter();

  const [mintedNFTs, setMintedNFTs] = useState([]);
  const [matchedNFTs, setMatchedNFTs] = useState([]);
  const [matchedWebxrs, setMatchedWebxr] = useState([]);
  const [name, setName] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [x, setX] = useState('');
  const [instagram, setInstagram] = useState('');
  const [guestname, setGuestName] = useState('');
  const [guestcoverImage, setGuestCoverImage] = useState('');
  const [guestprofileImage, setGuestProfileImage] = useState('');
  const [guestbio, setGuestBio] = useState('');
  const [guestwebsite, setGuestWebsite] = useState('');
  const [guestx, setGuestX] = useState('');
  const [guestinstagram, setGuestInstagram] = useState('');
  const [walletAddress, setGuestWalletAddress] = useState('');
  const [activeSection, setActiveSection] = useState('assets');
  const [showForm, setShowForm] = useState(false);
  const [owner, setOwner] = useState(false);
  const [showCreatorOptions, setShowCreatorOptions] = useState(false);
  const [hoveredOption, setHoveredOption] = useState(null);
  const [status, setStatus] = useState('');

  const apikey = process.env.NEXT_PUBLIC_MORALIS_API_KEY;
  const baseUri = process.env.NEXT_PUBLIC_URI || 'https://app.myriadflow.com';

  const handleVerify = () => {
    setShowForm(true)
  };

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        await Moralis.start({ apiKey: apikey });

        const assets = await Moralis.EvmApi.nft.getWalletNFTs({
          chain: chainId,
          format: 'decimal',
          mediaItems: false,
          address: walletAddress
        });

        setMintedNFTs(assets.raw.result);
        console.log("NFTs:", assets.raw.result);
      } catch (e) {
        console.error(e);
      }
    };

    if (walletAddress && chainId) {
      fetchNFTs();
    }
  }, [walletAddress, chainId, apikey]);

  useEffect(() => {
    const getUserData = async () => {
      if (address) {
        try {
          const response = await fetch(`${baseUri}/profiles/username/${username}`, {
            method: 'GET',
            headers: {
              'content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const data = await response.json();
            console.log(data.name);
            setGuestName(data.name);
            setGuestCoverImage(data.cover_image);
            setGuestProfileImage(data.profile_image);
            setGuestBio(data.bio);
            setGuestWebsite(data.website);
            setGuestX(data.x);
            setGuestInstagram(data.instagram);
            setGuestWalletAddress(data.wallet_address);
          } else {
            console.log('No user found');
          }
        } catch (error) {
          console.error('Error fetching user data', error);
        }
      }
    };
    getUserData();
  }, [address]);

  useEffect(() => {
    const getUserData = async () => {
      if (address) {
        try {
          const response = await fetch(`${baseUri}/profiles/wallet/${address}`, {
            method: 'GET',
            headers: {
              'content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const data = await response.json();
            console.log(data.name);
            setName(data.name);
            setCoverImage(data.cover_image);
            setProfileImage(data.profile_image);
            setBio(data.bio);
            setWebsite(data.website);
            setX(data.x);
            setInstagram(data.instagram);
          } else {
            console.log('No user found');
          }
        } catch (error) {
          console.error('Error fetching user data', error);
        }
      }
    };
    getUserData();
  }, [address]);

  useEffect(() => {
    const fetchPhygitals = async () => {
      try {
        const phyres = await fetch(`${baseUri}/phygitals/all/554b4903-9a06-4031-98f4-48276c427f78`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!phyres.ok) {
          throw new Error('Failed to fetch data');
        }

        const phyresult = await phyres.json();
        console.log("Phygitals:", phyresult);

        const matched = await Promise.all(phyresult.map(async (phygital) => {
          const amountBought = await mintedNFTs.reduce(async (countPromise, nft) => {
            const count = await countPromise;
            return count + (nft?.token_address === phygital.contract_address ? 1 : 0);
          }, Promise.resolve(0));
          return {
            ...phygital,
            amount_bought: amountBought
          };
        }));

        const filteredMatched = matched.filter(phygital => phygital.amount_bought > 0);
        setMatchedNFTs(filteredMatched);
        console.log("Matched NFTs:", filteredMatched);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (mintedNFTs.length > 0) {
      fetchPhygitals();
    }
  }, [mintedNFTs, baseUri]);

  useEffect(() => {
    const fetchPhygitals = async () => {
      try {
        const phyres = await fetch(`${baseUri}/phygitals/all/554b4903-9a06-4031-98f4-48276c427f78`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!phyres.ok) {
          throw new Error('Failed to fetch data');
        }

        const phyresult = await phyres.json();
        console.log("Phygitals:", phyresult);

        const matchedfantoken = await Promise.all(phyresult.map(async (phygital) => {
          const amountBought = await mintedNFTs.reduce(async (countPromise, nft) => {
            const count = await countPromise;
            if (nft?.contract_type === 'ERC1155') {
              try {
                const response = await fetch(`${baseUri}/get-mint-fantoken/${walletAddress}`, {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json'
                  }
                });

                if (!response.ok) {
                  throw new Error('Failed to fetch minted tokens');
                }

                const mintedFanTokens = await response.json();

                const matchingFanToken = mintedFanTokens.find(token => {
                  return token.nftContractAddress === phygital.contract_address &&
                    token.token_id === nft.token_id;
                });
                return count + (matchingFanToken ? 1 : 0);
              } catch (error) {
                console.error('Error fetching minted tokens:', error);
                return count;
              }
            }
            return count;
          }, Promise.resolve(0));
          return {
            ...phygital,
            amount_bought: amountBought
          };
        }));
        const filteredMatchedFanToken = matchedfantoken.filter(phygital => phygital.amount_bought > 0);
        const response = await fetch(`${baseUri}/webxr/all/554b4903-9a06-4031-98f4-48276c427f78`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch minted tokens');
        }

        const webxr = await response.json();
        const matchingWebxr = webxr.filter(web =>
          filteredMatchedFanToken.some(phygital => phygital.id === web.phygital_id)
        );
        setMatchedWebxr(matchingWebxr);
        console.log("Matched Fantoken:", filteredMatchedFanToken);
        console.log("Matched webxr:", matchingWebxr);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (mintedNFTs.length > 0) {
      fetchPhygitals();
    }
  }, [mintedNFTs, baseUri]);

  useEffect(() => {
    const getPhygitalData = async () => {
      if (walletAddress) {
        try {
          const response = await fetch(`${baseUri}/phygitals/deployer_address/${walletAddress}`, {
            method: 'GET',
            headers: {
              'content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const data = await response.json();
            setOwner(true);
            console.log("Phygital data based on address", data);
          } else {
            console.log('No Phygital found');
          }
        } catch (error) {
          console.error('Error fetching user data', error);
        }
      }
    };
    getPhygitalData();
  }, [walletAddress]);

  useEffect(() => {
    const getElevateData = async () => {
      if (walletAddress) {
        try {
          const response = await fetch(`${baseUri}/elevate/walletaddress/${walletAddress}`, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (response.ok) {
            const data = await response.json();
            setStatus(data.status);
          } else {
            console.log('No user found');
          }
        } catch (error) {
          console.error('Error fetching user data', error);
        }
      } else {
        console.log('No wallet address provided');
      }
    };

    getElevateData();
  }, [walletAddress]);

  if (address === walletAddress) {
    return (
      <>
        <Header1 />

        <div
          style={{
            position: 'relative',
            height: '350px',
            backgroundColor: coverImage ? 'transparent' : '#D1D5DB',
            backgroundImage: coverImage ? `url(${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${coverImage})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            marginTop: '100px',
            borderRadius: '8px'
          }}
        >

          <div
            style={{
              position: 'absolute',
              left: '15%',
              transform: 'translateX(-50%)',
              bottom: '-46px',
            }}
          >
            <img
              src={profileImage ? `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${profileImage}` : "/profile.png"}
              alt="Profile"
              style={{
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                border: '4px solid white',
                objectFit: 'cover',
              }}
            />
          </div>
        </div>

        <div className="flex flex-col p-6" style={{ marginLeft: '2.5rem' }}>
          <div className="flex mt-10">
            <h1 className="text-4xl">{name || 'Your Name'}</h1>
            {owner ? (
              <h1 className="text-2xl mt-2" style={{ marginLeft: '2.5rem' }}>Creator</h1>
            ) : matchedNFTs.length > 0 ? (
              <h1 className="text-2xl mt-2" style={{ marginLeft: '2.5rem' }}>Owner</h1>
            ) : matchedWebxrs.length > 0 ? (
              <h1 className="text-2xl mt-2" style={{ marginLeft: '2.5rem' }}>Supporter</h1>
            ) : (
              <h1 className="text-2xl mt-2" style={{ marginLeft: '2.5rem' }}>Visitor</h1>
            )}
            {instagram || x ? (
              <>
                <img src='/verified.png' style={{ marginLeft: '2.5rem', height: '40px', width: '40px' }} />
                <button className="text-2xl mt-2 ml-2">Verified</button>
              </>
            ) : (
              <>
                <img src='/verified.png' style={{ marginLeft: '2.5rem', height: '40px', width: '40px' }} />
                <button className="text-2xl mt-2 ml-2" onClick={handleVerify}>Get Verified</button>
                {showForm && (
                  <div
                    className="fixed inset-0 bg-white bg-opacity-10 backdrop-blur-sm z-50 flex items-center justify-center"
                    style={{
                      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                      WebkitBoxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                      MozBoxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                    }}
                  >
                    <div className="flex flex-col bg-white rounded-lg p-8 max-w-md w-full text-center">
                      <h2
                        className="text-3xl mb-4"
                        style={{
                          background: 'linear-gradient(90deg, #30D8FF 0%, #5B0292 100%)',
                          backgroundClip: 'text',
                          color: 'transparent',
                          fontFamily: 'Bai Jamjuree, sans-serif'
                        }}
                      >
                        Hold on!
                      </h2>
                      <h2
                        style={{
                          fontFamily: 'Bai Jamjuree, sans-serif',
                          fontWeight: 300,
                          fontSize: '15px',
                          lineHeight: '27.5px',
                          textAlign: 'center',
                          color: 'black'
                        }}
                      >
                        To begin your verification process, you must link your X or Instagram account.
                      </h2>
                      <button
                        onClick={() => {
                          setShowForm(false);
                          router.push('/profile-setting');
                        }}
                        className="w-full py-2 mt-2 rounded-md border border-gray-300 bg-white text-black bg-sky-500"
                      >
                        Continue
                      </button>
                      <button
                        onClick={() => setShowForm(false)}
                        className="w-full py-2 mt-2 rounded-md border border-gray-300 bg-white text-black"
                      >
                        Cancle
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

          </div>
          <h1 style={{ marginTop: '0.5rem', fontSize: '1.125rem', color: '#374151', fontWeight: '600' }}>Wallet Address : {address}</h1>

          <p className="text-gray-500 text-lg mt-6 w-3/5">{bio || "Short bio of the person here"}</p>

          <div className="flex mt-6">
            <Link
              href="/profile-setting"
              style={{
                backgroundColor: '#E6E6E6',
                color: 'black',
                padding: '10px 20px',
                borderRadius: '8px',
                textAlign: 'center',
                textDecoration: 'none'
              }}
            >
              Edit Profile
            </Link>


            <button
              style={{
                backgroundColor: '#ffffff',
                color: '#000000',
                padding: '10px 40px',
                borderRadius: '8px',
                border: '4px solid #38bdf8',
                marginLeft: '1rem'
              }}
            >
              SHARE
            </button>
          </div>

          <div style={{ float: 'right', width: '300px', marginLeft: '1150px', marginTop: '-200px' }}>
            <div style={{ display: 'flex' }}>
              {website && (
                <a href={website} target="_blank" rel="noopener noreferrer">
                  <img src='/website.png' style={{ height: '30px', width: '30px' }} alt="Website" />
                </a>
              )}
              {x && (
                <a href={x} target="_blank" rel="noopener noreferrer">
                  <img src='/x.png' style={{ height: '30px', width: '30px', marginLeft: '10px' }} alt="X" />
                </a>
              )}
              {instagram && (
                <a href={instagram} target="_blank" rel="noopener noreferrer">
                  <img src='/insta.png' style={{ height: '30px', width: '30px', marginLeft: '10px' }} alt="Instagram" />
                </a>
              )}
            </div>

            <div style={{ marginTop: '2.5rem', padding: '1.5rem', backgroundColor: '#FFFFFF', borderRadius: '0.5rem', boxShadow: '0 10px 10px rgba(0, 0, 0, 0.1)' }}>
              <div style={{ backgroundColor: '#FFFFFF' }}>
                <h1 style={{ fontSize: '1.125rem', color: '#6B7280' }}>{'0 Followers'}</h1>
                <h1 style={{ fontSize: '1.125rem', color: '#6B7280' }}>{'0 Following'}</h1>
                <h1 style={{ marginTop: '0.5rem', fontSize: '1.125rem', color: '#374151', fontWeight: '600' }}>Address</h1>
                <h1 style={{ fontSize: '1.125rem', color: '#6B7280' }} className='truncate-wallet'>{address}</h1>
              </div>
            </div>
          </div>

          <div className="flex mt-10 text-gray-700">
            <button
              id='myassets'
              className={`text-lg hover:text-black hover:underline ${activeSection === 'assets' ? 'text-black underline' : ''}`}
              style={{ marginRight: '2.5rem', fontSize: '1.25rem' }}
              onClick={() => setActiveSection('assets')}
            >
              My assets
            </button>
            <button
              id='onsale'
              className={`text-lg hover:text-black hover:underline ${activeSection === 'sale' ? 'text-black underline' : ''}`}
              style={{ marginRight: '2.5rem', fontSize: '1.25rem' }}
              onClick={() => setActiveSection('sale')}
            >
              On Sale
            </button>
            <button
              id='mybrands'
              className={`text-lg hover:text-black hover:underline ${activeSection === 'brands' ? 'text-black underline' : ''}`}
              style={{ marginRight: '2.5rem', fontSize: '1.25rem' }}
              onClick={() => setActiveSection('brands')}
            >
              My Brands
            </button>
            <button
              id='mycollections'
              className={`text-lg hover:text-black hover:underline ${activeSection === 'collections' ? 'text-black underline' : ''}`}
              style={{ marginRight: '2.5rem', fontSize: '1.25rem' }}
              onClick={() => setActiveSection('collections')}
            >
              My collections
            </button>
            <button
              id='activity'
              className={`text-lg hover:text-black hover:underline ${activeSection === 'activity' ? 'text-black underline' : ''}`}
              style={{ marginRight: '2.5rem', fontSize: '1.25rem' }}
              onClick={() => setActiveSection('activity')}
            >
              Activity
            </button>
            <button
              id='rewards'
              className={`text-lg hover:text-black hover:underline ${activeSection === 'rewards' ? 'text-black underline' : ''}`}
              style={{ marginRight: '2.5rem', fontSize: '1.25rem' }}
              onClick={() => setActiveSection('rewards')}
            >
              Rewards
            </button>
            {owner ? (
              <a
                href="https://studio.myriadflow.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-lg hover:text-black hover:underline`}
                style={{ marginRight: '2.5rem', fontSize: '1.25rem' }}
              >
                Create
              </a>
            ) : (
              <button
                id='create'
                className={`text-lg hover:text-black hover:underline ${activeSection === 'create' ? 'text-black underline' : ''}`}
                style={{ marginRight: '2.5rem', fontSize: '1.25rem' }}
                onClick={() => setActiveSection('create')}
              >
                Create
              </button>
            )}
          </div>

          <div style={{ padding: '50px' }}>
            {activeSection === 'assets' && (
              <>
                <div className='mt-10 flex' style={{ gap: '20px', flexWrap: 'wrap' }}>
                  {matchedNFTs?.map((nft, index) => (
                    <ProfileNftCard key={index} nft={nft} />
                  ))}
                </div>
                <div className='mt-10 flex' style={{ gap: '20px', flexWrap: 'wrap' }}>
                  {Array.isArray(matchedWebxrs) && matchedWebxrs.map((nft, index) => (
                    <TokenNftCard key={index} nft={nft} />
                  ))}
                </div>
              </>
            )}
            {activeSection === 'create' && (
              <>
                <div>
                  {instagram || x ? (
                    <>
                      {!showCreatorOptions && status !== 'pending' && status !== 'done' && (
                        <>
                          <div className='flex gap-4'>
                            <img src='/verified.png' alt="Verified" style={{ marginRight: '10px', height: '60px', width: '60px' }} />
                            <h2 className='mt-2'>You have completed the verification process. Your profile is now visible on <br /> the Users page. You can also now become a creator!</h2>
                          </div>
                          <div className='flex gap-8 mt-10 mx-20'>
                            <Link href="/users">
                              <button className="bg-pink-300 text-black rounded-full px-8 py-2 border border-black">See Users</button>
                            </Link>
                            <button
                              className="bg-pink-300 text-black rounded-full px-8 py-2 border border-black"
                              onClick={() => setShowCreatorOptions(true)}
                            >
                              Become a Creator
                            </button>
                          </div>
                        </>
                      )}

                      {showCreatorOptions && status !== 'pending' && status !== 'done' && (
                        <div style={{ marginTop: '20px' }}>
                          <h2>You have not yet created any brands. Are you a <strong
                            onMouseEnter={() => setHoveredOption('premium')}
                            onMouseLeave={() => setHoveredOption(null)}
                            style={{ cursor: 'pointer', textDecoration: 'underline' }}
                          >
                            Premium Brand
                          </strong> or looking to join our <strong
                            onMouseEnter={() => setHoveredOption('elevate')}
                            onMouseLeave={() => setHoveredOption(null)}
                            style={{ cursor: 'pointer', textDecoration: 'underline' }}
                          >
                              Elevate Program
                            </strong>? Choose the correct alternative.</h2>
                          <div style={{ marginTop: '10px' }}>
                            <button className="bg-blue-500 text-white rounded-full px-8 py-2">Premium Brand</button>
                            <Link href="/elevateform">
                              <button className="bg-blue-500 text-white rounded-full px-8 py-2" style={{ marginLeft: '10px' }}>Join Elevate Program</button>
                            </Link>
                          </div>
                        </div>
                      )}
                      {status === 'pending' && (
                        <div>
                          <p className="mb-4 mt-8">
                            Thank you for your interest in the MyriadFlow Elevate Program! We look forward to reviewing your application. Please keep checking your provided email address, and this page for further communication. Best of luck!
                          </p>
                        </div>
                      )}
                      {status === 'done' && (
                        <>
                          <div className='flex gap-4'>
                            <img src='/trophy2.png' alt="Verified" style={{ marginRight: '10px', height: '100px', width: '100px' }} />
                            <h2 className='mt-2'>Congratulations! You have been approved to join our Elevate Program!
                              <br />We have credited your wallet with funds to claim your Basename (5+ characters for 1 year) and to launch your first collection.                        </h2>
                          </div><div className='flex gap-8 mt-10 mx-20'>
                            <a href="https://www.base.org/names" target="_blank" rel="noopener noreferrer">
                              <button className="bg-cyan-300 text-black rounded-full px-8 py-2 border border-black">
                                Claim Basename
                              </button>
                            </a>
                            <a href="https://studio.myriadflow.com/" target="_blank" rel="noopener noreferrer">
                              <button
                                className="bg-cyan-300 text-black rounded-full px-8 py-2 border border-black"
                              >
                                Create a Brand
                              </button>
                            </a>
                          </div>
                        </>
                      )}

                      {hoveredOption === 'premium' && (
                        <div className="popup" style={popupStyle}>
                          <h3>Premium Brand</h3>
                          <p>Select this option if you meet the criteria to be featured as a premium brand or creator on MyriadFlow&apos;s main Discover marketplace. Premium brands enjoy enhanced visibility and access to exclusive tools designed for established creators and brands.</p>
                        </div>
                      )}

                      {hoveredOption === 'elevate' && (
                        <div className="popup" style={popupStyle}>
                          <h3>Elevate Program</h3>
                          <p>Choose this option if you are an emerging creator or grassroots brand seeking to leverage our platform&apos;s unique features.</p>
                          <p>You will benefit from sponsored Basenames and incur no upfront costs to launch your phygital NFTs and virtual brand ambassadors.</p>
                          <p>As your brand develops and gains traction, you&apos;ll have the opportunity to transition into the premium category and be showcased on our main page.</p>
                        </div>
                      )}
                    </>
                  ) : (
                    <div>
                      <h2>Verification Required</h2>
                      <p>Please link your Instagram or X account to create content.</p>
                    </div>
                  )}
                </div>
              </>
            )}


            {activeSection !== 'assets' && activeSection !== 'create' && (
              <div className='mt-10 text-center text-2xl text-gray-600'>
                Coming Soon
              </div>
            )}
          </div>
        </div>

        <div className='pt-20'>
          <Footer />
        </div>
      </>
    );
  } else {
    return (
      <>
        <Header1 />

        <div
          style={{
            position: 'relative',
            height: '350px',
            backgroundColor: coverImage ? 'transparent' : '#D1D5DB',
            backgroundImage: coverImage ? `url(${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${guestcoverImage})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            marginTop: '100px',
            borderRadius: '8px'
          }}
        >

          <div
            style={{
              position: 'absolute',
              left: '15%',
              transform: 'translateX(-50%)',
              bottom: '-46px',
            }}
          >
            <img
              src={profileImage ? `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${guestprofileImage}` : "/profile.png"}
              alt="Profile"
              style={{
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                border: '4px solid white',
                objectFit: 'cover',
              }}
            />
          </div>
        </div>

        <div className="flex flex-col p-6" style={{ marginLeft: '2.5rem' }}>
          <div className="flex mt-10">
            <h1 className="text-4xl">{guestname || 'Your Name'}</h1>
            {owner ? (
              <h1 className="text-2xl mt-2" style={{ marginLeft: '2.5rem' }}>Creator</h1>
            ) : matchedNFTs.length > 0 ? (
              <h1 className="text-2xl mt-2" style={{ marginLeft: '2.5rem' }}>Owner</h1>
            ) : matchedWebxrs.length > 0 ? (
              <h1 className="text-2xl mt-2" style={{ marginLeft: '2.5rem' }}>Supporter</h1>
            ) : (
              <h1 className="text-2xl mt-2" style={{ marginLeft: '2.5rem' }}>Visitor</h1>
            )}
            {guestinstagram || guestx ? (
              <>
                <img src='/verified.png' style={{ marginLeft: '2.5rem', height: '40px', width: '40px' }} />
                <button className="text-2xl mt-2 ml-2">Verified</button>
              </>
            ) : (
              <>
                <img src='/verified.png' style={{ marginLeft: '2.5rem', height: '40px', width: '40px' }} />
                <button className="text-2xl mt-2 ml-2">Not Verified</button>
              </>
            )}

          </div>
          <h1 style={{ marginTop: '0.5rem', fontSize: '1.125rem', color: '#374151', fontWeight: '600' }}>Wallet Address : {walletAddress}</h1>

          <p className="text-gray-500 text-lg mt-6 w-3/5">{guestbio || "Short bio of the person here"}</p>

          <div className="flex mt-6">
            <button
              style={{
                backgroundColor: '#E6E6E6',
                color: 'black',
                padding: '10px 20px',
                borderRadius: '8px',
                textAlign: 'center',
                textDecoration: 'none'
              }}
            >
              + Follow
            </button>


            <button
              style={{
                backgroundColor: '#ffffff',
                color: '#000000',
                padding: '10px 40px',
                borderRadius: '8px',
                border: '4px solid #38bdf8',
                marginLeft: '1rem'
              }}
            >
              SHARE
            </button>
          </div>

          <div style={{ float: 'right', width: '300px', marginLeft: '1150px', marginTop: '-200px' }}>
            <div style={{ display: 'flex' }}>
              {guestwebsite && (
                <a href={guestwebsite} target="_blank" rel="noopener noreferrer">
                  <img src='/website.png' style={{ height: '30px', width: '30px' }} alt="Website" />
                </a>
              )}
              {guestx && (
                <a href={guestx} target="_blank" rel="noopener noreferrer">
                  <img src='/x.png' style={{ height: '30px', width: '30px', marginLeft: '10px' }} alt="X" />
                </a>
              )}
              {guestinstagram && (
                <a href={guestinstagram} target="_blank" rel="noopener noreferrer">
                  <img src='/insta.png' style={{ height: '30px', width: '30px', marginLeft: '10px' }} alt="Instagram" />
                </a>
              )}
            </div>

            <div style={{ marginTop: '2.5rem', padding: '1.5rem', backgroundColor: '#FFFFFF', borderRadius: '0.5rem', boxShadow: '0 10px 10px rgba(0, 0, 0, 0.1)' }}>
              <div style={{ backgroundColor: '#FFFFFF' }}>
                <h1 style={{ fontSize: '1.125rem', color: '#6B7280' }}>{'0 Followers'}</h1>
                <h1 style={{ fontSize: '1.125rem', color: '#6B7280' }}>{'0 Following'}</h1>
                <h1 style={{ marginTop: '0.5rem', fontSize: '1.125rem', color: '#374151', fontWeight: '600' }}>Address</h1>
                <h1 style={{ fontSize: '1.125rem', color: '#6B7280' }} className='truncate-wallet'>{walletAddress}</h1>
              </div>
            </div>
          </div>

          <div className="flex mt-10 text-gray-700">
            <button

              className={`text-lg hover:text-black hover:underline ${activeSection === 'assets' ? 'text-black underline' : ''}`}
              style={{ marginRight: '2.5rem', fontSize: '1.25rem' }}
              onClick={() => setActiveSection('assets')}
            >
              Assets
            </button>
            <button

              className={`text-lg hover:text-black hover:underline ${activeSection === 'sale' ? 'text-black underline' : ''}`}
              style={{ marginRight: '2.5rem', fontSize: '1.25rem' }}
              onClick={() => setActiveSection('sale')}
            >
              On Sale
            </button>
            <button

              className={`text-lg hover:text-black hover:underline ${activeSection === 'brands' ? 'text-black underline' : ''}`}
              style={{ marginRight: '2.5rem', fontSize: '1.25rem' }}
              onClick={() => setActiveSection('brands')}
            >
              Brands
            </button>
            <button

              className={`text-lg hover:text-black hover:underline ${activeSection === 'collections' ? 'text-black underline' : ''}`}
              style={{ marginRight: '2.5rem', fontSize: '1.25rem' }}
              onClick={() => setActiveSection('collections')}
            >
              Collections
            </button>
            <button

              className={`text-lg hover:text-black hover:underline ${activeSection === 'activity' ? 'text-black underline' : ''}`}
              style={{ marginRight: '2.5rem', fontSize: '1.25rem' }}
              onClick={() => setActiveSection('activity')}
            >
              Activity
            </button>
          </div>

          <div style={{ padding: '50px' }}>
            {activeSection === 'assets' && (
              <>
                <div className='mt-10 flex' style={{ gap: '20px', flexWrap: 'wrap' }}>
                  {matchedNFTs?.map((nft, index) => (
                    <ProfileNftCard key={index} nft={nft} />
                  ))}
                </div>
                <div className='mt-10 flex' style={{ gap: '20px', flexWrap: 'wrap' }}>
                  {Array.isArray(matchedWebxrs) && matchedWebxrs.map((nft, index) => (
                    <TokenNftCard key={index} nft={nft} />
                  ))}
                </div>
              </>
            )}

            {activeSection !== 'assets' && activeSection !== 'create' && (
              <div className='mt-10 text-center text-2xl text-gray-600'>
                Coming Soon
              </div>
            )}
          </div>
        </div>

        <div className='pt-20'>
          <Footer />
        </div>
      </>
    );
  }
}

const popupStyle = {
  backgroundColor: 'white',
  border: '1px solid #ccc',
  borderRadius: '5px',
  padding: '10px',
  zIndex: 1000,
  width: '300px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

export default HomePage;
