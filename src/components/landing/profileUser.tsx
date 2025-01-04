import React from 'react'

export default function ProfileUser() {
  return (
    <div className="flex min-h-screen bg-gray-100 justify-center items-center">
        <div className="flex flex-col lg:flex-row gap-5">
            <div className="flex bg-white h-[200px] w-[400px] lg:h-[600px] lg:w-[800px] rounded-xl shadow-md"></div>
            <div className="flex flex-col-reverse lg:flex-col gap-5">
            <div className="flex bg-white h-[300px] w-[400px] lg:h-[480px] lg:w-[400px] rounded-xl shadow-md"></div>
            <div className="flex bg-white h-[100px] w-[400px] rounded-xl shadow-md"></div>
            </div>
        </div>
    </div>
      )
}
