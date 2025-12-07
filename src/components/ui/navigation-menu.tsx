import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      "tw-relative tw-z-10 tw-flex tw-max-w-max tw-flex-1 tw-items-center tw-justify-center",
      className,
    )}
    {...props}
  >
    {children}
    <NavigationMenuIndicator />
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "tw-group tw-flex tw-flex-1 tw-list-none tw-items-center tw-justify-center tw-gap-1",
      className,
    )}
    {...props}
  />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(
      "tw-group tw-inline-flex tw-h-10 tw-w-max tw-items-center tw-justify-center tw-rounded-md tw-bg-background tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-transition-colors hover:tw-bg-accent hover:tw-text-accent-foreground focus:tw-bg-accent focus:tw-text-accent-foreground focus:tw-outline-none disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[active]:tw-bg-accent/50 data-[state=open]:tw-bg-accent/50",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronDown
      className="tw-relative tw-ml-1 tw-h-4 tw-w-4 tw-transition tw-duration-200 group-data-[state=open]:tw-rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "tw-left-0 tw-top-0 tw-w-full tw-data-[motion=from-start]:tw-animate-in tw-data-[motion=from-start]:tw-slide-in-from-left-6 tw-data-[motion=from-end]:tw-animate-in tw-data-[motion=from-end]:tw-slide-in-from-right-6 tw-data-[motion=to-start]:tw-animate-out tw-data-[motion=to-start]:tw-slide-out-to-left-6 tw-data-[motion=to-end]:tw-animate-out tw-data-[motion=to-end]:tw-slide-out-to-right-6 sm:tw-absolute sm:tw-w-auto",
      className,
    )}
    {...props}
  />
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = NavigationMenuPrimitive.Link;

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className="tw-relative tw-left-1/2 tw-top-full tw-flex tw-translate-x-[-50%] tw-justify-center">
    <NavigationMenuPrimitive.Viewport
      ref={ref}
      className={cn(
        "tw-origin-[top_center] tw-relative tw-mt-2 tw-h-[var(--radix-navigation-menu-viewport-height)] tw-w-full tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-90 sm:tw-w-[var(--radix-navigation-menu-viewport-width)]",
        className,
      )}
      {...props}
    />
  </div>
));
NavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "tw-top-full tw-z-[1] tw-flex tw-h-1.5 tw-items-end tw-justify-center tw-overflow-hidden tw-transition-[width_transform] tw-duration-300 data-[state=visible]:tw-animate-in data-[state=hidden]:tw-animate-out",
      className,
    )}
    {...props}
  >
    <div className="tw-relative tw-top-[60%] tw-h-2 tw-w-2 tw-rotate-45 tw-rounded-tl-sm tw-bg-border tw-shadow-md" />
  </NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.displayName = NavigationMenuPrimitive.Indicator.displayName;

function navigationMenuTriggerStyle(className?: string) {
  return cn(
    "tw-inline-flex tw-h-10 tw-w-max tw-items-center tw-justify-center tw-rounded-md tw-bg-background tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-transition-colors hover:tw-bg-accent hover:tw-text-accent-foreground focus:tw-bg-accent focus:tw-text-accent-foreground focus:tw-outline-none disabled:tw-pointer-events-none disabled:tw-opacity-50",
    className,
  );
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
};
