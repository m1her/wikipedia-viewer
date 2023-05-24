"use client";
import { useRef, useState } from "react";

export default function Home() {
  const [toggler, setToggler] = useState(true);
  const [transition, setTransition] = useState(true);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState();
  const inputRef = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setPages([]);
      wikipediaSearchHandler();
      console.log(inputRef.current.value);
    }
  };

  const wikipediaSearchHandler = async () => {
    setLoading("Loading...");
    try {
      const response = await fetch(
        `https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=${inputRef.current.value}`
      );

      if (!response.ok) {
        throw new Error("An error occured when fetching data");
      }
      const data = await response.json();
      setLoading();
      setPages(Object.entries(data.query.pages));
      // console.log(pages[0][1].title);
    } catch (error) {
      console.log(error);
    }
  };

  const searchOn = () => {
    setTimeout(() => {
      setTransition(!transition);
    });

    setToggler(false);
  };
  const searchOff = () => {
    setTransition(!transition);
    setTimeout(() => {
      setToggler(true);
      setPages([]);
    }, 500);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-16">
      <div className="text-[#617A55] text-4xl font-semibold font-mono mb-8">
        Wikipedia Viewer
      </div>
      <a
        className="mb-6 p-3 bg-[#F7E1AE] rounded-sm shadow-sm text-lg text-[#617a55] font-mono font-semibold hover:bg-[#f9dc9b] hover:text-bold hover:text-[#688a59] hover:border-2 hover:border-[#617A55] hover:py-[10px] cursor-pointer select-none"
        href="https://en.wikipedia.org/wiki/Special:Random"
        target="_blank"
      >
        Click For A Random Article!
      </a>
      {toggler && (
        <div
          className="cursor-pointer p-4 text-center grid place-items-center fill-[rgb(97,122,85)] hover:fill-[rgb(75,100,64)] hover:text-[rgb(75,100,64)] text-[rgb(97,122,85)]"
          onClick={searchOn}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="682.667"
            height="682.667"
            version="1.0"
            viewBox="0 0 512 512"
            className="w-10 h-10 "
          >
            <path d="M193 1.1C143.6 6.2 97.9 28 62.4 63.4 37.8 88 21.2 114.8 10.6 147c-14.1 42.8-14.1 87.2 0 130 10.6 32.3 27.3 59.2 52 83.7 48.8 48.5 115.3 70.5 183.9 60.8 35.3-5 70.7-19.5 98.5-40.4 3-2.3 5.7-4 6.1-3.9.4.2 30.7 29.8 67.3 65.8 41.7 41 68 66.1 70.4 67.2 9.8 4.6 20.8-1.2 22.8-12 1.6-8.4 7.2-2.4-102.4-110.6L375 353.8l5.8-6.8c25-28.9 41.5-65.5 47.8-105.5 2.4-15.6 2.4-44.2 0-60-7.1-45.9-27.2-85.3-60.7-118.6C321.9 17.2 257.8-5.5 193 1.1zm47.9 33.5c40.4 5.9 75.9 23.5 104 51.5 34.4 34.5 52.3 77.4 52.3 125.9 0 17.9-1.6 30.2-5.8 45.7C370.2 336.5 298.3 391 215.5 391c-49.3 0-95.1-18.7-129.3-52.9-23.2-23.2-38.7-50-47.1-81.1-7.4-27.7-7.4-62.3 0-90 16.8-62.6 66.5-111.9 129.2-128.1 22.8-5.9 50.7-7.6 72.6-4.3z" />
          </svg>
          <div className=" text-lg font-mono font-semibold ">
            CLick To Search
          </div>
        </div>
      )}
      {!toggler && (
        <div
          className={`my-4 rounded-sm border-2 border-[#F7E1AE] bg-[#F7E1AE] flex flex-row items-center focus-within:border-[#A4D0A4] focus-within:border-2
        ${!transition ? "w-[400px] px-2 " : "w-0 "}
        transition-all ease-in duration-500
        `}
        >
          <input
            type="text"
            className="w-11/12 h-10 rounded-sm bg-[#F7E1AE] text-sm text-[#617a55] focus:outline-none"
            onKeyDown={handleKeyDown}
            ref={inputRef}
            autoFocus
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="682.667"
            height="682.667"
            version="1.0"
            viewBox="0 0 512 512"
            className="fill-[#A4D0A4] w-4 h-4 cursor-pointer ml-8"
            onClick={searchOff}
          >
            <path d="M16.1 1.7C7.3 4.8 0 15.3 0 25c0 2 .7 5.9 1.6 8.6 1.5 4.5 10.6 13.9 110.3 113.7L220.5 256 112.3 364.3C52.9 423.8 3.4 474 2.5 475.9c-4.5 9-2.4 21.3 5 28.6 6.9 7 16.3 9.1 26.1 5.9 4.5-1.5 13.9-10.6 113.6-110.3L256 291.5l108.8 108.6c99.7 99.7 109.1 108.8 113.6 110.3 9.8 3.2 19.2 1.1 26.1-5.9 7-6.9 9.1-16.3 5.9-26.1-1.5-4.5-10.6-13.9-110.3-113.7L291.5 256l108.6-108.8C499.8 47.5 508.9 38.1 510.4 33.6c3.2-9.8 1.1-19.2-5.9-26.1-6.9-7-16.3-9.1-26.1-5.9-4.5 1.5-13.9 10.6-113.7 110.3L256 220.5 147.2 111.9C47.5 12.2 38.1 3.1 33.6 1.6c-6.1-2-11.7-1.9-17.5.1z" />
          </svg>
        </div>
      )}
 <p className="text-[#688a59] text-xl mb-2">{loading}</p>
      <ul className="">
        {pages &&
          pages.map((item, index) => (
            <li
              className="bg-[#F7E1AE] p-4 mt-2 w-[700px] hover:border-l-4 hover:border-[#617a55] hover:-ml-[4px] hover:w-[704px] cursor-pointer "
              key={index}
            >
              <a href={`https://en.wikipedia.org/?curid=${item[1].pageid}`}>
                <div id="title" className="text-[#688a59] text-xl mb-2">
                  {item[1].title}
                </div>
                <div id="content" className="">
                  {item[1].extract}
                </div>
              </a>
            </li>
          ))}
      </ul>
    </main>
  );
}
