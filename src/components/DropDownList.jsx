import { Menu } from '@headlessui/react'
import React from 'react'

const DropDownList = ({link,items}) => {
  return (
    <>
     <Menu as="div" className="relative left-0 inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50">
          {link}
        </Menu.Button>
      </div>

      <Menu.Items
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
        {items && 
        items.map((item)=>{

            return(

                <Menu.Item
               
                    key={item.label}
              >
                <button  className={`w-full text-left block px-4 py-2 text-[17px] text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden
                hover:bg-gray-50
                    ${item.label.includes("Delete")&&"text-red-500"}
                    `}
                    onClick={item.onClick}

                    >
              {item.label}

                </button>
              </Menu.Item>
            )
        })
        }
         
         
        </div>
      </Menu.Items>
    </Menu>
    </>
  )
}

export default DropDownList