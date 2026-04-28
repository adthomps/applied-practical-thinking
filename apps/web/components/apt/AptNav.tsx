import { useEffect, useId, useRef, useState } from "react";
import type { FocusEvent as ReactFocusEvent, KeyboardEvent as ReactKeyboardEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig, NavItem } from "@/data/site";

function normalizePath(path: string) {
  if (!path) return "/";
  const [withoutQuery] = path.split("?");
  const [withoutHash] = withoutQuery.split("#");
  if (!withoutHash || withoutHash === "/") return "/";
  return withoutHash.replace(/\/+$/, "") || "/";
}

function normalizeHash(path: string) {
  if (!path || !path.includes("#")) return "";
  const [withoutQuery] = path.split("?");
  const [, hash = ""] = withoutQuery.split("#");
  return hash ? `#${hash}` : "";
}

function isRouteActive(currentRoute: string, routePath: string) {
  const current = normalizePath(currentRoute);
  const target = normalizePath(routePath);
  const targetHash = normalizeHash(routePath);
  const currentHash = normalizeHash(currentRoute);

  if (target === "/") return current === "/";

  const pathMatch = current === target || current.startsWith(`${target}/`);
  if (!pathMatch) return false;
  if (!targetHash) return true;

  return current === target && currentHash === targetHash;
}

function isFocusableElementVisible(element: HTMLElement) {
  const style = window.getComputedStyle(element);
  if (style.display === "none" || style.visibility === "hidden") return false;
  const rect = element.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
}

