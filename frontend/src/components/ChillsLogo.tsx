interface ChillsLogoProps {
  className?: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
}

export default function ChillsLogo({ className = "", size = "large" }: ChillsLogoProps) {
  const sizeClasses = {
    small: "text-2xl",
    medium: "text-4xl",
    large: "text-6xl md:text-8xl",
    xlarge: "text-8xl md:text-9xl"
  };

  return (
    <div className={`chills-logo ${sizeClasses[size]} ${className}`}>
      <span className="chills-text">CHILLS</span>
    </div>
  );
}