import type { ReactNode } from "react";

type EditorFrameProps = {
  title: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  trailing?: ReactNode;
};

export const EditorFrame = ({ title, children, className = "", bodyClassName = "p-5", trailing }: EditorFrameProps) => {
  return (
    <div className={`rounded-xl border border-border/70 bg-card/80 backdrop-blur-md overflow-hidden shadow-[var(--shadow-card)] ${className}`}>
      <div className="flex items-center gap-2 px-4 h-10 border-b border-border/60 bg-secondary/50">
        <span className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        <span className="ml-2 font-mono text-xs text-muted-foreground truncate">{title}</span>
        {trailing && <div className="ml-auto shrink-0">{trailing}</div>}
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>
  );
};
