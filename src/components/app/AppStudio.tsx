import { useState } from "react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import * as Slider from "@radix-ui/react-slider";

const screens = ["Home", "Air", "History", "Schedules", "Filter", "Settings"] as const;
type Screen = (typeof screens)[number];

const history = Array.from({ length: 24 }, (_, hour) => ({
  hour: `${hour}`,
  indoor: Math.round(10 + Math.sin(hour / 3) * 4 + (hour === 19 ? 9 : 0)),
  outdoor: Math.round(120 + Math.sin(hour / 4) * 30),
}));

export function AppStudio() {
  const [screen, setScreen] = useState<Screen>("Home");
  const [fan, setFan] = useState(18);
  const [mode, setMode] = useState("Sleep");
  const [schedule, setSchedule] = useState(true);
  const [wifi, setWifi] = useState(true);

  return (
    <div className="grid items-center gap-12 lg:grid-cols-2">
      <div className="phone-shell mx-auto">
        <div className="phone-screen flex flex-col p-5">
          <div className="flex items-center justify-between">
            <p className="eyebrow text-stone">AURA</p>
            <p className="mono text-fine text-stone">Living room</p>
          </div>
          <div className="mt-6 flex-1">
            {screen === "Home" ? (
              <div>
                <p className="eyebrow text-stone">Indoor AQI</p>
                <p className="type-display mt-2">12</p>
                <p className="text-stone">Good · outdoor 148</p>
                <p className="mt-8 eyebrow text-stone">Mode</p>
                <div className="mt-3 flex gap-2">
                  {["Sleep", "Auto", "Boost"].map((item) => (
                    <button
                      key={item}
                      type="button"
                      className={`min-h-11 flex-1 text-fine ${mode === item ? "bg-ink text-paper" : "border border-line"}`}
                      onClick={() => setMode(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <p className="mt-6 eyebrow text-stone">Fan {fan}%</p>
                <Slider.Root
                  className="relative mt-3 flex h-11 items-center"
                  value={[fan]}
                  max={100}
                  step={1}
                  onValueChange={(value) => setFan(value[0] ?? 0)}
                  aria-label="Fan speed"
                >
                  <Slider.Track className="relative h-px grow bg-line">
                    <Slider.Range className="absolute h-px bg-ink" />
                  </Slider.Track>
                  <Slider.Thumb className="block size-4 rounded-full border border-ink bg-paper" />
                </Slider.Root>
              </div>
            ) : null}
            {screen === "Air" ? (
              <ul className="divide-y divide-line">
                {[
                  ["PM2.5", "8 µg/m³"],
                  ["PM10", "11 µg/m³"],
                  ["VOC", "36"],
                  ["CO₂", "612 ppm"],
                  ["Temperature", "25.4°C"],
                  ["Humidity", "47%"],
                ].map(([label, value]) => (
                  <li key={label} className="flex items-baseline justify-between py-3">
                    <span className="text-stone">{label}</span>
                    <span className="mono">{value}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            {screen === "History" ? (
              <div className="h-56">
                <p className="eyebrow text-stone">24 hours · indoor</p>
                <ResponsiveContainer width="100%" height="85%">
                  <AreaChart data={history}>
                    <Area dataKey="indoor" stroke="#3f7374" fill="#a8c7c7" fillOpacity={0.5} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ) : null}
            {screen === "Schedules" ? (
              <div>
                <div className="flex items-center justify-between border-b border-line py-4">
                  <div>
                    <p>Sleep at 22:00</p>
                    <p className="text-fine text-stone">24 dB until 06:30</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={schedule}
                    className={`min-h-11 min-w-16 px-3 ${schedule ? "bg-ink text-paper" : "border border-line"}`}
                    onClick={() => setSchedule((value) => !value)}
                  >
                    {schedule ? "On" : "Off"}
                  </button>
                </div>
                <div className="border-b border-line py-4">
                  <p>Morning clear</p>
                  <p className="text-fine text-stone">Auto for 40 minutes at 06:45</p>
                </div>
              </div>
            ) : null}
            {screen === "Filter" ? (
              <div>
                <p className="eyebrow text-stone">Filter life</p>
                <p className="type-display mt-2">64%</p>
                <p className="text-stone">About four months at this pace.</p>
                <div className="mt-6 h-px bg-line">
                  <div className="h-px w-[64%] bg-ink" />
                </div>
                <p className="mt-6 text-stone">The app reminds you. The tower does not beep.</p>
              </div>
            ) : null}
            {screen === "Settings" ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Wi-Fi</span>
                  <button type="button" className="min-h-11 underline" onClick={() => setWifi((value) => !value)}>
                    {wifi ? "Home-5G" : "Offline"}
                  </button>
                </div>
                <p className="text-stone">Units · metric</p>
                <p className="text-stone">Notifications · filter and faults only</p>
              </div>
            ) : null}
          </div>
          <div className="grid grid-cols-3 gap-1 border-t border-line pt-2">
            {screens.map((item) => (
              <button
                key={item}
                type="button"
                className={`min-h-11 px-0.5 text-center text-[0.65rem] leading-tight ${screen === item ? "text-ink" : "text-stone"}`}
                onClick={() => setScreen(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div>
        <p className="eyebrow text-stone">Now showing · {screen}</p>
        <h2 className="type-title mt-3">
          {screen === "Home" && "The only screen is the one you already carry."}
          {screen === "Air" && "Six numbers. No dashboard costume."}
          {screen === "History" && "A day, not a drama."}
          {screen === "Schedules" && "Two moments. The rest is automatic."}
          {screen === "Filter" && "You’ll know before the air does."}
          {screen === "Settings" && "Very little to set."}
        </h2>
        <p className="mt-4 max-w-md text-stone">
          Fan is at {fan}% in {mode}. These controls stay on the phone. The object in the room keeps a single ring.
        </p>
      </div>
    </div>
  );
}
