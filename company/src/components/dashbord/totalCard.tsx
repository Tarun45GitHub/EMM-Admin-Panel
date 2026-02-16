import React from "react";

type UserStatCardProps = {
  title: string;
  value: number;
};

const TotalCard: React.FC<UserStatCardProps> = ({
  title = "Title",
  value = 500,
}) => {
  return (
    <button
      className="
        group relative w-full
        flex items-center justify-between gap-4
        px-6 py-4 rounded-2xl
        text-left
        bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950
        border border-white/10
        transform-gpu transition-all duration-300
        hover:scale-[1.03]
        hover:-translate-y-1
        active:scale-[0.98]
        overflow-hidden
      "
      style={{
        perspective: "1200px",
      }}
    >
      {/* 3D Surface */}
      <div
        className="
          absolute inset-0 rounded-2xl
          shadow-[0_25px_70px_rgba(0,0,0,0.55)]
          transition-all duration-300
          group-hover:shadow-[0_35px_90px_rgba(0,0,0,0.7)]
        "
      />

      {/* Soft glow background */}
      <span
        className="
          absolute -top-20 -right-20 h-52 w-52 rounded-full
          bg-sky-500/25 blur-3xl
          opacity-60
          group-hover:opacity-100
          transition-opacity duration-300
        "
      />

      {/* Inner highlight (top glass shine) */}
      <span
        className="
          absolute inset-0 rounded-2xl
          bg-gradient-to-b from-white/10 via-white/0 to-transparent
          opacity-60
          pointer-events-none
        "
      />

      {/* 3D tilt */}
      <div
        className="
          relative z-10 w-full flex items-center justify-between gap-4
          transform-gpu transition-transform duration-300
          group-hover:[transform:rotateX(10deg)_rotateY(-10deg)]
        "
      >
        {/* Left Content */}
        <div>
          <p className="text-sm font-medium text-white/70">{title}</p>
          <p className="mt-1 text-2xl md:text-3xl font-bold text-white tracking-tight text-center">
            {value}
          </p>
        </div>

       
        
      </div>

      {/* Premium Shine */}
      <span
        className="
          absolute -top-12 -left-12 w-28 h-28 rotate-45
          bg-white/20 blur-2xl
          opacity-30
          group-hover:translate-x-[340px]
          transition-transform duration-700
        "
      />
    </button>
  );
};

export default TotalCard;
