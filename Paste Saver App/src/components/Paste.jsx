import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPasteArr } from '../redux/pasteSlice';
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';
import { IoEye } from "react-icons/io5";
import { MdContentCopy } from 'react-icons/md';
import { FaCopy, FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { IoShareSocial } from 'react-icons/io5';
import { Tooltip } from 'react-tooltip';

const Paste = () => {

  const pasteArr = useSelector((state) => state.paste.pasteArr);

  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();

  const filteredData = pasteArr.filter((paste) => paste.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId){
    dispatch(removeFromPasteArr(pasteId));
  }

  // use const for arrow func
  const handleCopy = async (content) => {
    //to handle error
    try{
      // await so that it returns a promise
      await navigator.clipboard.writeText(content);
      console.log("copied!");
      toast.success("content copied!");

    }catch(e){

  // You don’t have to manually throw the error.
  // await will automatically throw if the Promise is rejected — and catch will catch it.
      console.log("error found: ", e);
    }
  }

  const handleShare = async (paste) => {
    const shareUrl = `${window.location.origin}/pastes/${paste._id}`;



// paste is the current paste object (id, title, content, etc.)
// window.location.origin → base URL of your app /pastes/${paste._id} → route to view that paste
//  navigator.share is a feature supported by mobile and browser where options like whatsapp, email etc appears if(navigator.share) checks if it is supported by the browser if not then else block copies the link to clipboard
// paste.content.slice(0,100) prevent huge text dumps 
// catch block executes when user cancles sharing
    if(navigator.share) {
      try{
        await navigator.share({
          title: paste.title,
          text: paste.content.slice(0,100),
          url: shareUrl,
        })
      }catch(e){
        console.log("Share cancelled");
      }
    }else{
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Share link copied!");
    }
  };


  return (
    <div>
      <input
        className='w-2/3 border p-1 rounded-sm pl-2 focus:border-2'
        type='search'
        placeholder='search here'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className='mt-4 p-2 rounded-sm border bg-gray-200'>
          {
            filteredData.length >0 && filteredData.map(
              (paste) =>{
                return (
                  <div className='border mt-8 p-2 rounded-b-sm bg-white m-2'  key={paste?._id}>
                    <div>
                      {paste.title}
                    </div>
                    <div>
                      {paste.content}
                    </div>
                    <div className='buttonDiv flex flex-row justify-end gap-4 m-4'>
                      <button className='p-1 focus:border-2 border '>
                        <NavLink to={`/?pasteId=${paste?._id}`} 
                        data-tooltip-id ="paste-tooltip" data-tooltip-content={"Edit"}>
                          <FaEdit/>
                        </NavLink>
                      </button>
                      <button className='p-1 focus:border-2 border '>
                        <NavLink to={`/pastes/${paste?._id}`} data-tooltip-content={"View"} data-tooltip-id='paste-tooltip'>
                          <IoEye/>
                        </NavLink>
                      </button>
                      <button className='focus:border-2 border p-1 ' onClick={() => handleDelete(paste?._id)}>
                        <NavLink data-tooltip-content={"Delete"} data-tooltip-id='paste-tooltip'>
                          <MdDeleteForever/>
                        </NavLink>
                      </button>
                      <button className='p-1 focus:border-2 border ' onClick={() => handleCopy(paste.content)}>
                        <NavLink data-tooltip-content={"Copy"} data-tooltip-id='paste-tooltip'>
                          <FaCopy/>
                        </NavLink>
                      </button>
                      <button className='p-1  focus:border-2 border ' onClick={() => handleShare(paste)}>
                        <NavLink  data-tooltip-content={"Share"} data-tooltip-id='paste-tooltip'>
                          <IoShareSocial/>
                        </NavLink>
                      </button>

                    </div>
                    <div>
                      <p className='text-sm'>
                        Created on: {new Date(paste.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )
                 
              }
            )
          }
      </div>

      <Tooltip
        id='paste-tooltip'
        place='top'
        delayShow={100}
        // 100 milisecond
        delayHide={100}
        style={{
          backgroundColor: "#111"
        }}

      />
  
    </div>
  )
}

export default Paste


/*
  onClick(handleClick()) ---> inCorrect
  onClick(() => handleClick()) ---> correct
  
  paste?._id  ---> when paste is not confirmed exits i.e it might return null or undefined this means if paste exits take it's id
  paste._id  ---> when it is confirm that paste exits

  "https://react-icons.github.io/react-icons/"
  

  <NavLink> gives pointer cursor 
  react-tooltip provides the functionality to view text when hovered
  data-tooltip-id should be equal to the id mentioned in the botton inside <Tooltip/>
  */