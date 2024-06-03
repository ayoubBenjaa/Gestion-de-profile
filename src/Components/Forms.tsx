import React, { useState, useEffect } from 'react';
import { RxAvatar } from 'react-icons/rx';
import { FaRegSave } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Address_selection from './Address_selection.tsx';

interface Data {
  img: File | null;
  prenom: string;
  nom: string;
  adress: string;
  fonction: string;
  email: string;
  telephone: string;
}

const Forms: React.FC = () => {
  const [choosedImage, setChoosedImage] = useState<File | null>(null);
  const [filaire, setFilaire] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [erreur, setErreur] = useState<string>('');
  const [indexFiliare, setIndexFiliare] = useState<number | null>(null);
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const [formData, setFormData] = useState<Data>({
    img: File||null,
    prenom: '',
    nom: '',
    adress: '',
    fonction: '',
    email: '',
    telephone: ''
  });
  const [adress, setAdress] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (filaire !== '') {
        const response = await axios.post('http://localhost/API_MENARA_QR/API_SAVE_DATA.php', formData);
     
         if(response.data['message'] == 'Employee added successfully'){
            navigate("Qr_CODE",  { state: { email } } )
         }
         else{
          setErreur(response.data['message']);
         }

      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErreur(erreur)
    }
  };

  const handleFiliare = (f: string, index: number) => {
    setFilaire(f);
    setIndexFiliare(index);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=> {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setEmail(value);
    
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFormData({ ...formData, 'img': files[0] });
      setChoosedImage(files[0]);
    }
  };

  useEffect(() => {
    const fetchMenaras = async () => {
      try {
        if (indexFiliare !== null) {
          const i = indexFiliare;
          setFormData({ ...formData, "idMenara": i });
          console.log(formData.idMenara);
          const response = await axios.get(`http://localhost/API_MENARA_QR/API_Adress.php?idMenara=${indexFiliare}`);
          setAdress(response.data);
          
        }
      } catch (error) {
        console.error('Error fetching menaras:', error);
      }
    };

    if (filaire !== '') {
      fetchMenaras();
    }
  }, [filaire]);

  useEffect(() => {
    if (adress !== '') {
      setFormData((prevData) => ({ ...prevData, adress }));

    }
  }, [filaire]);

  return (
    <form onSubmit={handleSubmit} className="lg:w-[600px] w-[100%] lg:my-10 p-3 flex justify-center items-center flex-col rounded-md border-2">
      <p className="text-red-300 w-full">{erreur}</p>
      <h1 className="text-xl w-full border-t-2 border-red-200 mt-4 pt-2 font-bold">Informations</h1>
      <div className="flex m-4 pb-4 pl-2 w-full justify-between lg:justify-around">
        <label htmlFor="img" className="text-6xl border rounded-full">
          <input
            onChange={handleImageChange}
            required
            className="rounded-sm bg-gray-200 pl-1 h-8 w-[100%] border-2"
            name="img"
            type="file"
            id="img"
            hidden
          />
          {choosedImage ? (
            <img className="object-cover w-16 h-16 bg-gray-200 border-2 rounded-full" src={URL.createObjectURL(choosedImage)} alt="Avatar" />
          ) : (
            <RxAvatar />
          )}
        </label>
        <Address_selection onData={handleFiliare} />
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-center w-full lg:justify-around">
        <div className="flex flex-col w-full px-2 justify-center items-center">
          <label className="w-full" htmlFor="prenom">Prenom</label>
          <input
            onChange={handleChange}
            name="prenom"
            required
            id="prenom"
            className="w-full rounded-sm bg-gray-100 pl-2 h-8 lg:w-[100%] border-2"
            type="text"
          />
        </div>
        <div className="flex flex-col w-full p-2 justify-center items-center">
          <label htmlFor="nom" className="w-full">Nom</label>
          <input
            onChange={handleChange}
            id="nom"
            name="nom"
            required
            className="w-full rounded-sm bg-gray-100 pl-2 h-8 lg:w-[100%] border-2"
            type="text"
          />
        </div>
      </div>
      <div className="flex lg:pt-8 pb-2 px-3 w-full justify-around">
        <div className="flex flex-col w-full">
          <label htmlFor="fonction">Fonction</label>
          <input
            onChange={handleChange}
            id="fonction"
            required
            name="fonction"
            className="rounded-sm pl-2 bg-gray-100 h-8 border-2"
            type="text"
          />
        </div>
        <div></div>
      </div>
      <p className="px-4 text-[12px] -mt-2 text-red-200 lg:text-md w-full">Veulliez entrer votre poste actuel au sein de l'entreprise</p>
      <div className="flex px-2 lg:px-4 lg:mt-4 w-full flex-col">
        <label>Adress de la filaire</label>
        <div id="test" className="rounded-sm w-full bg-gray-100 pl-2 h-8 border-2">{adress}</div>
      </div>
      <div className="flex my-2 lg:flex-row flex-col lg:my-8 w-full justify-around">
        <div className="flex flex-col w-full px-2 justify-center items-center">
          <label htmlFor="email" className="w-full">Email</label>
          <input
            onChange={handleEmail}
            id="email"
            name="email"
            required
            className="rounded-sm w-full bg-gray-100 pl-2 h-8 lg:w-[100%] border-2"
            type="text"
          />
        </div>
        <div className="flex py-2 lg:py-0 flex-col w-full px-2 justify-center items-center">
          <label className="w-full" htmlFor="telephone">Telephone</label>
          <input
            required
            onChange={handleChange}
            id="telephone"
            name="telephone"
            className="w-full rounded-sm pl-2 bg-gray-100 h-8 lg:w-[100%] border-2"
            type="tel"
          />
        </div>
      </div>
      <div className="w-full">
        <button type="submit" className="flex w-[95%] text-xl ease-in-out duration-500 hover:tracking-widest hover:bg-gray-100 justify-center items-center p-2 border-2 border-red-200 rounded-sm mb-4 mx-3 cursor-pointer">
          <FaRegSave />
          <p className="px-2">Generer</p>
        </button>
      </div>
    </form>
  );
};

export default Forms;
