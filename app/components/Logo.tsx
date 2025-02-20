import Image from "next/image";

export default function Logo() {
  return (
    <div className="relative w-20 h-20 sm:w-16 sm:h-16">
      <Image
        src="/logo.png"
        alt="Wall of Fame Logo"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}
