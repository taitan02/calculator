import { useContext } from "react";
import { MainContext } from "../context/MainContext";
import { MdOutlineCancelPresentation, MdOutlineScience, MdOutlineAttachMoney, MdAccessTime } from "react-icons/md";
import { FaCalculator } from "react-icons/fa";
import { GoUnmute, GoMute, GoGraph } from "react-icons/go";
import { TbTemperature } from "react-icons/tb";
function Sidebar({ onClose, isShowSidebar }) {
  const { mute, setMute } = useContext(MainContext);
  return (
    <div className={`fixed inset-y-0 z-20  w-2/3 bg-[#0f1722] duration-500 ${isShowSidebar ? " left-0" : "-left-full"}`}>
      <div className='flex flex-col text-white'>
        <div className='flex justify-between items-center h-20'>
          <button className='p-4 bg-[#151e2b] hover:opacity-50 duration-500' onClick={() => setMute(!mute)}>
            {!mute ? <GoUnmute size={30} /> : <GoMute size={30} />}
          </button>
          <MdOutlineCancelPresentation
            size={50}
            className='text-red-600 hover:scale-110 duration-500 hover:cursor-pointer'
            onClick={onClose}
          />
        </div>
        <button className='p-4 flex  bg-[#151e2b] hover:opacity-50 duration-500'>
          <FaCalculator size={20} className='mr-4' />
          Standard
        </button>
        <button className='p-4 flex  bg-[#151e2b] hover:opacity-50 duration-500'>
          <MdOutlineScience size={20} className='mr-4' />
          Scientìic
        </button>
        <button className='p-4 flex  bg-[#151e2b] hover:opacity-50 duration-500'>
          <GoGraph size={20} className='mr-4' />
          Graphing
        </button>
        <button className='p-4 flex  bg-[#151e2b] hover:opacity-50 duration-500'>
          <MdOutlineAttachMoney size={20} className='mr-4' />
          Currency
        </button>
        <button className='p-4 flex  bg-[#151e2b] hover:opacity-50 duration-500'>
          <TbTemperature size={20} className='mr-4' />
          Temperature
        </button>
        <button className='p-4 flex  bg-[#151e2b] hover:opacity-50 duration-500'>
          <MdAccessTime size={20} className='mr-4' />
          Time
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
