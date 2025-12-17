import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';

const ViewPaste = () => {

  const [title, setTitle] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  
  const {id} = useParams();

  const allPastes = useSelector((state) => state.paste.pasteArr);

  const paste = allPastes.filter((p) => p._id === id)[0];

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
      disabled
      placeholder='Enter title'
      value={paste.title}
      onChange={(e) => setTitle(e.target.value)}
      className='flex flex-row justify-start p-1 w-full rounded-sm border-2 text-gray-500'
     />

     </div>
     <div className='bg-gray-200 mt-4 p-3 text-left rounded-md'>
      <textarea 
        className='w-full focus:outline-0  text-gray-500'
        disabled
        placeholder='Enter Content'
        value={paste.content}
        onChange={(e) => setContent(e.target.value)}
        rows={20}
      />
     </div>
    </div>
  )
}


export default ViewPaste
