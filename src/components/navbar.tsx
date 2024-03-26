'use client'

import * as React from 'react';
import { Menu } from 'lucide-react';
import { ThemeSelector } from './theme-toggle';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { TypographyH4, TypographyLead, TypographyNavLink, TypographyMuted } from '@/components/typography/typography';
import { Button } from '@/components/ui/button';
import Link from 'next/link';



export default function Navbar() {
    const { resolvedTheme, setTheme } = useTheme();
    const [isVisible, setIsVisible] = React.useState(true);
    const [lastScrollY, setLastScrollY] = React.useState(0);
    const [isMediumScreen, setIsMediumScreen] = React.useState(false);
    const [isSmallScreen, setIsSmallScreen] = React.useState(false);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault(); //prevent default anchor link behavior
        const href = e.currentTarget.getAttribute('href'); // Get the href attribute of the clicked element

        if (href !== null) {
            const element = document.querySelector(href) as HTMLElement; // Get the target element by selecting the href attribute
            if (element !== null) {
                //get height of navbar
                const navbarHeight = document.querySelector('header')?.getBoundingClientRect().height || 0;
                const offsetTop = element.offsetTop - navbarHeight; // Get the top offset of the target element and subtract the height of the navbar
                const sheet = document.querySelector('[data-state="open"]') as HTMLElement;
                if (sheet !== null) {
                    sheet.click();
                }
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    };
    React.useEffect(() => {
        const handleResize = () => {
            setIsMediumScreen(window.innerWidth >= 768);
            setIsSmallScreen(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    React.useEffect(() => {
        if (resolvedTheme === 'system') {
            setTheme(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        }
    }, [resolvedTheme, setTheme]);

    React.useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY) {
                // Scrolling down
                setIsVisible(false);
            } else {
                // Scrolling up
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);


    return (
        <header className={`sticky top-0 z-50 w-full border-b border-border/50 backdrop-blur-2xl supports-[backdrop-filter]:bg-inherit dark:backdrop-blur-2xl dark:border-border/50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'
            }`}>
            <div className='container flex xs:flex-row sm:flex-row md:flex-row h-20px items-center justify-between'>
                <div className='flex items-center min-w-fit'>
                    {isMediumScreen && (
                        <Image src={`/logo${resolvedTheme === 'dark' ? 'Dark' : 'Light'}.svg`} alt='ACC ACM Logo' height={64} width={64} className='ml-5 my-3' />
                    )}
                    {isSmallScreen && (
                        <Image src={`/logo${resolvedTheme === 'dark' ? 'Dark' : 'Light'}.svg`} alt='ACC ACM Logo' height={48} width={48} className='ml-5 my-3' />
                    )}
                    <Link href='/' passHref>
                        <div className='m-5 min-w-fit'>
                            <TypographyH4 className=' sm:inline sm:line-clamp-1'>Austin Community College</TypographyH4>
                            <TypographyLead className='hidden md:line-clamp-1 md:inline'>Association for Computing Machinery</TypographyLead>
                            <TypographyMuted className='md:hidden'>Association for Computing Machinery</TypographyMuted>
                            <TypographyMuted className='line-clamp-1'>Student Chapter</TypographyMuted>
                        </div></Link>
                </div>
                <div className='flex flex-1 items-center justify-end space-x-2 pr-6'>
                    <div className='hidden sm:flex sm:space-x-4 md:flex md:space-x-6 text-sm'>
                        <nav className='hidden md:flex md:items-center sm:gap-4 md:gap-6 select'>
                            <Link href="/riverhacks" passHref ><TypographyNavLink >RiverHacks 2024</TypographyNavLink></Link>
                            <Link href="#about" passHref onClick={handleClick}><TypographyNavLink >About Us</TypographyNavLink></Link>
                            <Link href="#pastevents" passHref onClick={handleClick}><TypographyNavLink >Past Events</TypographyNavLink></Link>
                            <Link href="#resources" passHref onClick={handleClick}><TypographyNavLink >Resources</TypographyNavLink></Link>
                            <Link href="#contact" passHref onClick={handleClick}><TypographyNavLink >Contact</TypographyNavLink></Link>
                        </nav>
                    </div>
                    <ThemeSelector />
                    <Sheet>
                        <SheetTrigger className='flex items-center space-x-6 ml-6 md:hidden' asChild>
                            <Button variant='outline' size='icon' className='shrink-0 my-3 bg-card/20 backdrop-blur-sm'>
                                <Menu className='w-6 h-12 ' />
                                <span className='sr-only'>Open navigation</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent className='md:hidden'>
                            <nav className='flex flex-col items-end justify-end gap-6 select pt-10'>
                                <Link href='/riverhacks' passHref><TypographyH4 className='hover:text-background hover:bg-foreground hover:cover'>RiverHacks 2024</TypographyH4></Link>
                                <Link href='#about' passHref onClick={handleClick}><TypographyH4 className='hover:text-background hover:bg-foreground hover:cover'>About Us</TypographyH4></Link>
                                <Link href='#pastevents' passHref onClick={handleClick}><TypographyH4 className='hover:text-background hover:bg-foreground'>Past Events</TypographyH4></Link>
                                <Link href='#resources' passHref onClick={handleClick}><TypographyH4 className='hover:text-background hover:bg-foreground'>Resources</TypographyH4></Link>
                                <Link href='#contact' passHref onClick={handleClick}><TypographyH4 className='hover:text-background hover:bg-foreground'>Contact</TypographyH4></Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header >
    );
}


export function NavbarHackathon() {
    const { resolvedTheme, setTheme } = useTheme();
    const [isVisible, setIsVisible] = React.useState(true);
    const [lastScrollY, setLastScrollY] = React.useState(0);
    const [isMediumScreen, setIsMediumScreen] = React.useState(false);
    const [isSmallScreen, setIsSmallScreen] = React.useState(false);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault(); //prevent default anchor link behavior
        const href = e.currentTarget.getAttribute('href'); // Get the href attribute of the clicked element

        if (href !== null) {
            const element = document.querySelector(href) as HTMLElement; // Get the target element by selecting the href attribute
            if (element !== null) {
                const sheet = document.querySelector('[data-state="open"]') as HTMLElement;
                if (sheet !== null) {
                    sheet.click();
                }

                if (element !== null) {
                    const offsetTop = element.getBoundingClientRect().top + window.scrollY;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        }
    };

    React.useEffect(() => {
        const handleResize = () => {
            setIsMediumScreen(window.innerWidth >= 768);
            setIsSmallScreen(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    React.useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY) {
                // Scrolling down
                setIsVisible(false);
            } else {
                // Scrolling up
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    React.useEffect(() => {
        if (resolvedTheme === 'system') {
            setTheme(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        }
    }, [resolvedTheme, setTheme]);

    return (
        <header className={`sticky top-0 z-50 w-full border-b border-border/50 backdrop-blur-2xl supports-[backdrop-filter]:bg-inherit dark:backdrop-blur-2xl dark:border-border/50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'
            }`}>
            <div className='container flex xs:flex-row sm:flex-row md:flex-row h-20px items-center justify-between'>
                <div className='flex items-center'>
                    {isMediumScreen && (
                        <Image src={`/logo${resolvedTheme === 'dark' ? 'Dark' : 'Light'}.svg`} alt='ACC ACM Logo' height={64} width={64} className='ml-5 my-3' />
                    )}
                    {isSmallScreen && (
                        <Image src={`/logo${resolvedTheme === 'dark' ? 'Dark' : 'Light'}.svg`} alt='ACC ACM Logo' height={48} width={48} className='ml-5 my-3' />
                    )}
                    <Link href='/' passHref><div className='m-5 min-w-fit'>
                        <TypographyH4 className='sm:inline sm:line-clamp-1'>Austin Community College</TypographyH4>
                        <TypographyLead className='hidden md:line-clamp-1 md:inline'>Association for Computing Machinery</TypographyLead>
                        <TypographyMuted className='md:hidden'>Association for Computing Machinery</TypographyMuted>
                        <TypographyMuted className='line-clamp-1'>Student Chapter</TypographyMuted>
                    </div></Link>
                </div>
                <div className='flex flex-1 items-center justify-end space-x-2 pr-6'>
                    <div className='hidden sm:flex sm:space-x-4 md:flex md:space-x-6 text-sm'>
                        <nav className='hidden md:flex md:items-center sm:gap-4 md:gap-6 select'>
                            <Link href="#about" passHref onClick={handleClick}><TypographyNavLink >RiverHacks</TypographyNavLink></Link>
                            <Link href="#schedule" passHref onClick={handleClick}><TypographyNavLink >Schedule</TypographyNavLink></Link>
                            <Link href="#faq" passHref onClick={handleClick}><TypographyNavLink >FAQ</TypographyNavLink></Link>
                            <Link href="#sponsors" passHref onClick={handleClick}><TypographyNavLink >Sponsors</TypographyNavLink></Link>
                        </nav>
                    </div>
                    <ThemeSelector />
                    <Sheet>
                        <SheetTrigger className='flex items-center space-x-6 ml-6 md:hidden' asChild>
                            <Button variant='outline' size='icon' className='shrink-0 my-3 bg-card/20 backdrop-blur-sm'>
                                <Menu className='w-6 h-12 ' />
                                <span className='sr-only'>Open navigation</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent className='md:hidden'>
                            <nav className='flex flex-col items-end justify-end gap-6 select pt-10 hover:bg-text-foreground'>
                                <Link href="#about" passHref onClick={handleClick}><TypographyH4 className='hover:text-background hover:bg-foreground hover:cover'>About RiverHacks</TypographyH4></Link>
                                <Link href="#schedule" passHref onClick={handleClick}><TypographyH4 className='hover:text-background hover:bg-foreground hover:cover'>Schedule</TypographyH4></Link>
                                <Link href="#faq" passHref onClick={handleClick}><TypographyH4 className='hover:text-background hover:bg-foreground hover:cover'>FAQ</TypographyH4></Link>
                                <Link href="#sponsors" passHref onClick={handleClick}><TypographyH4 className='hover:text-background hover:bg-foreground hover:cover'>Sponsors</TypographyH4></Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header >
    );
}
