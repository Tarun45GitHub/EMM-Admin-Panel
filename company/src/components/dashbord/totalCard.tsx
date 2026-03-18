import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  positive?: boolean;
  Icon: any;
}

export default function TotalCard({
  title,
  value,
  change,
  positive = true,
  Icon,
}: StatCardProps) {
  return (
    <div
      className="
        flex items-center justify-between
        rounded-2xl
        bg-white
        dark:bg-gray-900
        p-3
        shadow-sm
        hover:shadow-md
        transition
        w-full
      "
    >
      {/* Left content */}
      <div className="flex flex-col gap-1">
        <span className="text-gray-500 text-sm font-medium dark:text-gray-400">
          {title}
        </span>

        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {value}
          </h2>

          <div
            className={`flex items-center gap-1 text-sm font-semibold
              ${positive ? "text-green-500" : "text-red-500"}
            `}
          >
            {positive ? (
              <TrendingUp size={16} />
            ) : (
              <TrendingDown size={16} />
            )}
            {change}%
          </div>
        </div>
      </div>

      {/* Icon Box */}
      <div
        className="
          w-12 h-12
          flex items-center justify-center
          rounded-xl
          bg-linear-to-r from-pink-500 to-purple-600
          text-white
          shadow-md
        "
      >
        <Icon size={22} />
      </div>
    </div>
  );
}