import Image from 'next/image';

export default function MenuBar({ className, ...rest }: { className?: string, [key: string]: any }) {
  return (
    <div className={`px-4 flex justify-between text-xs font-mono ${className}`} {...rest}>
      <div className="flex items-center gap-4">
        <Image
          src="/assets/logo_white.png"
          alt="Linkai's logo"
          width={128}
          height={128}
          className="w-[20px] h-[20px]"
        />
        
        <p className="font-bold">
          Home
        </p>
      </div>

      <div className="py-0.5 flex items-center gap-2.5">
        <p>
          {new Date().toDateString()}
        </p>

        <p>
          {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
        </p>
      </div>
    </div>
  );
}
