"use client";
import { React, useEffect, useState } from "react";
import Header1 from '../../components/header1';
import { useAccount } from "wagmi";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "@/components/footer";

function Cart() {
    const { address } = useAccount();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const baseUri = process.env.NEXT_PUBLIC_URI || 'https://app.myriadflow.com';


    const getCartItems = async () => {
        try {
            const response = await fetch(`${baseUri}/cart/${address}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch cart items');
            }

            const cartItems = await response.json();
            setCartItems(cartItems);
        } catch (error) {
            toast.error('Failed to fetch cart items.');
            console.error('Error fetching cart items:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (address) {
            getCartItems();
        }
    }, [address]);

    return (
        <div>
            <Header1 />
            <div className="mx-4 mt-32 sm:mx-8 md:mx-10">

                <h1 className="text-2xl sm:text-3xl font-bold mb-10">My Shopping Cart</h1>
                <div className="flex flex-wrap gap-4">
                    {cartItems.length > 0 ? (
                        cartItems.map((item) => (
                            <div key={item.phygital_id} style={{
                                position: "relative",
                                display: "inline-block",
                                width: "330px",
                                borderRadius: "30px",
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                                overflow: "hidden",
                                cursor: "pointer",
                                padding: "20px",
                                border: "1px solid #ddd"
                            }}>
                                {/* Main Link for NFT */}
                                <div style={{ position: 'relative' }}>
                                    <Link href={`/nfts/${item.phygital_id}`}>
                                        <img
                                            src={`https://nftstorage.link/ipfs/${item.image.slice(7)}`}
                                            className="rounded"
                                            style={{ width: "100%", height: "auto", borderRadius: '30px' }}
                                            alt={item.name}
                                        />
                                        <div className="flex flex-col mt-4">
                                            <div className="font-bold text-lg">{item.name}</div>
                                            <div className="text-lg text-gray-600">{item.price} ETH</div>
                                        </div>
                                    </Link>
                                    <div className="flex justify-between mt-4">
                                        <p className="text-lg text-black">{item.quantity} in Cart</p>
                                        <Link href={`/nfts/${item.phygital_id}`}>
                                            <button className="px-6 py-4 text-lg" style={{
                                                backgroundColor: "#DF1FDD36",
                                                border: "1px solid black",
                                                height: "30px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                borderRadius: "5px",

                                            }}>
                                                Buy
                                            </button>
                                        </Link>
                                        <button
                                            className="px-4 bg-red-500 text-white rounded hover:bg-red-600"
                                            onClick={async () => {
                                                try {
                                                    await fetch(`${baseUri}/cart/${address}/${item.phygital_id}`, {
                                                        method: 'DELETE',
                                                        headers: {
                                                            'Content-Type': 'application/json'
                                                        }
                                                    });
                                                    setCartItems(cartItems.filter(cartItem => cartItem.phygital_id !== item.phygital_id));
                                                    toast.success('Item removed from cart.');
                                                } catch (error) {
                                                    toast.error('Failed to remove item from cart.');
                                                    console.error('Error removing item:', error);
                                                }
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>

                                {/* Brand Logo and Hover Effect */}
                                <img
                                    src={`https://nftstorage.link/ipfs/${item.logo?.slice(7)}`}
                                    alt="Brand Logo"
                                    className="absolute top-2 left-2 w-12 h-12 rounded-full z-10"
                                />

                                {/* Web XR Link */}
                                <Link href={`https://webxr.myriadflow.com/${item.phygital_id}`} target="_blank"
                                    className="absolute top-2 right-2 px-3 py-1 text-sm bg-white border border-black rounded"
                                >
                                    Web XR
                                </Link>
                                <ToastContainer />

                                {loading && (
                                    <div
                                        className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
                                        id="popupmodal"
                                    >
                                        <div className="bg-white p-4 rounded shadow-lg">
                                            <div className="flex justify-center">
                                                <img
                                                    src="https://i.pinimg.com/originals/36/3c/2e/363c2ec45f7668e82807a0c053d1e1d0.gif"
                                                    alt="Loading icon"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-2xl sm:text-3xl text-center col-span-full mt-32">Your cart is empty.</p>
                    )}
                </div>
            </div>
            <div className="mt-20">
                <Footer />
            </div>
        </div>
    );
}

export default Cart;
