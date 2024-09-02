import axios from "axios";
import { React, useEffect, useState } from "react";
import {
  startOfWeek,
  endOfWeek,
  format,
  eachDayOfInterval,
  getWeek,
  isSameDay,
} from "date-fns";
import Thisweek from "../../components/Thisweek/Thisweek";
import Nextweek from "../../components/Nextweek/Nextweek";
import Inmonth from "../../components/Allmonth/Inmonth";
import "./Testthree.css";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate, useParams } from "react-router-dom";

function Testthree() {
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
  const navigate = useNavigate();
  const { room, datetime } = useParams();
  const date = new Date(parseInt(datetime));
  const roomid = room;
  const [view, setView] = useState("thisWeek");

  useEffect(() => {}, []);

  const formday = (dateform) => {
    const dayOfWeek = dateform.toLocaleString("en-US", { weekday: "long" });
    return dayOfWeek;
  };
  const formmonth = (dateform) => {
    const monthName = dateform.toLocaleString("en-US", { month: "short" });
    return monthName;
  };
  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  const getNextThreeBookings = (date, bookings) => {
    return bookings
      .filter((data) => {
        const startTimeBook = new Date(data.startTime);
        const endTimeBook = new Date(data.endTime);
        startTimeBook.setHours(0, 0, 0, 0);
        return (
          date.getTime() >= startTimeBook.getTime() &&
          date.getTime() <= endTimeBook.getTime() &&
          data.roomId === roomid
        );
      })
      .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
      .slice(0, 3);
  };
  const nextThreeBookings = getNextThreeBookings(date, data);

  function formatTimeRange(startTime, endTime) {
    const options = { hour: "2-digit", minute: "2-digit" };
    const start = new Date(startTime).toLocaleTimeString([], options);
    const end = new Date(endTime).toLocaleTimeString([], options);
    return `${start} - ${end}`;
  }
  return (
    <div className="flex h-dvh w-dvw">
      <div className="flex flex-col w-2/5 h-full">
        <div className="flex bg-[#46529D] h-full ">
          <div className="flex flex-col w-1/6">
            <GoArrowLeft
              className="text-[#ffffff] w-12 h-12 hover:text-blue-700 m-5"
              onClick={() => {
                navigate("/room");
              }}
            />
          </div>
          <div className=" w-5/6 h-full flex flex-col">
            <div className="bg-[#2EBAEE] w-full h-[10vh] content-center">
              <p className="text-[#ffffff] text-[40px] ml-10">{room}</p>
            </div>
            <div className="  h-1/5 "></div>
            <div className="flex flex-1 flex-col  justify-between">
              <div>
                <p className="text-[#ffffff] ">Upcoming</p>
              </div>
              <div>
                <p className="text-[#ffffff] text-[50px]">{formday(date)}</p>
                <p className="text-[#ffffff] text-[50px]">
                  {date.getDate()} {formmonth(date)} {formatTime(date)}
                </p>
              </div>
              {nextThreeBookings.length > 0 ? (
                <div className="mb-2 ">
                  <p className="text-[#ffffff]">
                    {formatTimeRange(
                      nextThreeBookings[0].startTime,
                      nextThreeBookings[0].endTime
                    )}
                  </p>
                  <p className="text-[#ffffff]">{nextThreeBookings[0].title}</p>
                </div>
              ) : (
                <div className="mb-2 ">
                  <p className="text-[#ffffff]"> Today Not reserved</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex  bg-[#4D59A1] h-2/5">
          <div className=" w-1/6"></div>
          <div className="flex flex-col">
            {nextThreeBookings.map((item, index) => {
              if (index >= 1) {
                return (
                  <div key={item.id} className="my-2">
                    <p className="text-[#ffffff] ">
                      {formatTimeRange(item.startTime, item.endTime)}
                    </p>
                    <p className="text-[#ffffff]">{item.title}</p>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
      <div className="flex flex-col w-3/5 h-full ">
        <div className="absolute top-0 bottom-0 w-11 border-r-2 border-[#EFEEEC] "></div>
        <nav>
          <ul className="relative flex justify-around bg-[#EFEEEC] h-[10vh] items-end shadow-inner-custom font-semibold">
            <li className="relative flex flex-col items-center ">
              <button
                onClick={() => setView("thisWeek")}
                className={`py-2 px-4 mb-2 hover:text-[#c2410c] ${
                  view === "thisWeek" ? "" : "text-[#6b7280] "
                }`}
              >
                THIS WEEK
              </button>
              {view === "thisWeek" ? (
                <div className="absolute bg-[#707FDD] w-12 h-1 bottom-0 "></div>
              ) : null}
            </li>
            <li className="relative flex flex-col items-center">
              <button
                onClick={() => setView("nextWeek")}
                className={`py-2 px-4 mb-2 hover:text-[#c2410c] ${
                  view === "nextWeek" ? "" : "text-[#6b7280] "
                }`}
              >
                NEXT WEEK
              </button>
              {view === "nextWeek" ? (
                <div className="absolute bg-[#707FDD] w-12 h-1 bottom-0"></div>
              ) : null}
            </li>
            <li className="relative flex flex-col items-center">
              <button
                onClick={() => setView("wholeMonth")}
                className={`py-2 px-4 mb-2 hover:text-[#c2410c] ${
                  view === "wholeMonth" ? "" : "text-[#6b7280] "
                }`}
              >
                WHOLE MONTH
              </button>
              {view === "wholeMonth" ? (
                <div className="absolute bg-[#707FDD] w-12 h-1 bottom-0"></div>
              ) : null}
            </li>
          </ul>
        </nav>

        {view === "thisWeek" ? (
          <Thisweek date={date} roomid={roomid} data={data} />
        ) : view === "nextWeek" ? (
          <Nextweek date={date} roomid={roomid} data={data} />
        ) : view === "wholeMonth" ? (
          <Inmonth date={date} roomid={roomid} data={data} />
        ) : null}
      </div>
    </div>
  );
}

export default Testthree;
