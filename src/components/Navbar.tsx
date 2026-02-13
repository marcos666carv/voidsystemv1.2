import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
    variant?: "public" | "app" | "admin";
}

export function Navbar({ variant = "public" }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const links = {
        public: [
            { href: "/", label: "Home" },
            { href: "/void-club", label: "Void Club" },
            { href: "/about", label: "About" },
        ],
        app: [
            { href: "/app", label: "Dashboard" },
            { href: "/app/schedule", label: "Schedule" },
            { href: "/app/history", label: "History" },
        ],
        admin: [
            { href: "/admin", label: "Dashboard" },
            { href: "/admin/clients", label: "Clients" },
            { href: "/admin/controls", label: "Controls" },
        ],
    };

    const currentLinks = links[variant];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <Link to="/" className="text-xl font-bold tracking-tighter text-foreground">
                            VOID<span className="text-primary">.SYSTEM</span>
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {currentLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    to={link.href}
                                    className={cn(
                                        "px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
                                        location.pathname === link.href
                                            ? "text-primary"
                                            : "text-muted-foreground"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="hidden md:block">
                        {variant === "public" ? (
                            <div className="flex items-center space-x-4">
                                <Link to="/login">
                                    <Button variant="ghost">Sign In</Button>
                                </Link>
                                <Link to="/register">
                                    <Button>Get Started</Button>
                                </Link>
                            </div>
                        ) : variant === "app" ? (
                            <div className="flex items-center space-x-4">
                                <Button variant="ghost">Profile</Button>
                                <Button variant="outline">Sign Out</Button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-muted-foreground">Admin Mode</span>
                                <Button variant="outline">Exit</Button>
                            </div>
                        )}
                    </div>

                    <div className="-mr-2 flex md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden">
                    <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                        {currentLinks.map((link) => (
                            <Link
                                key={link.href}
                                to={link.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "block rounded-md px-3 py-2 text-base font-medium",
                                    location.pathname === link.href
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="pt-4 border-t border-border flex flex-col gap-2">
                            {variant === "public" ? (
                                <>
                                    <Link to="/login" onClick={() => setIsOpen(false)}>
                                        <Button variant="ghost" className="w-full justify-start">Sign In</Button>
                                    </Link>
                                    <Link to="/register" onClick={() => setIsOpen(false)}>
                                        <Button className="w-full justify-start">Get Started</Button>
                                    </Link>
                                </>
                            ) : (
                                <Button variant="outline" className="w-full justify-start">Sign Out</Button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
