import React, { useState } from "react";
import { AGRONOMY_CONTACT_DESK } from "../data/seedData";
import { getTranslation } from "../utils/i18n";
import {
  PageArtworkHeader,
  KrishiAgronomyDeskEngraving
} from "./HalftoneSVGs";
import {
  IconPhoneDesk,
  IconCheckCircle
} from "./AlmanacIcons";

export const ContactSupportView = ({ language = "en" }) => {
  const t = (key) => getTranslation(language, key);

  const [farmerName, setFarmerName] = useState("");
  const [farmerPhone, setFarmerPhone] = useState("");
  const [fieldPlot, setFieldPlot] = useState("Field 1 · Paddy block");
  const [inquiryType, setInquiryType] = useState("pump_relay");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-12 max-w-5xl mx-auto animate-fadeIn">
      {/* Plate 6.1 Editorial Backdrop Header Banner */}
      <PageArtworkHeader
        plateNo="PLATE 6.1"
        title="Krishi Vigyan Kendra Extension Hub"
        subtitle="Agronomist consultation desk, core sampling & canal flume"
        defaultExpanded={false}
      >
        <KrishiAgronomyDeskEngraving />
      </PageArtworkHeader>

      {/* Header */}
      <div className="border-b border-[#16130F]/15 pb-4">
        <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#16130F]">
          Agronomist Helpdesk · <span className="italic text-[#3E5B34]">Field dispatch</span>
        </h1>
        <p className="font-mono text-[10px] uppercase tracking-widest text-[#16130F]/60">
          KRISHI VIGYAN KENDRA ADVISORY & RELAY HARDWARE EMERGENCY HOTLINE
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Column: Contact Directory & Emergency Hotlines */}
        <div className="md:col-span-5 bg-[#FAF4E2] border-2 border-[#16130F] rounded-3xl p-6 sm:p-7 shadow-sm space-y-6 relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 w-72 h-auto pointer-events-none opacity-[0.06] select-none">
            <KrishiAgronomyDeskEngraving />
          </div>
          <div className="space-y-1 border-b border-[#16130F]/15 pb-3 relative z-10">
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#D98B6F] font-bold">
              DIRECT DISPATCH NUMBERS
            </span>
            <h2 className="font-serif text-xl font-bold text-[#16130F]">
              Emergency Telemetry Support
            </h2>
          </div>

          <div className="space-y-4 font-mono text-xs relative z-10">
            <div>
              <span className="text-[10px] text-[#16130F]/60 block uppercase font-bold">
                TOLL-FREE FARMER HELPLINE
              </span>
              <a
                href={`tel:${AGRONOMY_CONTACT_DESK.tollFree}`}
                className="font-serif text-2xl font-bold text-[#3E5B34] hover:underline flex items-center gap-2"
              >
                <IconPhoneDesk className="w-5 h-5 text-[#3E5B34]" />
                <span>{AGRONOMY_CONTACT_DESK.tollFree}</span>
              </a>
            </div>

            <div>
              <span className="text-[10px] text-[#16130F]/60 block uppercase font-bold">
                REGIONAL TELEMETRY DESK
              </span>
              <span className="font-serif text-lg font-bold text-[#16130F]">
                {AGRONOMY_CONTACT_DESK.hotline}
              </span>
            </div>

            <div>
              <span className="text-[10px] text-[#16130F]/60 block uppercase font-bold">
                EMAIL DISPATCH
              </span>
              <a
                href={`mailto:${AGRONOMY_CONTACT_DESK.email}`}
                className="text-[#16130F] hover:underline"
              >
                {AGRONOMY_CONTACT_DESK.email}
              </a>
            </div>

            <div>
              <span className="text-[10px] text-[#16130F]/60 block uppercase font-bold">
                PHYSICAL HUB ADDRESS
              </span>
              <p className="font-sans text-xs text-[#16130F]/75 leading-relaxed mt-0.5">
                {AGRONOMY_CONTACT_DESK.dispatchOffice}
              </p>
            </div>
          </div>

          {/* Officers Roster */}
          <div className="pt-3 border-t border-[#16130F]/15 space-y-2">
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#3E5B34] font-bold block">
              ON-DUTY FIELD SPECIALISTS
            </span>
            {AGRONOMY_CONTACT_DESK.officers.map((officer) => (
              <div
                key={officer.name}
                className="p-2.5 bg-[#FBF6E6] rounded-xl border border-[#16130F]/15 font-mono text-xs flex justify-between items-center"
              >
                <div>
                  <div className="font-bold text-[#16130F]">{officer.name}</div>
                  <div className="text-[9px] text-[#16130F]/60">{officer.role}</div>
                </div>
                <span className="text-[#3E5B34] font-bold text-[11px]">
                  {officer.phone}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive Consultation & Assistance Form (from call.html) */}
        <div className="md:col-span-7 bg-[#FAF4E2] border-2 border-[#16130F] rounded-3xl p-6 sm:p-8 shadow-sm space-y-5 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-80 h-auto pointer-events-none opacity-[0.06] select-none">
            <KrishiAgronomyDeskEngraving />
          </div>
          <div className="border-b border-[#16130F]/15 pb-3 relative z-10">
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#3E5B34] font-bold">
              REQUEST TECHNICAL CONSULTATION
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#16130F]">
              Direct Inquiry to Agronomist Desk
            </h2>
          </div>

          {submitted ? (
            <div className="p-6 bg-[#A8BE86]/20 border-2 border-[#3E5B34] rounded-2xl space-y-3 font-mono text-center relative z-10">
              <IconCheckCircle className="w-10 h-10 text-[#3E5B34] mx-auto" />
              <h3 className="font-serif text-xl font-bold text-[#3E5B34]">
                Inquiry Logged Successfully!
              </h3>
              <p className="text-xs text-[#16130F]/80">
                Ticket #AGR-{(Math.random() * 10000).toFixed(0)} dispatched to our regional agronomist. An engineer will ring you back within 2 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-4 py-2 bg-[#0E0C0B] text-[#FBF6E6] rounded-full text-xs uppercase"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
              <div>
                <label className="font-mono text-xs uppercase font-bold block mb-1">
                  Farmer Name / Agro-Enterprise:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={farmerName}
                  onChange={(e) => setFarmerName(e.target.value)}
                  className="w-full bg-white border border-[#16130F]/30 rounded-xl p-2.5 font-mono text-xs focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-mono text-xs uppercase font-bold block mb-1">
                    Phone Contact:
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={farmerPhone}
                    onChange={(e) => setFarmerPhone(e.target.value)}
                    className="w-full bg-white border border-[#16130F]/30 rounded-xl p-2.5 font-mono text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-mono text-xs uppercase font-bold block mb-1">
                    Inquiry Classification:
                  </label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full bg-white border border-[#16130F]/30 rounded-xl p-2.5 font-mono text-xs cursor-pointer focus:outline-none"
                  >
                    <option value="pump_relay">Pump Actuator / Relay Tripped</option>
                    <option value="soil_sensor">Capacitive Sensor Calibration</option>
                    <option value="crop_setpoint">Crop Threshold Depletion Advice</option>
                    <option value="lora_range">LoRa Wireless Range / Antenna</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-mono text-xs uppercase font-bold block mb-1">
                  Observed Problem / Field Notes:
                </label>
                <textarea
                  rows="4"
                  required
                  placeholder="Describe your soil conditions, pump motor behavior, or LoRa packet reception questions..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white border border-[#16130F]/30 rounded-xl p-2.5 font-mono text-xs focus:outline-none font-sans"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#0E0C0B] text-[#FBF6E6] font-mono text-xs uppercase font-bold hover:bg-[#3E5B34] transition-colors"
              >
                Dispatch Inquiry to Krishi Desk →
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
