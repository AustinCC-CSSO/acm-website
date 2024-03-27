'use client'

import * as React from 'react';
import { Menu } from 'lucide-react';
import { ThemeSelector } from './theme-toggle';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { TypographyH4, TypographyLead, TypographyNavLink, TypographyMuted, TypographyH3 } from '@/components/typography/typography';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import useSmoothScroll from '@/lib/useSmoothScroll';


export default function Navbar() {
    const { resolvedTheme, setTheme } = useTheme();
    const [isVisible, setIsVisible] = React.useState(true);
    const [lastScrollY, setLastScrollY] = React.useState(0);

    const smoothScroll = useSmoothScroll();

    const [isMediumScreen, setIsMediumScreen] = React.useState(false);
    const [isSmallScreen, setIsSmallScreen] = React.useState(false);

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
                <div className='flex items-center'>
                    {isMediumScreen && (
                        <Image src={`/logo${resolvedTheme === 'dark' ? 'Dark' : 'Light'}.svg`} alt='ACC ACM Logo' height={64} width={64} className='ml-5 my-3' />
                    )}
                    {isSmallScreen && (
                        <Image src={`/logo${resolvedTheme === 'dark' ? 'Dark' : 'Light'}.svg`} alt='ACC ACM Logo' height={48} width={48} className='ml-5 my-3' />
                    )}
                    <Link href='/' passHref>
                        <div className='p-5 min-w-fit'>
                            <TypographyH3 className='xs:hidden'>ACC</TypographyH3>
                            <TypographyH4 className='hidden xs:block sm:line-clamp-1'>Austin Community College</TypographyH4>
                            <TypographyMuted className='text-xs xs:hidden'>ACM</TypographyMuted>
                            <TypographyMuted className='hidden xs:block'>Association for Computing Machinery</TypographyMuted>
                            <TypographyLead className='hidden md:hidden'>Association for Computing Machinery</TypographyLead>
                            <TypographyMuted className=''>Student Chapter</TypographyMuted>
                        </div></Link>
                </div>
                <div className='flex flex-1 items-center justify-end space-x-2 pr-6'>
                    <div className='hidden sm:flex sm:space-x-4 md:flex md:space-x-6 text-sm'>
                        <nav className='hidden md:flex md:items-center md:gap-6 select'>
                            <Link href='/riverhacks/' passHref ><TypographyNavLink className='md:inline-flex' >RiverHacks 2024</TypographyNavLink></Link>
                            <Link href='#about' onClick={smoothScroll}><TypographyNavLink className='md:inline-flex '>About Us</TypographyNavLink></Link>
                            <Link href='#events' onClick={smoothScroll}><TypographyNavLink className='sm:inline-flex '>Events</TypographyNavLink></Link>
                            <Link href='#resources' onClick={smoothScroll}><TypographyNavLink className='xs:inline-flex '>Resources</TypographyNavLink></Link>
                            <Link href='#contact' onClick={smoothScroll}><TypographyNavLink className='inline-flex'>Contact</TypographyNavLink></Link>
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
                            <nav className='flex flex-col items-end justify-end gap-6 select pt-10 text-3xl'>
                                <Link href='/riverhacks/' passHref ><TypographyH3 className='hover:text-background hover:bg-foreground hover:cover' >RiverHacks 2024</TypographyH3></Link>
                                <Link href='#about' passHref onClick={smoothScroll}><TypographyH3 className='hover:text-background hover:bg-foreground hover:cover'>About Us</TypographyH3></Link>
                                <Link href='#events' passHref onClick={smoothScroll}><TypographyH3 className='hover:text-background hover:bg-foreground hover:cover' >Events</TypographyH3></Link>
                                <Link href='#resources' passHref onClick={smoothScroll}><TypographyH3 className='hover:text-background hover:bg-foreground hover:cover' >Resources</TypographyH3></Link>
                                <Link href='#contact' passHref onClick={smoothScroll}><TypographyH3 className='hover:text-background hover:bg-foreground hover:cover' >Contact</TypographyH3></Link>
                            </nav>
                        </SheetContent>
                    </Sheet >
                </div >
            </div >
        </header >
    );
}


export function NavbarHackathon() {
    const { resolvedTheme, setTheme } = useTheme();
    const [isVisible, setIsVisible] = React.useState(true);
    const [lastScrollY, setLastScrollY] = React.useState(0);
    const [isMediumScreen, setIsMediumScreen] = React.useState(false);
    const [isSmallScreen, setIsSmallScreen] = React.useState(false);
    const smoothScroll = useSmoothScroll();


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
        <header className={`sticky top-0 z-50 w-full border-b border-border/50 backdrop-blur-2xl supports-[backdrop-filter]:bg-inherit dark:backdrop-blur-2xl dark:border-border/50 transition-transform duration-300 md:translate-y-0 ${isMediumScreen || isSmallScreen ? (isVisible ? 'translate-y-0' : '-translate-y-full') : ''
            }`}>
            <div className='container flex xs:flex-row sm:flex-row md:flex-row h-20px items-center justify-between'>
                <div className='flex items-center'>
                    {isMediumScreen && (
                        <Image src={`/logo${resolvedTheme === 'dark' ? 'Dark' : 'Light'}.svg`} alt='ACC ACM Logo' height={64} width={64} className='ml-5 my-3' />
                    )}
                    {isSmallScreen && (
                        <Image src={`/logo${resolvedTheme === 'dark' ? 'Dark' : 'Light'}.svg`} alt='ACC ACM Logo' height={48} width={48} className='ml-5 my-3' />
                    )}
                    <Link href='/riverhacks/' passHref><div className='p-5 min-w-fit '>
                        <TypographyH3 className=''>RiverHacks 2024</TypographyH3>
                        <TypographyMuted className=''>Hosted by the ACC ACM Student Chapter</TypographyMuted>
                    </div></Link>
                </div>
                <div className='flex flex-1 items-center justify-end space-x-2 pr-6'>
                    <div className='hidden sm:flex sm:space-x-4 md:flex md:space-x-6 text-sm'>
                        <nav className='hidden md:flex md:items-center sm:gap-4 md:gap-6 select'>
                            <Link href="#about" passHref onClick={smoothScroll}><TypographyNavLink >About RiverHacks</TypographyNavLink></Link>
                            <Link href="#schedule" passHref onClick={smoothScroll}><TypographyNavLink >Schedule</TypographyNavLink></Link>
                            <Link href="#faq" passHref onClick={smoothScroll}><TypographyNavLink >FAQ</TypographyNavLink></Link>
                            <Link href="#sponsors" passHref onClick={smoothScroll}><TypographyNavLink >Sponsors</TypographyNavLink></Link>

                        </nav >
                    </div >
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
                                <Link href="#about" passHref onClick={smoothScroll}><TypographyH3 className='hover:text-background hover:bg-foreground hover:cover'>About RiverHacks</TypographyH3></Link>
                                <Link href="#schedule" passHref onClick={smoothScroll}><TypographyH3 className='hover:text-background hover:bg-foreground hover:cover'>Schedule</TypographyH3></Link>
                                <Link href="#faq" passHref onClick={smoothScroll}><TypographyH3 className='hover:text-background hover:bg-foreground hover:cover'>FAQ</TypographyH3></Link>
                                <Link href="#sponsors" passHref onClick={smoothScroll}><TypographyH3 className='hover:text-background hover:bg-foreground hover:cover'>Sponsors</TypographyH3></Link>
                            </nav>
                        </SheetContent>
                    </Sheet >
                </div >
            </div >
        </header >
    );
}
