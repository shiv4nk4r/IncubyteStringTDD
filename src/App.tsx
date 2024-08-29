import { useState, useEffect } from "react";
import "./App.css";

import { fetchNumbers, add } from "./shared/util/string";

function App() {
  const [inputString, setInputString] = useState("");
  const [numbers, setNumbers] = useState<number[]>([]);
  const [sum, setSum] = useState<number>(0);
  const [errors, setErrors] = useState<string>("");

  useEffect(() => {
    try {
      const numbersArray = fetchNumbers(inputString);
      const sum = add(inputString);

      setSum(sum);
      setNumbers(numbersArray);
      setErrors("");
    } catch (error) {
      if (error instanceof Error) setErrors(error.message);
      console.error(error);
    }
  }, [inputString]);
  return (
    <div className="h-screen max-h-screen flex flex-col justify-between">
      <textarea
        onChange={(e) => setInputString(e.target.value)}
        placeholder="Type here..."
        className=" text-right flex-1 w-full h-auto resize-none bg-transparent focus-visible:outline-none text-5xl font-medium tracking-widest leading-relaxed text-gray-400"
      />

      <div className="flex-1 py-6 relative flex flex-col justify-end">
        <div
          className=" py-3 w-full text-right select-none overflow-y-scroll max-h-96 flex flex-col justify-end
          text-gray-400 text-6xl font-light
            before:block
            before:content-['']
            before:absolute
            before:inset-0  
            before:bg-gradient-to-b
            before:from-[#eeeeee]
            before:to-transparent
            before:opacity-100
            before:z-[5]"
        >
          {numbers?.map((number, index) =>
            index === numbers.length - 1 ? (
              <div>+ {number}</div>
            ) : (
              <div>{number}</div>
            )
          )}
        </div>
        <div className=" right-0 h-1 bg-slate-300"></div>
        <div className="w-full text-right text-7xl font-light">
          {errors ? (
            <div className=" text-3xl text-red-400">{errors}</div>
          ) : (
            <div className=" text-gray-500">{sum}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
