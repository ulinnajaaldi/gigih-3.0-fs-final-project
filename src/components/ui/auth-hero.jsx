import TokopediaIcon from "../../assets/images/tokopedia-icon.png";

const AuthHero = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <img src={TokopediaIcon} alt="Tokopedia Icon" className="w-24" />
      <p className="inline-flex -translate-y-2 gap-1 text-xl font-bold text-green-500">
        Tokopedia Play{" "}
        <span className="block -translate-y-1 -rotate-6 bg-green-500 px-1 text-white">
          Clone
        </span>
      </p>
    </div>
  );
};

export default AuthHero;
