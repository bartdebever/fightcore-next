import { characters } from "@/config/framedata/framedata";
import { Logo } from "../components/icons";
import { Navbar, NavbarBrand, NavbarContent, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/image";
import { Tooltip } from "@nextui-org/tooltip";
import React from "react";
import { characterRoute } from "@/utilities/routes";
import { Socials } from "./socials";

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  return (
    <Navbar className="bg-red-400 dark:bg-background" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
        <NavbarBrand>
          <Link href="/">
            <Logo height={50} width={200} />
          </Link>
          {process.env.IS_BETA ? <p>Beta</p> : <></>}
        </NavbarBrand>
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem>
          <Link color="foreground" className="w-full" href="/" size="lg">
            Characters
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link color="foreground" className="w-full" href="#" size="lg" isDisabled>
            Moves
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link color="foreground" className="w-full" href="#" size="lg" isDisabled>
            Crouch Cancel Calculator
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link color="foreground" className="w-full" href="https://bot.fightcore.gg" size="lg" isExternal>
            Discord Bot
          </Link>
        </NavbarMenuItem>
        <Divider></Divider>
        <div className="w-full p-2 grid grid-cols-4 gap-2">
          {characters.map((character) => (
            <div key={character.normalizedName}>
              <Tooltip content={character.name} delay={1000}>
                <Link href={characterRoute(character)}>
                  <Image
                    loading="lazy"
                    className="grow"
                    alt={character.name}
                    width={40}
                    height={40}
                    src={"/newicons/" + character.name + ".webp"}
                  />
                </Link>
              </Tooltip>
            </div>
          ))}
        </div>
        <div className="grow"></div>
        <Socials className="shrink" />
        <div className="w-full text-center">
          <Link href="/patchnotes">Version 0.4</Link>
        </div>
      </NavbarMenu>
    </Navbar>
  );
};
