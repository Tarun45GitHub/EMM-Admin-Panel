import React from "react";

type BannerCardProps = {
  imageUrl: string | null;
};

const BannerCard: React.FC<BannerCardProps> = ({ imageUrl }) => {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Banner"
          className="w-200 h-60 object-cover"
        />
      ) : (
        <div className="h-48 flex items-center justify-center text-gray-400">
          No image selected
        </div>
      )}
      {/* {imageUrl && (
        <div className="p-4 text-center">
          <p className="text-gray-700 font-medium">Selected Banner</p>
        </div>
      )} */}
    </div>
  );
};

export default BannerCard;
