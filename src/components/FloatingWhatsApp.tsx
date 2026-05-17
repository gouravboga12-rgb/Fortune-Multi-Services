import { MessageCircle } from 'lucide-react';

const FloatingWhatsApp = () => {
  const whatsappNumber = "918919051513";
  const defaultMessage = encodeURIComponent("Hello, I would like to know more about your business services.");

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${defaultMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all group"
      aria-label="Contact on WhatsApp"
    >
      <div className="relative">
        <MessageCircle className="w-8 h-8" />
        <span className="absolute -top-12 right-0 bg-white text-secondary text-xs font-bold px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          How can we help you?
        </span>
      </div>
    </a>
  );
};

export default FloatingWhatsApp;
