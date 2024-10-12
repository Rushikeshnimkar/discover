import React from 'react';
import Link from 'next/link';

const Footer = () => {

  const socialLinks = [
    { icon: '/Vector3.png', link: 'https://discord.gg/38jktRtuY7' },
    { icon: '/Vector4.png', link: 'https://t.me/MyriadFlow' },
    { icon: '/Vector2.png', link: 'https://x.com/0xMyriadFlow' },
    { icon: '/Vector5.png', link: 'https://www.instagram.com/0xmyriadflow' }
  ];

  return (
    <div>
      <footer className="bg-gradient-to-r from-[#30D8FF] via-[#A32CC4] to-[#C243FE] p-10 lg:p-16">
        <section className="flex flex-col lg:flex-row justify-between items-center space-y-10 lg:space-y-0">

          <div className="brand text-left">
            <Link href="https://myriadflow.com/" passHref>
              <img
                src="/MFlogo.png"
                width={200}
                height={200}
                alt="logo"
                className="mb-5"
              />
            </Link>
            <p className="text-white max-w-xs text-sm">
              Innovative next-gen platform for exploring and launching NFT Xperiences with AI-powered brand ambassadors and no-code tools.
            </p>
            <p className="mt-8 text-white text-xs">
              © Copyright 2024 MyriadFlow. All rights reserved
            </p>
          </div>

          <div className="links text-left text-white text-sm">
            <h3 className='text-2xl font-semibold'>About</h3>
            <Link href="/guide" className="block mt-7 text-white no-underline">
              Guide
            </Link>
            <Link href="/MyriadFlow_Terms_of_Service.pdf" target="_blank" className="block text-white no-underline">
              Terms of Service
            </Link>
            <Link href="/MyriadFlow_Creator_Terms_and_Conditions.pdf" target="_blank" className="block text-white no-underline">
              Creator Terms and Conditions
            </Link>
            <Link href="/MyriadFlow_Privacy_Policy.pdf" target="_blank" className="block text-white no-underline">
              Privacy Policy
            </Link>
            <Link href="/MyriadFlow_Community_Guidelines.pdf" target="_blank" className="block text-white no-underline">
              Community Guidelines
            </Link>
          </div>

          <div className="platform text-left text-white text-sm mr-20">
            <h3 className='text-2xl font-semibold'>Platform</h3>
            <Link href="https://studio.myriadflow.com" className="block mt-7 text-white no-underline">
              Studio
            </Link>
            <Link href="https://discover.myriadflow.com" className="block text-white no-underline">
              Discover
            </Link>
            <Link href="https://webxr.myriadflow.com" className="block text-white no-underline">
              WebXR
            </Link>
          </div>

          <section
            id="connect"
            className="social-links flex justify-center lg:justify-end gap-5"
          >
            {socialLinks.map(({ icon, link }, index) => (
              <div key={index} className="rounded-full border-2 border-[#0E46A3] p-4 bg-[#15063C]">
                <Link href={link} target="_blank">
                  <img
                    src={icon}
                    width={20}
                    height={20}
                    alt="Social Icon"
                  />
                </Link>
              </div>
            ))}
          </section>
        </section>
      </footer>
    </div>
  );
};

export default Footer;
