"use client"
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAccount } from 'wagmi';
import Link from 'next/link';
import Header1 from '@/components/header1';

const ElevateForm = () => {
    const baseUri = process.env.NEXT_PUBLIC_URI || 'https://app.myriadflow.com';
    const account = useAccount();
    const [username, setUserName] = useState('');

    useEffect(() => {
        const getUserData = async () => {
            if (account.address) {
                try {
                    const response = await fetch(`${baseUri}/profiles/wallet/${account.address}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setUserName(data.username);
                    } else {
                        console.log('No user found');
                    }
                } catch (error) {
                    console.error('Error fetching user data', error);
                }
            }
        };
        getUserData();
    }, [account.address]);

    const [formData, setFormData] = useState({
        full_name: '',
        email_address: '',
        brand_description: '',
        program_alignment: '',
        brand_vision: '',
        additional_information: '',
        chaintype_id: '6c736e9b-37e6-43f5-9841-c0ac740282df',
        status: 'pending',
        wallet_address: account.address,
    });

    const [tosChecked, setTosChecked] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch(`${baseUri}/elevate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            toast.success('Form submitted successfully!');
            setIsSubmitted(true);
            setFormData({
                full_name: '',
                email_address: '',
                brand_description: '',
                program_alignment: '',
                brand_vision: '',
                additional_information: '',
                chaintype_id: '6c736e9b-37e6-43f5-9841-c0ac740282df',
                status: 'pending',
                wallet_address: account.address,
            });
            setTosChecked(false);
        } else {
            toast.error('Error submitting form');
        }
    };

    return (
        <>
            <Header1 />
            <div className=" mx-60 p-4 mt-24">
                <h1 className="text-2xl font-bold text-center mb-6">MYRIADFLOW ELEVATE PROGRAM APPLICATION FORM</h1>
                <hr className="border-t-2 border-gray-300 mb-6" />
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-lg font-medium">1. Full Name</label>
                        <input
                            type="text"
                            name="full_name"
                            placeholder="Provide your full name"
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 mb-10"
                            value={formData.full_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-medium">2. Email Address</label>
                        <input
                            type="email"
                            name="email_address"
                            placeholder="Provide a valid email address for communication."
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 mb-10"
                            value={formData.email_address}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-medium">3. Brief Description of Your Brand/Project:</label>
                        <textarea
                            name="brand_description"
                            placeholder="What is your brand or project about? (max 150 words)"
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 mb-10"
                            maxLength="150"
                            value={formData.brand_description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-medium">4. Why Do You Believe You Belong in the Emerging Creator Program?</label>
                        <textarea
                            name="program_alignment"
                            placeholder="Explain how you align with the program's goals and values. (max 150 words)"
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 mb-10"
                            maxLength="150"
                            value={formData.program_alignment}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-medium">5. What Potential Do You See in Your Brand or Project?</label>
                        <textarea
                            name="brand_vision"
                            placeholder="Share your vision for growth and how you plan to contribute to the MyriadFlow community. (max 150 words)"
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 mb-10"
                            maxLength="150"
                            value={formData.brand_vision}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-medium">6. Any Additional Information You Would Like to Provide:</label>
                        <textarea
                            name="additional_information"
                            placeholder="Share anything else you think we should know about you or your project. (max 100 words)"
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 mb-10"
                            maxLength="100"
                            value={formData.additional_information}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4 flex items-center mt-4">
                        <input
                            type="checkbox"
                            id="tos"
                            checked={tosChecked}
                            onChange={(e) => setTosChecked(e.target.checked)}
                            className="mr-2 -mt-"
                            required
                        />
                        <label htmlFor="tos" className="text-sm">
                            I have read and accept the{' '}
                            <span className="text-blue-500">Terms of Service</span>
                        </label>
                    </div>
                    <button
                        type="submit"
                        className={`bg-cyan-300 text-black py-2 rounded-lg px-10 ${!tosChecked ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={!tosChecked}
                    >
                        Submit Form
                    </button>
                </form>
                {isSubmitted && (
                    <div>
                        <p className="mb-4 mt-8">
                            Thank you for your interest in the MyriadFlow Elevate Program! We look forward to reviewing your application. Please keep checking your provided email address, and the <Link href={`/${username}`} className="text-blue-500 underline">create page</Link> on your profile for further communication. Best of luck!
                        </p>
                    </div>
                )}
                <ToastContainer />
            </div>
        </>

    )
}

export default ElevateForm;