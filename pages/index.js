import { useState } from 'react';
import { Inter } from 'next/font/google';
import { IoSend } from "react-icons/io5";
import { Avatar, Typography, Chip } from "@material-tailwind/react";
import { FaBuilding, FaGithubSquare } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Link from 'next/link';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

const inter = Inter({ subsets: ['latin'] });

export default function Home() {

  const data = [
    {
      label: "PROFILE",
      value: "profile",
    },
    {
      label: "BIO",
      value: "bio",
    },
    {
      label: "OTHERS",
      value: "others",
    },
  ];
 
  const [inputValue, setInputValue] = useState('');
  const [userData, setUserData] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`/api/hello?inputValue=${encodeURIComponent(inputValue)}`);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  console.log(userData)

  return (
    <main className={`flex flex-col gap-5 h-screen px-4 items-center bg-black !font-sans ${inter.className}`} >

      {/* search section */}
      <div className=' md:w-[40%] w-full mt-12 rounded-xl py-8 border border-cyan-400 px-8'>
        <form className='flex justify-between items-center' onSubmit={handleSubmit}>
          <input
            className='text-black border w-[72%] py-2 px-4 rounded-lg font-rajdhani font-bold tracking-wide'
            placeholder='Write Github Profile Username'
            type='text'
            name='username'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className='flex text-white bg-cyan-500 justify-center text-2xl py-2 rounded-lg w-[24%]' type='submit'>
            <IoSend />
          </button>
        </form>
      </div>

      {/* profile section */}
      {userData && (
        <div className='md:w-[50%] w-full px-0 md:px-8 py-4 md:mt-8 mt-0'>
          <Tabs value="profile">
            <TabsHeader className="bg-transparent gap-4">
              {data.map(({ label, value }) => (
                <Tab className='my-5 text-cyan-800 text-sm font-semibold font-sen border rounded-lg' key={value} value={value}>
                  {label}
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody className='border  min-h-[50px]'>
              {data.map(({ value, desc }) => (
                <TabPanel key={value} value={value} className="p-5">
                  {
                    value == "profile" ? (
                      <div>
                          <div className="md:flex-row flex flex-col items-center gap-4 ">
                            <Avatar className='h-24 w-24' src={userData.avatar_url} alt="avatar" variant="rounded" />
                            <div>
                              <p className='capitalize font-rajdhani font-extrabold text-4xl text-cyan-100'>{userData.name} <span className='text-sm tracking-wider text-white'>[ {userData.login} ]</span> </p>
                              <div className='flex gap-5 mt-4 '>
                                <Link href={userData.followers_url} >
                                  <Chip color='cyan' className='hover:bg-cyan-400 text-[10px] tracking-wider hover:text-white font-sentence hover:duration-1000 hover:transition-colors' size="sm" variant="outlined" value={`${userData.followers} Followers`} />
                                </Link>
                                <Link href={userData.following_url} >
                                  <Chip color="cyan" className='hover:bg-cyan-400 text-[10px] tracking-wider hover:text-white font-sentence hover:duration-1000 hover:transition-colors' size="sm" variant="outlined" value={`${userData.following} Following`} />
                                </Link>
                                <Link target='_blank' href={`https://github.com/${userData.login}`}>
                                  <FaGithubSquare className='text-2xl hover:text-cyan-700 hover:duration-1000 hover:transition-colors' />
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className='mt-4'>
                            <span className='flex gap-2 items-center text-sm mb-2'>
                              <FaBuilding className='text-cyan-400'/> <p className='text-green-400 font-sentence'>{userData.company}</p>
                            </span>
                            <span className='flex gap-2 items-center text-sm mb-2'>
                              <FaLocationDot className='text-cyan-500' /> <p className='text-green-400 font-sentence'>{userData.location} </p>
                            </span>
                          </div>
                      </div>
                    ) : value == "bio" ? (
                      <div>
                      <Typography variant="large" className="font-normal py-2 font-sen text-cyan-600">
                            {userData.bio}
                      </Typography>
                    </div>
                    ) : ("")
                  }
                  
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>
          
          
        </div>
            )}
    </main>
  );
}


{/*  */}