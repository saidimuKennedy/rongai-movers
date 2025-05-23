import { useState } from "react";
import { useModal } from "@/context/ModalContext";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

export default function QuoteForm() {
  const { closeModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    origin: "",
    destination: "",
    moveDate: "",
    serviceType: "moving",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit quote request");
      }

      toast.success("Quote request submitted! We'll contact you soon.");
      closeModal();
    } catch (error) {
      console.error("Error submitting quote:", error);
      toast.error("Failed to submit quote request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Full Name*
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email*
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            required
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Phone Number*
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="Your Phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="origin"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Moving From
          </label>
          <input
            id="origin"
            name="origin"
            type="text"
            placeholder="Origin Address"
            value={formData.origin}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div>
          <label
            htmlFor="destination"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Moving To
          </label>
          <input
            id="destination"
            name="destination"
            type="text"
            placeholder="Destination Address"
            value={formData.destination}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="moveDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Preferred Date
          </label>
          <input
            id="moveDate"
            name="moveDate"
            type="date"
            value={formData.moveDate}
            onChange={handleChange}
            className="w-full p-2 border rounded text-gray-500 dark:text-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div>
          <label
            htmlFor="serviceType"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Service Type*
          </label>
          <select
            id="serviceType"
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            className="w-full p-2 border rounded text-gray-500 dark:text-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            required
          >
            <option value="moving">House Moving</option>
            <option value="office">Office Relocation</option>
            <option value="tv">TV Mounting</option>
            <option value="longDistance">Long Distance Moving</option>
            <option value="errand">Errand Service</option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Additional Details
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          placeholder="Tell us more about your needs..."
          value={formData.message}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
      </div>

      <div className="flex justify-end space-x-2 pt-2">
        <button
          type="button"
          onClick={closeModal}
          className="px-4 py-2 text-gray-600 focus: hover:text-[#FF8A50] hover:text-gray-800"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-[#E65C1C] text-white rounded hover:bg-[#FF8A50] transition-colors flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin h-4 w-4 mr-2" />
              Processing...
            </>
          ) : (
            "Submit Quote"
          )}
        </button>
      </div>
    </form>
  );
}
