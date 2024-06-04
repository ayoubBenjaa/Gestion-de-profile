import React, { useState } from 'react';
import { MdOutlineMail } from "react-icons/md";
import { IoPhonePortraitOutline, IoCloseSharp, IoLocationOutline } from "react-icons/io5";
import { IoIosPhonePortrait } from "react-icons/io";
import { IoLogoPolymer } from "react-icons/io";
import * as vCard from 'vcard-js';


import {
    FaRegAddressCard,
    FaLinkedin,
    FaYoutube,
    FaInstagramSquare,
    FaLinkedinIn,
    FaFacebookF
} from "react-icons/fa";
import { LiaPhoneVolumeSolid } from "react-icons/lia";
import { FiChrome, FiYoutube } from "react-icons/fi";
import { IoLogoFacebook, IoLogoTwitter } from "react-icons/io";
import { LuInstagram } from "react-icons/lu";

const Profile: React.FC = () => {
    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const embedUrl = `https://www.youtube.com/embed/_MPhk4YTwJQ`;

    const createVCard = (): string => {
        // @ts-ignore
        const vCardInstance = vCard();

        vCardInstance.firstName = 'John';
        vCardInstance.lastName = 'Doe';
        vCardInstance.email = 'john.doe@example.com';
        // Set other properties like phone, organization, etc.

        return vCardInstance.getFormattedString();
    }
    const downloadVCard = () => {
        const vCardInstance = createVCard();
        const blob = new Blob([vCardInstance], { type: 'text/vcard' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'contact.vcf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }


    return (
        <div className="border-2 relative w-full sm:w-[600px] mx-auto">
            <img className="h-[250px] object-cover w-full" src="1.jpg" alt="image" />
            <div className="bg-white absolute left-[36%] top-[170px] flex justify-center items-center rounded-full h-[160px] w-[160px]">
                <img className="shadow p-2 h-[158px] w-[158px] rounded-full object-cover" src="2.jpg" alt="image" />
            </div>
            <div className="flex flex-col mt-28 items-center">
                <h1 className="text-4xl font-bold">Ayoub BENJAA</h1>
                <p className="py-6 text-2xl">FULL STACK WEB DEVELOPER</p>
                <p className="font-semibold text-xl">Lorem, ipsum dolor Lorem</p>
            </div>
            <div className="flex my-8 justify-around">
                <button onClick={downloadVCard} className="bg-teal-700 rounded-md text-2xl p-2 w-[45%] text-white">Enregistrer</button>
                <button className="bg-teal-700 rounded-md text-2xl p-2 w-[45%] text-white" onClick={togglePopup}>Contacter</button>
            </div>
            <button className="bg-teal-700 rounded-md text-2xl ml-4 mt-6 p-2 w-[45%] text-white">Contacter</button>
            <div className="flex text-xl pt-6 pb-4 mx-4 border-b-2 mt-4 items-center">
                <div className="text-4xl pr-2"><MdOutlineMail /></div> ayoubbenjaa642@gmail.com
            </div>
            <div className="flex text-xl pt-2 pb-4 mx-4 border-b-2 mt-4 items-center">
                <div className="text-4xl"><IoPhonePortraitOutline /></div> +212 6 32 60 23 26
            </div>
            <div className="flex text-xl pt-2 pb-4 mx-4 border-b-2 mt-4 items-center">
                <div className="text-4xl pr-2"><FiChrome /></div> http://my/site/web.com
            </div>
            <div className="flex text-xl pt-2 pb-4 mx-4 border-b-2 mt-4 items-center">
                <div className="text-4xl pr-2"><FaRegAddressCard /></div>55 East 10th Street, New York, NY 10003, United States
            </div>
            <div className="flex text-xl pt-2 pb-4 mx-4 border-b-2 mt-4 items-center">
                <div className="text-4xl pr-2"><LiaPhoneVolumeSolid /></div>+212 5 32 60 23 26
            </div>
            <div>
                <button className="bg-teal-700 rounded-md text-2xl ml-4 mt-12 p-2 w-[45%] text-white">Social Medias</button>
                <div className="flex text-5xl my-4">
                    <div className="mr-6 ml-4 text-blue-600"><FaLinkedin /></div>
                    <div className="mx-6 text-red-500"><FaYoutube /></div>
                    <div className="mx-6 text-blue-500"><IoLogoFacebook /></div>
                    <div className="mx-6 text-[#e17be1]"><FaInstagramSquare /></div>
                </div>
                <div className="flex my-2 mx-4 items-center text-xl">
                    <div className="text-8xl"><IoLogoPolymer /></div>
                    <div>
                        <p className="text-xl font-bold">Brochure MENARA HOLDING</p>
                        <p className="text-gray-500">MENARA HOLDING UN DEBUT ... UNE AMBITION</p>
                    </div>
                </div>
                <button className="bg-teal-700 rounded-md text-2xl ml-4 mt-12 p-2 w-[45%] text-white">Video</button>
                <div className="video-wrapper my-4 max-w-[600px] mx-4 h-[200px] relative">
                    <iframe
                        className="w-full h-full absolute top-0 left-0"
                        src={embedUrl}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded YouTube"
                    ></iframe>
                </div>
            </div>
            <div className="mt-16 px-4 bg-teal-700">
                <div className="flex border-b-gray-100 border-b-2 text-4xl text-white h-[150px] justify-center items-center">
                    <a href="#" className="text-6xl px-6"><IoLogoPolymer /></a>
                    <div>
                        <p><span className="font-bold">منارة</span> قابضة</p>
                        <p><span className="font-bold">menara</span> holding</p>
                    </div>
                </div>
                <div className="text-white border-b-gray-100 border-b-2 justify-center h-[150px] flex flex-col items-center">
                    <p className="flex w-[60%] justify-center"> <p className="text-xl"><IoLocationOutline /></p> Km 0,500 - Agadir Road, PB 4741 Hay Massira,
                        40 005 Marrakech - Morocco
                    </p>
                    <p>
                        Nos conseillers à votre écoute : du lundi au samedi de 9h30 à 17h
                    </p>
                    <p className="flex">
                        <span className="text-xl"><IoIosPhonePortrait /></span>+ 212 524 499 900 Service et appel gratuits
                    </p>
                </div>
                <div className="text-white text-4xl mx-24 justify-around h-[100px] flex items-center">
                    <FiYoutube />
                    <LuInstagram />
                    <FaLinkedinIn />
                    <IoLogoTwitter />
                    <FaFacebookF />
                </div>
            </div>

            {showPopup && (
                <div className="absolute w-[350px] md:w-[500px] bg-teal-100 top-[100px] left-[20px] md:left-[50px] mx-auto p-4 rounded shadow-md">
                    <h2 className="text-2xl flex justify-between font-bold mb-4">
                        <p>Pop up here</p>
                        <button onClick={togglePopup} className="text-3xl"><IoCloseSharp /></button>
                    </h2>
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                id="phone"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                            <textarea
                                name="message"
                                id="message"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                rows={4}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
                        >
                            Envoyer
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Profile;
