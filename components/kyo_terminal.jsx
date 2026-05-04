import { useState } from "react";
import executeCode from "./api";

function KyoTerminal({ lang, value }) {
  const [output, setOutput] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const runcode = async () => {
    setIsLoading(true);
    const { run: result } = await executeCode(lang, value);
    setOutput(result.output);
    setIsLoading(false);
  };
  return (
    <div className="w-full flex flex-col gap-8 ">
      <div className="w-full flex flex-row justify-between">
        <p className="text-xl">Output:</p>
        <button
          onClick={runcode}
          className="px-8 py-1 border border-[#FAFAFA] text-black bg-[#FAFAFA] hover:bg-black hover:text-[#FAFAFA] box-shadow: 0 0 15px rgba(169, 235, 193, 0.6) w-fit "
        >
          {isloading ? "Running.." : "Run"}
        </button>
      </div>
      {output ? (
        <div className="w-full text-md h-[80vh] p-8 border border-zinc-700 bg-zinc-900 text-[#a3a3a3]">
          <p>root@Kyo:~$ {output}</p>
        </div>
      ) : (
        <div className="w-full text-md h-[80vh] p-8 border border-zinc-700 bg-zinc-900 text-[#a3a3a3]">
          <p>{"root@Kyo:~$ Ready to compile..."}</p>
          <p>
            {output
              ? output
              : 'root@Kyo:~$ Click "Run" to see the output here'}
          </p>
        </div>
      )}
    </div>
  );
}

export default KyoTerminal;
