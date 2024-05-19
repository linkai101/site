import { TbArrowUpRight } from "react-icons/tb";

export default function TiltChip({ children, className, ...rest }: { children?: any, className?: string, [key: string]: any }) {
  return (
    <div className="bg-dark rounded-full">
      <div
        className="px-1.5 py-[2px] flex items-center gap-1 text-dark bg-light rounded-full origin-left border border-dark hover:-rotate-[2deg] transition-transform"

        {...rest}
      >
        <div className={className}>
          {children}
        </div>
        <TbArrowUpRight size={14}/>
      </div>
    </div>

    // WITH FRAMER MOTION
    // <motion.div className="bg-dark rounded-full">
    //   <motion.div
    //     className="px-1.5 py-[2px] flex items-center gap-1 text-dark bg-light rounded-full origin-left border border-dark"
    //     whileHover={{
    //       rotate: -2,
    //     }}
    //     {...rest}
    //   >
    //     <div className={className}>
    //       {children}
    //     </div>
    //     <TbArrowUpRight size={14}/>
    //   </motion.div>
    // </motion.div>
  );
}
