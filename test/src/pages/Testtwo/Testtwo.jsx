import axios from "axios";
import { React, useState, useEffect } from "react";
import "./Testtwo.css";
import { getWeek } from "date-fns";
import { BiSolidRightArrow } from "react-icons/bi";

function Testtwo() {
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
  const [roomid, setRoomid] = useState("A101");
  const [starttime, setStarttime] = useState();
  const [endtime, setEndtime] = useState();
  const [checkstatus, setCheckstatus] = useState(false);
  const [roomshow, setRoomshow] = useState();
  const [dateshow, setDatehow] = useState();
  const [datequeue, setDatequeue] = useState();
  const [roomidqueue, setRoomidqueue] = useState("A101");
  const [today, setToday] = useState();
  const [thisweek, setThisweek] = useState();
  const [nextweek, setNextweek] = useState();
  const [uniqueRoomIds, setUniqueRoomIds] = useState();

  useEffect(() => {
    const rooms = [...new Set(data.map((booking) => booking.roomId))];
    setUniqueRoomIds(rooms);
  }, []);

  const checkAvailability = (event) => {
    event.preventDefault();
    const filteredRooms = data.filter((item) => item.roomId === roomid);
    if (filteredRooms.length > 0) {
      const startTime = new Date(starttime);
      const endTime = new Date(endtime);
      const isOverlap = filteredRooms.some((item) => {
        const startTimeBook = new Date(item.startTime);
        const endTimeBook = new Date(item.endTime);
        return startTime < endTimeBook && endTime > startTimeBook;
      });
      if (isOverlap) {
        setCheckstatus(false);
      } else {
        setCheckstatus(true);
      }
    } else {
      setCheckstatus(false);
    }
  };

  const getBookingsForWeek = (event) => {
    event.preventDefault();
    setDatehow(datequeue);
    setRoomshow(roomidqueue);
    const dateqt = new Date(datequeue);
    dateqt.setHours(0, 0, 0, 0);
    const roomfiltertoday = data
      .filter((item) => {
        const startTimeBook = new Date(item.startTime);
        const endTimeBook = new Date(item.endTime);
        startTimeBook.setHours(0, 0, 0, 0);
        endTimeBook.setHours(0, 0, 0, 0);
        return (
          item.roomId === roomidqueue &&
          startTimeBook.getTime() <= dateqt.getTime() &&
          endTimeBook.getTime() >= dateqt.getTime()
        );
      })
      .sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

    const roomfilterthisweek = data
      .filter((item) => {
        const startTimeBook = new Date(item.startTime);
        const endTimeBook = new Date(item.endTime);
        startTimeBook.setHours(0, 0, 0, 0);
        endTimeBook.setHours(0, 0, 0, 0);
        return (
          item.roomId === roomidqueue &&
          getWeek(startTimeBook, { weekStartsOn: 1 }) <=
            getWeek(dateqt, { weekStartsOn: 1 }) &&
          getWeek(endTimeBook, { weekStartsOn: 1 }) >=
            getWeek(dateqt, { weekStartsOn: 1 })
        );
      })
      .sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
    const roomfilternextweek = data
      .filter((item) => {
        const startTimeBook = new Date(item.startTime);
        const endTimeBook = new Date(item.endTime);
        startTimeBook.setHours(0, 0, 0, 0);
        endTimeBook.setHours(0, 0, 0, 0);
        return (
          item.roomId === roomidqueue &&
          getWeek(startTimeBook, { weekStartsOn: 1 }) <=
            getWeek(dateqt, { weekStartsOn: 1 }) + 1 &&
          getWeek(endTimeBook, { weekStartsOn: 1 }) >=
            getWeek(dateqt, { weekStartsOn: 1 }) + 1
        );
      })
      .sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

    setToday(roomfiltertoday);
    setThisweek(roomfilterthisweek);
    setNextweek(roomfilternextweek);

    return roomfiltertoday;
  };


  function formatTimeRange(startTime, endTime, datein, type) {
    const date = new Date(datein);
    date.setHours(0, 0, 0, 0);
    const start = new Date(startTime);
    const end = new Date(endTime);
    const options = { hour: "2-digit", minute: "2-digit" };
    const startstr = new Date(startTime).toLocaleTimeString([], options);
    const endstr = new Date(end).toLocaleTimeString([], options);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    if (
      start.getTime() < date.getTime() &&
      end.getTime() === date.getTime() &&
      type === "today"
    ) {
      return `0.00 - ${endstr}`;
    } else if (
      start.getTime() < date.getTime() &&
      end.getTime() > date.getTime() &&
      type === "today"
    ) {
      return `All Day`;
    } else if (start.getTime() != end.getTime() && type === "today") {
      return `${startstr} - 0.00`;
    } else {
      return `${startstr} - ${endstr}`;
    }
  }

  return (
    <div className="flex h-full w-full p-6">
      <div className="w-1/3 h-full bg-white p-6 rounded-lg shadow-lg">
        <form onSubmit={checkAvailability} className="">
          <label className="flex">
            <p className="w-2/5">Room Name:</p>
            <select
              id="cars"
              className="w-3/5 border-2 border-gray-300 rounded"
              onChange={(e) => {
                setRoomid(e.target.value);
              }}
            >
              {uniqueRoomIds &&
                uniqueRoomIds.map((room) => (
                  <option key={room} value={room}>
                    {room}
                  </option>
                ))}
            </select>
          </label>
          <label className="flex mt-5">
            <p className="w-2/5"> Starttime:</p>
            <input
              type="datetime-local"
              name="starttime"
              onChange={(e) => {
                setStarttime(e.target.value);
              }}
              className="w-3/5 border-2 border-gray-300 rounded"
              required
            />
          </label>
          <label className="flex mt-5">
            <p className="w-2/5">Endtime:</p>
            <input
              type="datetime-local"
              name="endtime"
              onChange={(e) => {
                setEndtime(e.target.value);
              }}
              className="w-3/5 border-2 border-gray-300 rounded"
              required
              min={starttime}
            />
          </label>

          <button type="submit" className="bg-blue-400 mt-5 p-1 text-[#ffffff]">
            Submit
          </button>
        </form>
        {checkstatus ? (
          <p className="my-6 text-center text-green-600">Can reserve a room</p>
        ) : (
          <p className="my-6 text-center text-red-600">Can't reserve a room</p>
        )}
      </div>
      <div className="w-1/3 h-full bg-white p-6 rounded-lg ml-3 shadow-lg">
        <form onSubmit={getBookingsForWeek} className="">
          <label className="flex">
            <p className="w-2/5">Room Name:</p>
            <select
              id="cars"
              className="w-3/5 border-2 border-gray-300 rounded"
              onChange={(e) => {
                setRoomidqueue(e.target.value);
              }}
            >
              {uniqueRoomIds &&
                uniqueRoomIds.map((room) => (
                  <option key={room} value={room}>
                    {room}
                  </option>
                ))}
            </select>
          </label>
          <label className="flex mt-5">
            <p className="w-2/5">Date-Time:</p>
            <input
              type="date"
              name="datequeue"
              onChange={(e) => {
                setDatequeue(e.target.value);
              }}
              className="w-3/5 border-2 border-gray-300 rounded"
              required
            />
          </label>

          <button
            type="submit"
            className="bg-blue-400 mt-5 p-1 my-5 text-[#ffffff]"
          >
            Submit
          </button>
        </form>
      </div>

      <div className="w-1/3 h-full bg-white p-6 rounded-lg ml-3 shadow-lg">
        <div>
          <p className="mb-3 font-semibold">Room : {roomshow}</p>
          <p className="mb-3 font-semibold">Date : {dateshow}</p>
          <h2 className="mb-2">Today’s Bookings</h2>
          <div className=" border-2 border-gray-300 rounded p-3 space-y-2">
            {today && today.length > 0 ? (
              today.map((item) => (
                <div key={item.id}>
                  <div className="flex items-center ">
                    <BiSolidRightArrow className=" text-[12px] mr-2 text-gray-500" />
                    {formatTimeRange(
                      item.startTime,
                      item.endTime,
                      dateshow,
                      "today"
                    )}
                  </div>
                  <p>{item.title}</p>
                </div>
              ))
            ) : (
              <p>No bookings for today.</p>
            )}
          </div>
        </div>

        <div>
          <h2 className="my-2">This Week’s Bookings</h2>
          <div className=" border-2 border-gray-300 rounded p-3 space-y-2">
            {thisweek && thisweek.length > 0 ? (
              thisweek.map((item) => (
                <div key={item.id}>
                  <div key={item.id}>
                    <div className="flex items-center">
                      <BiSolidRightArrow className=" text-[12px] mr-2 text-gray-500" />
                      {formatTimeRange(
                        item.startTime,
                        item.endTime,
                        dateshow,
                        "thisweek"
                      )}{" "}
                      ({item.startTime.split(" ")[0]} -{" "}
                      {item.endTime.split(" ")[0]})
                    </div>
                    <p>{item.title}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No bookings for this week.</p>
            )}
          </div>
        </div>

        <div>
          <h2 className="my-2">Next Week’s Bookings</h2>
          <div className=" border-2 border-gray-300 rounded p-3 space-y-2">
            {nextweek && nextweek.length > 0 ? (
              nextweek.map((item) => (
                <div key={item.id}>
                  <div className="flex items-center">
                    <BiSolidRightArrow className=" text-[12px] mr-2 text-gray-500" />
                    {formatTimeRange(
                      item.startTime,
                      item.endTime,
                      dateshow,
                      "nextweek"
                    )}{" "}
                    ({item.startTime.split(" ")[0]} -{" "}
                    {item.endTime.split(" ")[0]})
                  </div>
                  <p>{item.title}</p>
                </div>
              ))
            ) : (
              <p>No bookings for next week.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testtwo;
