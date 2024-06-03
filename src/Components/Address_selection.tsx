import { useState, useEffect} from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { React } from "react"
import axios from 'axios';

  
  
  

  
  const Address_selection = ({onData}) => {
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const [filiare, setFiliare] = useState<string>('');
    const [idF, setIdF] = useState<number>();
    const [data, setData] = useState<[]>([]);
  
    const handleChangeFiliare = (f:string, index:number) => {
      onData(f, index);
      setFiliare(f);
      setIsClicked(!isClicked);
    }
    useEffect(()=>{
        onData(filiare,idF)
    },[filiare])
  
    useEffect(() => {
      const fetchMenaras = async () => {
        try {
          const response = await axios.get(`http://localhost/API_MENARA_QR/API_Get_Filiare.php`);
          const {data} = {data:response.data}
          setData(data);
        } catch (error) {
          console.error('Error fetching menaras:', error);
        }
      };
  
      fetchMenaras();
  
    }, []);
  
  
    return (
      <div className="sm:w-[400px] w-[75%] pt-3 md:w-[400px] relative">
        <div onClick={() => setIsClicked(!isClicked)} className="shadow bg-gray-200 w-[100%] md:w-full -z-10 border border-gray-400 rounded-md h-[37px] flex items-center cursor-pointer select-none">
          {filiare === '' ?
            <div className=" flex px-4">
              <span className="pr-4"> Selectionner un adresse </span>
              <div className="pt-1"><IoIosArrowDown /></div>
            </div>
            :
            <div className="flex">
              <p className="pl-4 ">{filiare}</p>
            </div>
          }
        </div>
  
        <div className={`${isClicked ? 'mt-3  scrollbar-none border border-gray-400' : 'h-0'} bg-gray-200 rounded-md shadow-lg absolute w-full top-10 transition-all ease-in-out duration-150 overflow-hidden`}>
          <div className="items-center  flex flex-col ">
            {data.map((item) => (
              <div
                key={item.idMenara}
                onClick={() => handleChangeFiliare(item.filaire,item.idMenara)}
                className={`h-[38px] w-full border-b-2 flex justify-start items-center pl-6  transition duration-300 ease-in-out hover:bg-green-200  border-gray-300`}
              >
                <p>{item.filaire}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  

  

export default Address_selection;
