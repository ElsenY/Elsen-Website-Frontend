"use client";
import HoverCard from "../ui/hover-card";
import ConfirmModal from "../ui/confirm-modal";
import { useState } from "react";

export default function Experiences() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [activeElementID, setActiveElementID] = useState("");
  const [activeUrl, setActiveUrl] = useState("");

  const toggleModal = (url:string, message:string) => {
    if (!window.matchMedia("(hover: none) and (pointer: coarse)").matches){
      window.open(url, "_blank");
      return;
    }
    setIsModalOpen(true);
    setModalMessage(message);
    setActiveUrl(url);
  }

  const handleCancel = () => {
    if (!window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;
    setIsModalOpen(false);
    const overlay = document.getElementById(activeElementID)
    
    overlay?.classList.toggle("active");
    const clear = () => overlay?.classList.remove("active");
    
    document.addEventListener("click", clear, { once: true });
    document.addEventListener("scroll", clear, { once: true });
    document.addEventListener("touchmove", clear, { once: true });
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    window.open(activeUrl, "_blank");
  };
  
  return (
    <div className="flex flex-col gap-4 pt-5">
      <h1 className="text-white text-[30px] font-bold leading-tight">
        Experiences
      </h1>
      <div className="flex md:flex-row gap-4 flex-col px-4 justify-around">
        <div className="flex-1" 
            onClick={() => { 
              toggleModal("https://synapsis.id", "Redirect to Synapsis's website?");
              setActiveElementID("synapsis-exp");
            }}
        >
          <HoverCard logo="/images/synapsis_logo.png" alt="Experience 1" description={synapsisExperience} elID="synapsis-exp" />
        </div>
        <div className="flex-1" 
            onClick={() => { 
              toggleModal("https://tokopedia.com", "Redirect to Tokopedia's website?");
              setActiveElementID("tokped-exp");
            }}
        >
            <HoverCard logo="/images/tokped_logo.png" alt="Experience 1" description={tokpedExperience} elID="tokped-exp" />
        </div>
        <div className="flex-1" 
            onClick={() => { 
              toggleModal("https://itemku.com", "Redirect to Itemku's website?");
              setActiveElementID("itemku-exp");
            }}
        >
          <HoverCard logo="/images/itemku_logo.png" alt="Experience 1" description={itemkuExperience} elID="itemku-exp" />
        </div>
        <div className="flex-1" 
            onClick={() => { 
              toggleModal("https://www.ag-it.com", "Redirect to AGIT's website?");
              setActiveElementID("agit-exp");
            }}
        >
          <HoverCard logo="/images/agit_logo.png" alt="Experience 1" description={agitExperience} elID="agit-exp"/>
        </div>
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        message={modalMessage}
      />
    </div>
  );
}

const agitExperience = <p className="text-sm whitespace-pre-line">
<b className="font-extrabold">February 2020 - March 2021</b><br/>
<br/>
Astra Graphia Information Technology <b>(AGIT)</b> is a software development company under one of the biggest conglomerate group in Indonesia (<b className="font-extrabold underline">Astra</b>)<br/>
<br/>
As a Frontend Intern in AGIT, I am responsible in developing the Frontend of the new modern apps for a client and also maintaining the old existing apps.
</p>

const itemkuExperience = <p className="text-sm whitespace-pre-line">
<b className="font-extrabold">March 2021 - March 2022</b><br/>
<br/>
<b>Itemku</b> is the biggest digital goods focused marketplace in Indonesia, having more than <b className="font-extrabold underline">10 Millions</b> monthly visitors.<br/>
<br/>
As a Software Engineer in Itemku, I am responsible in developing the Frontend, Backend, and Test automations for Itemku.com web and seller site.
</p>

const tokpedExperience = 
<p className="text-sm whitespace-pre-line">
<b className="font-extrabold">March 2022 - August 2024</b><br/>
<br/>
<b>TikTok Shop | Tokopedia</b> is one of the biggest e-commerce in Indonesia, having more than <b className="font-extrabold underline">140 Millions</b> monthly active users.<br/>
<br/>

As a Backend Engineer in TikTok Tokopedia, I am responsible in maintaining day to day activities of Tokopedia&apos;s Database and Redis, and also responsible in developing automations to improve efficiency of Database and Redis team.
</p>

const synapsisExperience = 
<p className="text-sm whitespace-pre-line">
<b className="font-extrabold">April 2025 - Present</b><br/>
<br/>
<b>Synapsis</b> is an exclusive IT consultant for one of the <b className="font-extrabold underline">BIG 5</b> mining contractor in Indonesia.<br/>
<br/>

As a Backend Engineer in Synapsis, I am responsible in developing, maintaining, and refactoring Backend and IOT services of Synapsis products.
</p>