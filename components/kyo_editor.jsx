import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./language_selector";
import ConLanguage from "./conlanguage";
import KyoTerminal from "./kyo_terminal";
import { useRef, useState } from "react";
import { Code_Snippets } from "../constants";
import { genConversion } from "./ai_api";

const KyoEditor = () => {
  const [lang, setLang] = useState("javascript");
  const [conlang, setConlang] = useState("ruby");
  const [value, setValue] = useState(Code_Snippets.javascript);
  const [convalue, setConvalue] = useState("");
  const [isloading, setIsLoading] = useState(false);

  const convert = async () => {
    try {
      setIsLoading(true);
      const response = await genConversion(lang, conlang, value);
      const cleanedCode = response.replace(/```[\s\S]*?\n|```/g, "").trim();
      setConvalue(cleanedCode);
    } catch (error) {
      console.error("Error during conversion:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-5 w-full p-5">
      <div className="flex flex-col lg:w-1/3 w-full h-1/2 lg:h-full gap-6 text-white">
        <LanguageSelector lang={lang} setLang={setLang} setValue={setValue} />
        <Editor
          height="80vh"
          theme="vs-dark"
          language={lang}
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      </div>
      <div className="flex flex-col lg:w-1/2 w-full h-1/2 lg:h-full gap-6 text-white">
        <div className="flex justify-between">
          <button
            onClick={convert}
            className="px-4 py-1 bg-[#FAFAFA] border border-[#FAFAFA] hover:bg-black hover:text-[#FAFAFA] text-black "
          >
            {isloading ? "Converting..." : "Convert"}
          </button>
          <ConLanguage conlang={conlang} setConlang={setConlang} />
        </div>
        <Editor
          height="80vh"
          theme="vs-dark"
          language={conlang}
          value={convalue}
          onChange={(newValue) => setConvalue(newValue)}
        />
      </div>
      <div className="flex flex-col gap-10 lg:w-1/5 w-full text-white">
        <KyoTerminal lang={conlang} value={convalue} />
      </div>
    </div>
  );
};

export default KyoEditor;
