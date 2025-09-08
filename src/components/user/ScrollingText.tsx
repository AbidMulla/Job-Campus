'use client';

interface ScrollingTextProps {
  text?: string;
  className?: string;
}

export default function ScrollingText({ 
  text = "🚀 New Jobs Posted Daily • 💼 500+ Companies Hiring • 📈 10K+ Success Stories • 🎯 98% Job Placement Rate • ⚡ Instant Notifications • 🌟 Trusted by Freshers",
  className = ""
}: ScrollingTextProps) {
  // Duplicate text for seamless infinite scroll
  const duplicatedText = `${text} • ${text}`;

  return (
    <div className={`w-full mt-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 overflow-hidden ${className}`}>
      <div className="flex animate-scroll-text">
        <span className="whitespace-nowrap text-sm sm:text-base font-medium flex-shrink-0">
          {duplicatedText}
        </span>
      </div>
    </div>
  );
}
