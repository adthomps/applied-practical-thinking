import { useEffect, useId, useRef, useState } from "react";
import type { FocusEvent, KeyboardEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig, NavItem } from "@/data/site";

function normalizePath(path: string) {
  if (!path) return "/";
  if (path === "/") return "/";
  return path.replace(/\/+$/, "");
}

function isRouteActive(pathname: string, routePath: string) {
  const current = normalizePath(pathname);
  const target = normalizePath(routePath);

  if (target === "/") return current === "/";
  return current === target || current.startsWith(`${target}/`);
}

function NavDropdown({ item, isLast = false }: { item: NavItem; isLast?: boolean }) {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const triggerRef = useRef<HTMLAnchorElement | null>(null);
  const childLinkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  
  const isActive = isRouteActive(location.pathname, item.path) ||
    item.children?.some((child) => isRouteActive(location.pathname, child.path));

  const closeDropdown = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(false);
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  const handleFocusWithin = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleBlurWithin = (event: FocusEvent<HTMLDivElement>) => {
    const nextFocus = event.relatedTarget;
    if (nextFocus instanceof Node && event.currentTarget.contains(nextFocus)) return;
    closeDropdown();
  };

  const handleDropdownKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Escape") return;
    event.preventDefault();
    closeDropdown();
    triggerRef.current?.focus();
  };

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLAnchorElement>) => {
    if (event.key !== "ArrowDown") return;
    event.preventDefault();
    setOpen(true);
    childLinkRefs.current[0]?.focus();
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!item.children) {
    return (
      <div className="relative group">
        <Link
          to={item.path}
          className={cn(
            "px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1",
            isActive
              ? "text-accent-foreground bg-accent"
              : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
          )}
        >
          {item.label}
        </Link>
        {/* Hover tooltip for description */}
        {item.description && (
          <div className={cn(
            "absolute top-full mt-2 w-64 max-w-[calc(100vw-2rem)] p-3 bg-popover border border-border rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-[100]",
            isLast ? "right-0" : "left-1/2 -translate-x-1/2"
          )}>
            <p className="text-xs text-muted-foreground">{item.description}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocusWithin}
      onBlur={handleBlurWithin}
      onKeyDown={handleDropdownKeyDown}
    >
      <Link
        ref={triggerRef}
        to={item.path}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onKeyDown={handleTriggerKeyDown}
        className={cn(
          "px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1",
          isActive
            ? "text-accent-foreground bg-accent"
            : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
        )}
      >
        {item.label}
        <ChevronDown className={cn(
          "h-3 w-3 transition-transform",
          open && "rotate-180"
        )} />
      </Link>
      
      {/* Dropdown menu */}
      <div 
        id={menuId}
        ref={dropdownRef}
        role="menu"
        aria-label={`${item.label} submenu`}
        className={cn(
          "absolute top-full pt-2 z-[100] transition-all",
          isLast ? "right-0" : "left-0",
          open ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
      >
        <div className="w-72 max-w-[calc(100vw-2rem)] bg-popover border border-border rounded-lg shadow-xl overflow-hidden">
          {/* Parent description */}
          {item.description && (
            <div className="px-4 py-3 border-b border-border bg-muted/30">
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
          )}
          {/* Children */}
          <div className="py-2 max-h-[calc(100vh-8rem)] overflow-y-auto">
            {item.children.map((child, index) => {
              const isChildActive = isRouteActive(location.pathname, child.path);
              return (
                <Link
                  key={child.path}
                  to={child.path}
                  role="menuitem"
                  ref={(node) => {
                    childLinkRefs.current[index] = node;
                  }}
                  onClick={closeDropdown}
                  className={cn(
                    "block px-4 py-3 transition-colors",
                    isChildActive 
                      ? "bg-accent text-accent-foreground" 
                      : "hover:bg-accent/20"
                  )}
                >
                  <div className={cn(
                    "text-sm font-medium",
                    isChildActive ? "text-accent-foreground" : "text-foreground"
                  )}>
                    {child.label}
                  </div>
                  {child.description && (
                    <p className={cn(
                      "text-xs mt-0.5 line-clamp-2",
                      isChildActive ? "text-accent-foreground/80" : "text-muted-foreground"
                    )}>
                      {child.description}
                    </p>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileNavItem({ item, onClose }: { item: NavItem; onClose: () => void }) {
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);
  
  const isActive = isRouteActive(location.pathname, item.path) ||
    item.children?.some((child) => isRouteActive(location.pathname, child.path));

  if (!item.children) {
    return (
      <Link
        to={item.path}
        onClick={onClose}
        className={cn(
          "block px-3 py-2 text-sm font-medium rounded-md transition-colors",
          location.pathname === item.path
            ? "text-accent-foreground bg-accent"
            : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
        )}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className={cn(
          "w-full px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center justify-between",
          isActive
            ? "text-accent-foreground bg-accent"
            : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
        )}
      >
        {item.label}
        <ChevronDown className={cn(
          "h-4 w-4 transition-transform",
          expanded && "rotate-180"
        )} />
      </button>
      
      {expanded && (
        <div className="ml-4 mt-1 space-y-1 border-l border-border pl-3">
          {item.children.map((child) => (
            <Link
              key={child.path}
              to={child.path}
              onClick={onClose}
              className={cn(
                "block px-3 py-2 text-sm rounded-md transition-colors",
                isRouteActive(location.pathname, child.path)
                  ? "text-accent-foreground bg-accent"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              )}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function AptNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container flex h-14 items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3 font-bold text-lg tracking-tight"
        >
          {/* Small emblem */}
          <div className="h-7 w-7 rounded-full border border-primary/60 flex items-center justify-center text-primary text-sm font-bold shadow-[0_0_12px_hsl(var(--primary)/0.3)]">
            A
          </div>
          <span className="text-foreground">APT</span>
          <span className="hidden sm:inline text-muted-foreground font-normal text-sm">
            Applied Practical Thinking
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {siteConfig.nav.map((item, index) => (
            <NavDropdown 
              key={item.path} 
              item={item} 
              isLast={index >= siteConfig.nav.length - 2}
            />
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-border bg-background p-4">
          <div className="flex flex-col gap-1">
            {siteConfig.nav.map((item) => (
              <MobileNavItem 
                key={item.path} 
                item={item} 
                onClose={() => setMobileOpen(false)} 
              />
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
