import Footer from '@/components/footer';
import Header1 from '@/components/header1';
import Image from 'next/image';
import Link from 'next/link';

export default function GuidePage() {
    return (
        <>
            <div
                className=''
                style={{ zIndex: 10, position: 'fixed', left: 0, right: 0 }}
            >
                <Header1 />
            </div>
            <div className="mx-60 px-4 py-8 mt-32">
                <h1 className="text-5xl font-bold mb-4">Create a profile</h1>

                <p className="text-3xl mb-6">
                    Become an Early User: Shape the Future of Digital Expression with MyriadFlow!
                </p>

                <p className="text-xl mb-6">
                    Your profile will be at myriadflow.com/username
                </p>

                <div className="mb-8">
                    <img
                        src="/guide.png"
                        alt="MyriadFlow Profile Example"
                        width={600}
                        height={300}
                        className="w-full rounded-lg shadow-lg"
                    />
                </div>

                <h2 className="text-3xl font-semibold mb-4">What You Need:</h2>

                <p className="text-2xl mb-4">To get started on MyriadFlow, you&apos;ll need:</p>

                <ul className="text-2xl list-disc pl-6 mb-6 space-y-2">
                    <li>A Web3 wallet - If you don&apos;t have one yet, no worries! It&apos;s simple to set up, and you can also use familiar logins like Google or X. We recommend using the Chrome browser for the best experience, as it works smoothly with all the features across our platform. Keep in mind that if you create a Web3 wallet as a browser extension, it will only be accessible in the browser you used to create it.</li>
                    <li>Profile image, cover image, a short bio, and some other information like social links - These will personalize your profile once it&apos;s created.</li>
                </ul>

                <h3 className="text-3xl font-semibold mb-2">Steps to Create Your Profile:</h3>

                <ol className="text-2xl list-decimal pl-6 mb-6 space-y-2">
                    <li>Go to <Link href="https://discover.myriadflow.com/" className="text-blue-600 hover:underline">https://discover.myriadflow.com/</Link> and click on &quot;Connect&quot; (this is where you connect or create your Web3 wallet).</li>
                    <li>Switch network to Base if you&apos;re not on Base Network already</li>
                    <li>Fill in the required information in the pop-up box.</li>
                    <li>Click on the circle at the top right of the page, next to notifications, and select &quot;View Profile&quot;.</li>
                    <li>Click on &quot;Edit Profile&quot; (wait for &quot;Follow&quot; to change to &quot;Edit Profile&quot;)</li>
                    <li>Fill in all the required fields (profile image, cover image, bio, etc.) and click &quot;Save Changes&quot;.</li>
                    <li>Visit <Link href="https://discover.myriadflow.com/users" className="text-blue-600 hover:underline">https://discover.myriadflow.com/users</Link> to see your profile among other users!
                        Click on your profile to view your unique profile and URL.</li>
                </ol>

                <p className="text-2xl mb-12 mt-20">
                    Join Our Community!
                </p>

                <p className="text-2xl mb-8">
                    We&apos;d love to have you with us! Join our active communities on <Link href="https://t.me/MyriadFlow" className="text-blue-600 hover:underline">Telegram</Link> and <Link href="https://discord.gg/38jktRtuY7" className="text-blue-600 hover:underline">Discord</Link> to stay updated, engage in discussions, and interact with our team and other early adopters.
                </p>

                <h2 className="text-4xl font-bold text-center">
                    Welcome to the future! Welcome to MyriadFlow!
                </h2>
            </div>
            <div className='mt-20'>
                <Footer />
            </div>
        </>
    );
}