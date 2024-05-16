import { cn } from '@/utils/cn';

export default function Window({ children, className, ...rest }: { children?: React.ReactNode, drag?: boolean, className?: string, [key: string]: any }) {
  return (
    <div
      className={cn("text-dark bg-light rounded-xl shadow-2xl outline-primary overflow-hidden", className)}
      {...rest}
    >
      <div className="relative h-full">
        <div className="absolute top-2.5 left-2.5 flex gap-2 z-10">
          <div className="h-3.5 w-3.5 bg-red-400 rounded-full"/>
          <div className="h-3.5 w-3.5 bg-yellow-400 rounded-full"/>
          <div className="h-3.5 w-3.5 bg-green-400 rounded-full"/>
        </div>

        {children}
      </div>
    </div>
  );
}
