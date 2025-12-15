import Navigation from "./Navigation";

function Panel() {
  return (
    <div className=" bg-white h-dvh w-75 ">
      <h1 className="text-sky-400 text-4xl pt-3.5 pl-3.5 font-semibold">
        SkyDash
      </h1>
      <Navigation />
    </div>
  );
}

export default Panel;
