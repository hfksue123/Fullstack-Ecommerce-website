import { Facebook, Github, Linkedin, Youtube } from "lucide-react";
import React from "react";
import {
    TooltipProvider,
    TooltipTrigger,
    Tooltip,
    TooltipContent,
} from "./ui/tooltip";
import { cn } from "@/lib/utils";

interface Props {
    className?: string;
    iconClassName?: string;
    tooltipClassName?: string;
}

const socialLink = [
    {
        title: "Youtube",
        href: "/",
        icon: Youtube,
    },
    {
        title: "Github",
        href: "/",
        icon: Github,
    },
    {
        title: "Linkedin",
        href: "/",
        icon: Linkedin,
    },
    {
        title: "Facebook",
        href: "/",
        icon: Facebook,
    },
];

const SocialMedia = ({
    className,
    iconClassName = "w-5 h-5",
    tooltipClassName,
}: Props) => {
    return (
        <TooltipProvider>
            <div className={cn("flex items-center gap-5", className)}>
                {socialLink.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Tooltip key={item.title}>
                            <TooltipTrigger asChild>
                                <a
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={item.title}
                                    className={cn(
                                        "w-10 h-10 flex items-center justify-center rounded-full border border-transparent hover:text-white hover:border-shop-light-green transition-colors",
                                        iconClassName
                                    )}
                                >
                                    <Icon className={iconClassName} />
                                </a>

                            </TooltipTrigger>
                            <TooltipContent className={tooltipClassName}>
                                {item.title}
                            </TooltipContent>
                        </Tooltip>
                    );
                })}
            </div>
        </TooltipProvider>
    );
};

export default SocialMedia;
