'use client';

interface Logo {
  name: string;
  logo: string;
  url?: string;
}

interface MovingLogosProps {
  title?: string;
  subtitle?: string;
  logos?: Logo[];
}

export default function MovingLogos({ 
  title = "Trusted by Leading Companies",
  subtitle = "Join thousands of professionals who found their dream jobs with these amazing companies",
  logos = []
}: MovingLogosProps) {
  // Default company logos
  const defaultLogos: Logo[] = [
    { name: "Google", logo: "🔍", url: "#" },
    { name: "Microsoft", logo: "🪟", url: "#" },
    { name: "Amazon", logo: "📦", url: "#" },
    { name: "Apple", logo: "🍎", url: "#" },
    { name: "Meta", logo: "📘", url: "#" },
    { name: "Netflix", logo: "🎬", url: "#" },
    { name: "Tesla", logo: "⚡", url: "#" },
    { name: "Uber", logo: "🚗", url: "#" },
    { name: "Airbnb", logo: "🏠", url: "#" },
    { name: "Spotify", logo: "🎵", url: "#" },
    { name: "Twitter", logo: "🐦", url: "#" },
    { name: "LinkedIn", logo: "💼", url: "#" },
    { name: "Adobe", logo: "🎨", url: "#" },
    { name: "Salesforce", logo: "☁️", url: "#" },
    { name: "Oracle", logo: "🗄️", url: "#" },
    { name: "IBM", logo: "🔵", url: "#" },
    { name: "Intel", logo: "💻", url: "#" },
    { name: "NVIDIA", logo: "🎮", url: "#" },
    { name: "PayPal", logo: "💳", url: "#" },
    { name: "Shopify", logo: "🛒", url: "#" }
  ];

  const displayLogos = logos.length > 0 ? logos : defaultLogos;

  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...displayLogos, ...displayLogos];

  return (
    <div className="bg-white py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Moving Logos Container */}
        <div className="relative overflow-hidden">
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10"></div>
          
          {/* Moving Logos */}
          <div className="flex animate-scroll">
            {duplicatedLogos.map((logo, index) => (
              <div
                key={`${logo.name}-${index}`}
                className="flex-shrink-0 mx-8 sm:mx-12 lg:mx-16"
              >
                <div className="flex flex-col items-center justify-center group cursor-pointer">
                  {/* Logo */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-xl flex items-center justify-center text-2xl sm:text-3xl lg:text-4xl mb-3 group-hover:bg-blue-50 group-hover:scale-110 transition-all duration-300">
                    {logo.logo}
                  </div>
                  
                  {/* Company Name */}
                  <span className="text-xs sm:text-sm font-medium text-gray-600 group-hover:text-blue-600 transition-colors duration-300 text-center">
                    {logo.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
