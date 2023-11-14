"use client";

import { Globe, MenuIcon } from "lucide-react";
import * as Popover from "@radix-ui/react-popover";
import { Link } from "./link";

export function Navigation() {
  return (
    <nav>
      <MobileMenu />
      <DesktopMenu />
    </nav>
  );
}

function MobileMenu() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="block md:hidden" aria-label="Open navigation">
          <MenuIcon />
        </button>
      </Popover.Trigger>
      <Popover.Anchor />
      <Popover.Portal>
        <Popover.Content className="z-20 m-2 grid gap-2 border bg-background p-4">
          <Link href="/blog">Blog</Link>
          <Link href="/about">About</Link>
          <div className="my-1 border-t" />
          <small className="text-muted-foreground">Languages</small>
          <Link href="/ja">JA</Link>
          <Link href="/en">EN</Link>
          <Link href="/de">DE</Link>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

function DesktopMenu() {
  return (
    <div className="hidden gap-4 md:flex">
      <Link href="/blog">Blog</Link>
      <Link href="/about">About</Link>
      <Popover.Root>
        <Popover.Trigger asChild>
          <button aria-label="Switch language">
            <Globe />
          </button>
        </Popover.Trigger>
        <Popover.Anchor />
        <Popover.Portal>
          <Popover.Content className="z-20 m-2 hidden gap-2 border bg-background p-4 md:grid">
            <Link href="/ja">JA</Link>
            <Link href="/en">EN</Link>
            <Link href="/de">DE</Link>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
