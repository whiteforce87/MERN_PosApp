import React from 'react'

function AuthComponent(props) {
  return (
              <div className="!flex flex-col items-center justify-center h-full mb-10 px-6">
                <img src={props.img} alt="" className="w-[600px] h-[600px]"></img>
                <h3 className="text-4xl text-white text-center font-bold"> {props.title}</h3>
                <p className="mt-5 text-2xl text-white text-center">{props.desc}</p>
              </div>            
    
  )
}

export default AuthComponent