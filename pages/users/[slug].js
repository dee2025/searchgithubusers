import { useRouter } from 'next/router'
import { useState } from 'react';
import { IoSend } from "react-icons/io5";
import { Avatar, Typography, Chip } from "@material-tailwind/react";
import { FaBuilding } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Link from 'next/link';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
 
export default function User() {
  const router = useRouter()

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
      label: "BLOGS",
      value: "blogs",
    },
  ];
 

  const [inputValue, setInputValue] = useState('');
  const [userData, setUserData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/hello'); 
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  console.log(userData)


  return (
    <>
    <p>Post: {router.query.slug}</p>
        <main className={`flex flex-col gap-5 h-screen items-center bg-blue-gray-900 `} >
      <div className='shadow-lg shadow-gray-800 w-[40%] mt-5 rounded-xl py-8 bg-gray-800 px-8'>
        <form className='flex justify-between items-center' onSubmit={handleSubmit}>
          <input
            className='text-black border w-[72%] py-2 px-4 rounded-lg'
            placeholder='dee2025'
            type='text'
            name='username'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className='flex text-white justify-center text-2xl border py-2 rounded-lg w-[24%]' type='submit'>
            <IoSend />
          </button>
        </form>
      </div>
      

      {userData && (
        <div className='bg-black w-[50%] px-8 py-12 mt-16'>
          <Tabs value="profile" orientation="vertical">
            <TabsHeader className="w-32">
              {data.map(({ label, value }) => (
                <Tab className='my-4 text-sm font-semibold ' key={value} value={value}>
                  {label}
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody>
              {data.map(({ value, desc }) => (
                <TabPanel key={value} value={value} className="py-0">
                  {
                    value == "profile" ? (
                      <div>
                          <div className="flex gap-4">
                            <Avatar className='h-28 w-28' src={userData.avatar_url} alt="avatar" variant="rounded" />
                            <div>
                              <Typography variant="h3" className='capitalize'>{userData.name}</Typography>
                              <div className='flex gap-5'>
                                <Link href={userData.followers_url} >
                                <Chip size="sm" variant="outlined" value={`${userData.followers} Followers`} />
                                </Link>
                                <Link href={userData.following_url} >
                                  <Chip size="sm" variant="outlined" value={`${userData.following} Following`} />
                                </Link>
                              </div>
                              <div className='mt-4 flex gap-3'>
                                <span className='flex gap-2 items-center text-sm mb-2'>
                                  <FaBuilding className='text-cyan-400'/> <p className='text-green-400'>{userData.company}</p>
                                </span>
                                <span className='flex gap-2 items-center text-sm mb-2'>
                                  <FaLocationDot className='text-cyan-500' /> <p className='text-green-400'>{userData.location} </p>
                                </span>
                              </div>
                            </div>
                          </div>
                          
                      </div>
                    ) : value == "bio" ? (
                      <div>
                      <Typography variant="small" color="white" className="font-normal py-2">
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
    </>
  );
}