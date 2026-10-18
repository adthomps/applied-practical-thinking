import { cn } from "@/lib/utils";

type SectionIntroProps = {
  title: string;
  description: string;
  /** Use "h1" when the intro is the page title. */
  as?: "h1" | "h2";
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  eyebrow?: React.ReactNode;
  children?: React.ReactNode;
};

export function SectionIntro({
  title,
  description,
  as: Heading = "h2",
  align = "left",
  className,
  titleClassName,
  descriptionClassName,
  eyebrow,
  children,
}: SectionIntroProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "max-w-3xl space-y-3",
        centered && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? <div className={cn(centered && "flex justify-center")}>{eyebrow}</div> : null}
      <Heading className={cn("text-2xl md:text-3xl font-semibold tracking-tight", titleClassName)}>
        {title}
      </Heading>
      <p className={cn("text-sm md:text-base text-muted-foreground", descriptionClassName)}>
        {description}
      </p>
      {children ? <div>{children}</div> : null}
    </div>
  );
}
