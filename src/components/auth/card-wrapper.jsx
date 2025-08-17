import React from "react";
import Social from "./sociel";
import BackButton from "./backbutton";

function CardWrapper({
  children,
  headerLabel,
  BackButtonLavel,
  backButtonHref,
  label,
  showSocial,
}) {
  return (
    <div className=" w-[99vw] md:w-[500px] bg-white shadow-md rounded-md p-4 mx-auto">
      <div className="text-center">{headerLabel}</div>
      {children}
      <div className="w-full">{showSocial && <Social />}</div>
      <div className="pt-2">
        <BackButton
          BackButtonLavel={BackButtonLavel}
          href={backButtonHref}
          label={label}
        />
      </div>
    </div>
  );
}

export default CardWrapper;
