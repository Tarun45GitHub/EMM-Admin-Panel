import React, { useState, useRef, useEffect } from "react";
import api from "../../api/Axios";

interface BannerData {
  title: string;
  subtitle: string;
  description: string;
  redirect_url: string;
  display_order: number;
  is_active: boolean;
}

interface InputBannerProps {
  value?: number; // This acts as the default display order
  bannerId?:  number ; // ID of the banner selected in the dropdown
  onSuccess?: () => void;
}

const InputBanner: React.FC<InputBannerProps> = ({ value, bannerId, onSuccess }) => {
  
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [bannerData, setBannerData] = useState<BannerData>({
    title: "",
    subtitle: "",
    description: "",
    redirect_url: "",
    display_order: parseInt(value?.toString() || "0"),
    is_active: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // EFFECT: Fetch existing banner data when bannerId changes
  useEffect(() => {
    if (bannerId) {
      const fetchBannerDetails = async () => {
        try {
          const response = await api.get(`/crm/banners/${bannerId}/`);
          const d = response.data.data;
          setBannerData({
            title: d.title || "",
            subtitle: d.subtitle || "",
            description: d.description || "",
            redirect_url: d.redirect_url || "",
            display_order: d.display_order || value,
            is_active: d.is_active ?? true,
          });
          // Set the existing image as the preview
          if (d.image) setPreviewUrl(d.image);
        } catch (err) {
          console.error("Failed to load banner details", err);
        }
      };
      fetchBannerDetails();
    }
  }, [bannerId, value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(selectedFile);
    }
    setError(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value: inputValue, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : inputValue;
    setBannerData(prev => ({ 
      ...prev, 
      [name]: name === "display_order" ? parseInt(inputValue) || 0 : val 
    }));
  };

  const handleSave = async () => {
    // If creating new (no bannerId), image is required. 
    // If editing (bannerId exists), image is optional.
    if (!bannerId && !file) {
      setError("Please select an image file for the new banner");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append('title', bannerData.title);
      formData.append('subtitle', bannerData.subtitle);
      formData.append('description', bannerData.description);
      formData.append('redirect_url', bannerData.redirect_url);
      formData.append('display_order', bannerData.display_order.toString());
      formData.append('is_active', bannerData.is_active.toString());
      
      if (file) {
        formData.append('image', file);
      }

      const endpoint = bannerId ? `/crm/banners/${bannerId}/` : '/crm/banners/';
      const method ='patch' ; // Use patch for partial updates

      await api({
        method,
        url: endpoint,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSuccess(`Banner ${bannerId ? 'updated' : 'created'} successfully!`);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save banner.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Form Fields */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Title</label>
              <input type="text" name="title" value={bannerData.title} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Subtitle</label>
              <input type="text" name="subtitle" value={bannerData.subtitle} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Description</label>
            <textarea name="description" value={bannerData.description} onChange={handleInputChange} rows={2} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Redirect URL</label>
              <input type="url" name="redirect_url" value={bannerData.redirect_url} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Order</label>
              <select name="display_order" value={bannerData.display_order} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" name="is_active" id="is_active" checked={bannerData.is_active} onChange={handleInputChange} className="w-4 h-4 text-indigo-600" />
            <label htmlFor="is_active" className="text-sm dark:text-gray-300">Banner is Active</label>
          </div>
        </div>

        {/* Right: Image Upload */}
        <div className="lg:col-span-1">
          <label className="block text-sm font-medium mb-2 dark:text-gray-300">Update Image</label>
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="relative border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg h-48 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 overflow-hidden"
          >
            {previewUrl ? (
              <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-400 text-xs text-center px-2">Click to upload new image</span>
            )}
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          {file && <p className="text-[10px] mt-1 text-indigo-500 truncate">{file.name}</p>}
        </div>
      </div>

      {/* Messages */}
      {error && <p className="mt-4 text-sm text-red-500 bg-red-50 p-2 rounded">{error}</p>}
      {success && <p className="mt-4 text-sm text-green-500 bg-green-50 p-2 rounded">{success}</p>}

      <button
        onClick={handleSave}
        disabled={loading}
        className="w-full mt-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors disabled:bg-gray-400"
      >
        {loading ? "Processing..." : bannerId ? "Update Banner Details" : "Create Banner"}
      </button>
    </div>
  );
};

export default InputBanner;