import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Room() {
  const [date, setDate] = useState("2019-09-28T00:00:00");
  const data = [
    {
      id: 1,
      roomId: "A101",
      startTime: "2019-09-28 13:00:00",
      endTime: "2019-09-28 14:00:00",
      title: "Lunch with Petr",
    },
    {
      id: 2,
      roomId: "A101",
      startTime: "2019-09-28 14:00:00",
      endTime: "2019-09-28 15:00:00",
      title: "Sales Weekly Meeting",
    },
    {
      id: 3,
      roomId: "A101",
      startTime: "2019-09-28 16:00:00",
      endTime: "2019-09-28 18:00:00",
      title: "Anastasia Website Warroom",
    },
    {
      id: 4,
      roomId: "A101",
      startTime: "2019-09-29 13:00:00",
      endTime: "2019-09-29 14:00:00",
      title: "One-on-One Session",
    },
    {
      id: 5,
      roomId: "A101",
      startTime: "2019-09-29 16:00:00",
      endTime: "2019-09-29 18:00:00",
      title: "UGC Sprint Planning",
    },
    {
      id: 6,
      roomId: "A102",
      startTime: "2019-09-30 09:00:00",
      endTime: "2019-10-04 18:00:00",
      title: "5-Day Design Sprint Workshop",
    },
    {
      id: 7,
      roomId: "Auditorium",
      startTime: "2019-09-19 09:00:00",
      endTime: "2019-09-23 19:00:00",
      title: "Thai Tech Innovation 2019",
    },
    {
      id: 8,
      roomId: "A101",
      startTime: "2019-09-28 10:00:00",
      endTime: "2019-09-28 13:00:00",
      title: "Raimonland project",
    },
    {
      id: 9,
      roomId: "A102",
      startTime: "2019-09-30 18:00:00",
      endTime: "2019-09-30 20:00:00",
      title: "Management Meetinng",
    },
    {
      id: 10,
      roomId: "A101",
      startTime: "2019-10-04 14:00:00",
      endTime: "2019-10-06 11:00:00",
      title: "3-day workshop Corgi costume",
    },
  ];
  const [uniqueRoomIds, setUniqueRoomIds] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const rooms = [...new Set(data.map((booking) => booking.roomId))];
    setUniqueRoomIds(rooms);
  }, []);
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  return (
    <div className="flex h-full w-full flex-wrap items-center p-6">
      <div>
        <p>setDate-Time</p>
        <input
          type="datetime-local"
          onChange={handleDateChange}
          value={date}
          className=" h-5 border-2 border-gray-500 rounded p-3"
        />
      </div>

      {uniqueRoomIds &&
        uniqueRoomIds.map((room, index) => (
          <div
            key={index}
            className="flex flex-col w-60 h-60 bg-[#d1d5db]
             rounded-lg  justify-center font-semibold text-[#4b5563] m-5 
             hover:bg-blue-400 hover:text-[#ffffff] hover:-translate-y-1 
             hover:scale-110 ease-in-out shadow-lg transition-all duration-300  "
            onClick={() => {
              const datetime = new Date(date).getTime();
              navigate(`/room/testthree/${room}/${datetime}`);
            }}
          >
            <p className="text-[30px] w-full truncate  text-center ">Room</p>
            <p className="text-[50px] w-full truncate text-center p-4">
              {room}
            </p>
          </div>
        ))}
    </div>
  );
}

export default Room;
