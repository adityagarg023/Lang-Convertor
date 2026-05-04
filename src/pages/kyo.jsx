import Header from "../components/header"
import ZangetsuEditor from "../components/kyo_editor"

const Zangetsu = () => {

    return (
      <div className="bg-[#0A0A0C] w-full h-full lg:h-screen">
        <Header />
        <ZangetsuEditor />
      </div>
    );
}

export default Zangetsu
