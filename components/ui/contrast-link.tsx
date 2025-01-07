import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function ContrastLink({ href, children, className, innerClassName, ...rest }: { href: string; children?: React.ReactNode; className?: string; innerClassName?: string; [key: string]: any }) {
  return (
    <Link
      href={href}
      className={cn("inline-block relative group text-light hover:text-dark transition-colors duration-100 delay-100 z-[5]", className)}
      {...rest}
    >
      {children}
      <span className={cn("absolute bottom-0 inset-x-0 bg-light rounded-sm -z-[1] h-[2px] group-hover:h-full duration-200 ease-in-out", innerClassName)}/>
    </Link>
  );
}
