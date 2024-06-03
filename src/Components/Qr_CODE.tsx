import React, { useState,useEffect, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import html2canvas from 'html2canvas';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Qr_CODE: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [idEm, setIdEm] = useState<number>('');
  const [nom, setNom] = useState<number>('');
  const [prenom, setPrenom] = useState<number>('');
  const qrCodeRef = useRef<HTMLCanvasElement>(null);
  const captureRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Function to download the generated QR code
  const downloadQRCode = () => {
    if (qrCodeRef.current !== null) {
      const canvas = qrCodeRef.current;
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = 'qrcode.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const { email } = location.state || {};
      if (email) {
        try {
          const response = await axios.post('http://localhost/API_MENARA_QR/API_GET_INFOS.php', {email} );
          if (response.data ) {
            setIdEm(response.data['idEm']) // Assuming 'nom' is the name field from the response
            setNom(response.data['nom']) // Assuming 'nom' is the name field from the response
            setPrenom(response.data['prenom']) // Assuming 'nom' is the name field from the response
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [location.state]);
  // Function to capture and download the entire div containing the QR code
  const handleDownload = () => {
    if (captureRef.current) {
      html2canvas(captureRef.current).then((canvas) => {
        const link = document.createElement('a');
        link.download = 'capture.png';
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };
  // first char to uppercase
  const capitalizeFirstLetter = (str) => {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  
  return (
    <div className="flex w-full flex-col  items-center justify-between min-h-screen bg-gray-100">
      <div className="bg-cyan-700 m-0 text-md flex justify-center items-center lg:text-2xl md:text-xl font-semibold text-white w-full h-[15vh]">
        LOGO + Lorem ipsum dolor sit amet.
      </div>
      <h1 className="text-3xl pb-4 w-full flex text-cyan-400 justify-center font-bold">{capitalizeFirstLetter(nom) + '\t' + prenom.toUpperCase()}</h1>
      
      <div className="">
        <div className="p-2 shadow-md  justify-center rounded-xl border-2 flex flex-col items-center" ref={captureRef}>
          <QRCodeCanvas className="rounded-lg"
            value={"http://192.168.223.91:3000?id=" + idEm}
            size={200}
            bgColor={"#ffffff"}
            fgColor={"#000000"}
            level={"L"}
            includeMargin={true}
            imageSettings={{
              src: "",
              x: undefined,
              y: undefined,
              height: 20,
              width: 20,
              excavate: true,
            }}
            ref={qrCodeRef}
          />
        </div>
        
        <div className="w-full flex justify-center py-4">
          <button onClick={handleDownload} type="button" className="flex w-full text-white items-center rounded-md h-10 bg-cyan-700 justify-center">
            Telecharger
          </button>
        </div>
      </div>
      <div className="bg-cyan-700 m-0 text-md flex justify-center items-center lg:text-2xl md:text-xl font-semibold text-white w-full h-[15vh]">
        LOGO + Lorem ipsum dolor sit amet.
      </div>
    </div>
  );
};

export default Qr_CODE;
