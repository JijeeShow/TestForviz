import React from "react";
import imageSrc from "../../assets/B7153C95-3801-49F0-9D00-F0C2CBE8C126.jpg";
import videoSe from "../../assets/746957662.879652.mp4";
import videoSk from "../../assets/746957441.486779.mp4";

function Aboutme() {
  return (
    <div className="flex flex-col w-full h-full p-6">
      <div className="flex w-full  border-2 border-gray-500 rounded p-4 items-center">
        <div className="w-3/5 p-5 ">
          <div className="text-[30px] font-semibold mb-6">About Me</div>
          <div className="flex mr-5">
            <p className="text-[20px]">
              {"    "} Hello everyone! My name is Kittipat Chofa, but you can
              call me Jijee. I'm 23 years old. I am good at Frontend and a
              little for Backend and AI. I believe in the power of collaboration
              and enjoy working in teams to create innovative solutions. Outside
              of coding, I love exploring new places, trying out different
              cuisines, and spending time with friends and family.
            </p>
          </div>
        </div>
        <div className=" w-2/5">
          <img
            src={imageSrc}
            alt="Profile"
            className="object-contain w-full rounded"
          />
        </div>
      </div>
      <div className="flex flex-col w-full  border-2 border-gray-500 rounded p-6 items-center mt-5  ">
        <div className="text-[30px] font-semibold mb-6">My Activity</div>
        <div className="flex gap-10 ">
          <video width="500" autoPlay muted loop className="rounded">
            <source src={videoSe} type="video/mp4" />
          </video>
          <video width="500" autoPlay muted loop className="rounded">
            <source src={videoSk} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
}

export default Aboutme;
