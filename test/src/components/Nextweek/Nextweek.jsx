import { React, useEffect, useState } from "react";
import {
  startOfWeek,
  endOfWeek,
  format,
  eachDayOfInterval,
  getWeek,
  isSameDay,
  addDays,
} from "date-fns";

function Nextweek({ date, roomid, data }) {
  const [week, setWeek] = useState();

  useEffect(() => {
    getBookingsForNextWeek(date);
  }, []);

  const getBookingsForNextWeek = (datein) => {
    const nextWeekStartDate = addDays(
      startOfWeek(datein, { weekStartsOn: 1 }),
      7
    );
    const nextWeekEndDate = addDays(endOfWeek(datein, { weekStartsOn: 1 }), 7);
    const daysOfNextWeek = eachDayOfInterval({
      start: nextWeekStartDate,
      end: nextWeekEndDate,
    });
    console.log(daysOfNextWeek);
    setWeek(daysOfNextWeek);
  };

  const formday = (datein, date) => {
    const monthName = datein.toLocaleString("en-US", { month: "short" });
    const dayOfWeek = datein.toLocaleString("en-US", { weekday: "short" });
    const datecheck = new Date(datein);
    const datetoday = new Date(date);
    datecheck.setHours(0, 0, 0, 0);
    datetoday.setHours(0, 0, 0, 0);
    const tomorrow = new Date(datetoday);
    tomorrow.setHours(0, 0, 0, 0);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (tomorrow.getTime() === datecheck.getTime()) {
      return (
        <div className="flex py-2  text-[#6c6c6c] bg-[#F7F7F7] border-y-2 border-[#EFEEEC] pl-5 font-medium">
          Tomorrow ( {dayOfWeek} , {datecheck.getDate()} {monthName} )
        </div>
      );
    } else if (datetoday.getTime() === datecheck.getTime()) {
      return (
        <div className="flex py-2  text-[#ffffff] bg-[#2EBAEE] border-y-2 border-[#EFEEEC] pl-5 font-medium">
          Today ( {dayOfWeek} , {datecheck.getDate()} {monthName} )
        </div>
      );
    } else {
      return (
        <div className="flex py-2  text-[#6c6c6c] bg-[#F7F7F7] border-y-2 border-[#EFEEEC] pl-5 font-medium">
          {dayOfWeek} , {datecheck.getDate()} {monthName}
        </div>
      );
    }
  };

  const getbookindate = (datein) => {
    const dateqt = new Date(datein);
    dateqt.setHours(0, 0, 0, 0);
    const roomfilterindeyday = data
      .filter((item) => {
        const startTimeBook = new Date(item.startTime);
        const endTimeBook = new Date(item.endTime);
        startTimeBook.setHours(0, 0, 0, 0);
        endTimeBook.setHours(0, 0, 0, 0);
        return (
          item.roomId === roomid &&
          startTimeBook <= dateqt &&
          endTimeBook >= dateqt
        );
      })
      .sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
    return roomfilterindeyday;
  };
  function formatTimeRange(startTime, endTime, date) {
    date.setHours(0, 0, 0, 0);
    const start = new Date(startTime);
    const end = new Date(endTime);

    const options = { hour: "2-digit", minute: "2-digit" };
    const startstr = new Date(startTime).toLocaleTimeString([], options);
    const endstr = new Date(end).toLocaleTimeString([], options);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    if (start.getTime() < date.getTime() && end.getTime() === date.getTime()) {
      return `0.00 - ${endstr}`;
    } else if (
      start.getTime() < date.getTime() &&
      end.getTime() > date.getTime()
    ) {
      return `All Day`;
    } else if (start.getTime() != end.getTime()) {
      return `${startstr} - 0.00`;
    } else {
      return `${startstr} - ${endstr}`;
    }
  }

  const generateRandomColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    return randomColor;
  };

  return (
    <div className=" max-h-[90vh] overflow-y-auto ">
      <div className="flex flex-col ">
        {week &&
          week.map((item, index) => (
            <div key={index} className="relative">
              {formday(item, date)}

              <div className="flex flex-1 my-4">
                <div className="flex flex-col ml-10">
                  {getbookindate(item).length > 0 ? (
                    getbookindate(item).map((daybook) => {
                      const color = generateRandomColor();
                      return (
                        <div key={daybook.id} className="flex mt-2">
                          <div
                            className="w-2 h-2 mt-2 rounded-full"
                            style={{ backgroundColor: color }}
                          ></div>
                          <div className="ml-2 flex flex-col">
                            <p>{daybook.title}</p>
                            <p>
                              {formatTimeRange(
                                daybook.startTime,
                                daybook.endTime,
                                item
                              )}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="flex mt-2">
                      <div className="w-2 h-2 bg-red-500 mt-2 rounded-full"></div>
                      <div className="ml-2 flex flex-col">
                        <p>No reserve...</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Nextweek;
