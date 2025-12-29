import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastesArr, updateToPastesArr } from '../redux/pasteSlice';

const Home = () => {

  const [title, setTitle] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const allPastes = useSelector((state) => state.paste.pasteArr);


// for edit button
  useEffect(() => {
    if(pasteId){
      const paste = allPastes.find((p) => p._id === pasteId);

      if(paste){
        //runs after redux loaded it
        setTitle(paste.title);
        setContent(paste.content);
      }
    }else{
      setTitle('');
      setContent('');
    }

    // runs sideeffect whent he pasteId changes
  },[pasteId, allPastes])

  function btnFunc() {
    const paste = {
      title: title,
      content: content,
      // id = pasteId if pasted is updated i.e. id is present already and if new paste is created id is generated form the date
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    }

    //if pasteId is already present logic is to update the already created paste
    if(pasteId){
      dispatch(updateToPastesArr(paste));
    }else{
      dispatch(addToPastesArr(paste));
    }

    //clearing title, content and params
    setTitle('');
    setContent('');
    setSearchParams({});
  }


  return (
    <div>
    <div className='flex flex-row justify-between gap-1.5'>
     <input
      placeholder='Enter title'
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className='flex flex-row justify-start p-1 w-3/4 rounded-sm border-2 focus:border-blue-400 focus:outline-none '
     />

     <button className=' border w-1/4 font-medium bg-gray-400 text-white rounded-xl p-2 focus:bg-gray-600' onClick={btnFunc}>
        {/* comment */}
        {pasteId ? "Update My Paste" : "Create My Paste"}
     </button>

     </div>
     <div className='bg-gray-200 mt-4 p-3 text-left rounded-md'>
      <textarea 
        className='w-full focus:outline-0'
        placeholder='Enter Content'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={20}
      />
     </div>
    </div>
  )
}

export default Home

/*
searchParams = Read-only object to get values from URL query string
setSearchParams =	function that Updates query params and modifies the URL without reload

useSearchParams() in React Router returns an array of two items,
 */

/* the text on button depends create my paste -> when user clicks it from home i.e. url "/" and update my paste -> when user clicked it after visiting pastes i.e. list of paste thus url contains let pasteId "localhost:5173/?pasteId=abc" thus we are using searchParams to get the pasteId  */