function NavDropdown({ item, isLast = false }: { item: NavItem; isLast?: boolean }) {
  const location = useLocation();
  const currentRoute = `${location.pathname}${location.hash || ""}`;
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const suppressHoverRef = useRef(false);
  const keyboardManagedOpenRef = useRef(false);
  const triggerRef = useRef<HTMLAnchorElement | null>(null);
  const childLinkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  
  const isActive = isRouteActive(currentRoute, item.path) ||
    item.children?.some((child) => isRouteActive(currentRoute, child.path));

  const closeDropdown = (options?: { suppressHover?: boolean }) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (options?.suppressHover) {
      suppressHoverRef.current = true;
    }
    keyboardManagedOpenRef.current = false;
    setOpen(false);
  };

  const handleMouseEnter = () => {
    if (suppressHoverRef.current) return;
    keyboardManagedOpenRef.current = false;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => closeDropdown(), 150);
  };

  const handleFocusWithin = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    keyboardManagedOpenRef.current = true;
    setOpen(true);
  };

  const handleBlurWithin = (event: ReactFocusEvent<HTMLDivElement>) => {
    const currentTarget = event.currentTarget;
    const nextFocus = event.relatedTarget;
    if (nextFocus instanceof Node && currentTarget.contains(nextFocus)) return;

    // Related target can be null when focus drops to the document/body.
    if (!nextFocus) {
      window.requestAnimationFrame(() => {
        const activeElement = document.activeElement;
        if (activeElement instanceof Node && currentTarget.contains(activeElement)) return;
        closeDropdown({ suppressHover: true });
      });
      return;
    }

    closeDropdown({ suppressHover: true });
  };

  const handleDropdownKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Escape") return;
    event.preventDefault();
    closeDropdown({ suppressHover: true });
    triggerRef.current?.focus();
  };

  const handleTriggerKeyDown = (event: ReactKeyboardEvent<HTMLAnchorElement>) => {
    if (event.key !== "ArrowDown") return;
    event.preventDefault();
    keyboardManagedOpenRef.current = true;
    setOpen(true);
    childLinkRefs.current[0]?.focus();
  };

  const handleTriggerBlur = (event: ReactFocusEvent<HTMLAnchorElement>) => {
    const nextFocus = event.relatedTarget;
    if (nextFocus instanceof Node) {
      if (triggerRef.current?.contains(nextFocus)) return;
      if (dropdownRef.current?.contains(nextFocus)) return;
    }
    closeDropdown({ suppressHover: true });
  };

  useEffect(() => {
    if (!open) return;

    const handleDocumentFocusOrPointer = (event: Event) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (triggerRef.current?.contains(target)) return;
      if (dropdownRef.current?.contains(target)) return;
      if (event.type === "focusin") {
        closeDropdown({ suppressHover: true });
      } else {
        closeDropdown();
      }
    };

    const handleDocumentFocusOut = (event: Event) => {
      if (!(event instanceof FocusEvent)) return;
      const nextFocus = event.relatedTarget;
      if (nextFocus instanceof Node) {
        if (triggerRef.current?.contains(nextFocus)) return;
        if (dropdownRef.current?.contains(nextFocus)) return;
      }

      window.requestAnimationFrame(() => {
        const activeElement = document.activeElement;
        if (activeElement instanceof Node) {
          if (triggerRef.current?.contains(activeElement)) return;
          if (dropdownRef.current?.contains(activeElement)) return;
        }
        closeDropdown({ suppressHover: true });
      });
    };

    const handleWindowBlur = () => {
      closeDropdown({ suppressHover: true });
    };

    document.addEventListener("focusin", handleDocumentFocusOrPointer);
    document.addEventListener("focusout", handleDocumentFocusOut, true);
    document.addEventListener("pointerdown", handleDocumentFocusOrPointer);
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      document.removeEventListener("focusin", handleDocumentFocusOrPointer);
      document.removeEventListener("focusout", handleDocumentFocusOut, true);
      document.removeEventListener("pointerdown", handleDocumentFocusOrPointer);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, [open]);

  useEffect(() => {
    if (!open || !keyboardManagedOpenRef.current) return;

    const blurGuard = window.setInterval(() => {
      const activeElement = document.activeElement;
      if (!(activeElement instanceof Node)) return;
      if (triggerRef.current?.contains(activeElement)) return;
      if (dropdownRef.current?.contains(activeElement)) return;
      if (activeElement === document.body) {
        closeDropdown({ suppressHover: true });
      }
    }, 60);

    return () => {
      window.clearInterval(blurGuard);
    };
  }, [open]);

  useEffect(() => {
    const handlePointerMove = () => {
      suppressHoverRef.current = false;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
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
            "absolute top-full mt-2 w-64 max-w-[calc(100vw-2rem)] p-3 bg-popover border border-border rounded-lg shadow-elevation-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-[100]",
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
        onBlur={handleTriggerBlur}
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
        <div className="w-72 max-w-[calc(100vw-2rem)] bg-popover border border-border rounded-lg shadow-elevation-4 overflow-hidden">
          {/* Parent description */}
          {item.description && (
            <div className="px-4 py-3 border-b border-border bg-muted/30">
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
          )}
          {/* Children */}
          <div className="py-2 max-h-[calc(100vh-8rem)] overflow-y-auto">
            {item.children.map((child, index) => {
              const isChildActive = isRouteActive(currentRoute, child.path);
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
  const currentRoute = `${location.pathname}${location.hash || ""}`;
  const [expanded, setExpanded] = useState(false);
  const submenuId = useId();
  
  const isActive = isRouteActive(currentRoute, item.path) ||
    item.children?.some((child) => isRouteActive(currentRoute, child.path));

  if (!item.children) {
    return (
      <Link
        to={item.path}
        onClick={onClose}
        className={cn(
          "block px-3 py-2 text-sm font-medium rounded-md transition-colors",
          isRouteActive(currentRoute, item.path)
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
        aria-expanded={expanded}
        aria-controls={submenuId}
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
        <div id={submenuId} className="ml-4 mt-1 space-y-1 border-l border-border pl-3">
          {item.children.map((child) => (
            <Link
              key={child.path}
              to={child.path}
              onClick={onClose}
                className={cn(
                  "block px-3 py-2 text-sm rounded-md transition-colors",
                  isRouteActive(currentRoute, child.path)
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
  const mobileMenuId = useId();
  const mobileToggleRef = useRef<HTMLButtonElement | null>(null);
  const mobileNavRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!mobileOpen) return;

    const handleMobileKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMobileOpen(false);
        mobileToggleRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements: HTMLElement[] = [];

      if (mobileToggleRef.current && isFocusableElementVisible(mobileToggleRef.current)) {
        focusableElements.push(mobileToggleRef.current);
      }

      if (mobileNavRef.current) {
        const menuFocusableElements = mobileNavRef.current.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])"
        );
        menuFocusableElements.forEach((element) => {
          if (isFocusableElementVisible(element)) {
            focusableElements.push(element);
          }
        });
      }

      if (focusableElements.length === 0) return;

      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement as HTMLElement | null;
      const focusIsInsideManagedSet =
        !!activeElement && focusableElements.includes(activeElement);

      if (event.shiftKey) {
        if (!focusIsInsideManagedSet || activeElement === firstFocusable) {
          event.preventDefault();
          lastFocusable.focus();
        }
        return;
      }

      if (!focusIsInsideManagedSet || activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    };

    document.addEventListener("keydown", handleMobileKeyDown);
    return () => {
      document.removeEventListener("keydown", handleMobileKeyDown);
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container flex h-14 items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3 font-bold text-lg tracking-tight"
        >
          {/* Small emblem */}
          <div className="h-7 w-7 rounded-full border border-primary/60 flex items-center justify-center text-primary text-sm font-bold shadow-apt-glow-subtle">
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
          ref={mobileToggleRef}
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          aria-controls={mobileMenuId}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav
          id={mobileMenuId}
          ref={mobileNavRef}
          className="md:hidden border-t border-border bg-background p-4"
          aria-label="Mobile navigation"
        >
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
