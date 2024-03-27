'use client';

import * as React from 'react';
import Footer from '@/components/footer';
import Navbar, { NavbarHackathon } from '@/components/navbar';
import {
	TypographyH1,
	TypographyH2,
	TypographyH3,
	TypographyMuted,
	TypographyP,
	TypographyNavLink,
} from '@/components/typography/typography';
import { Separator } from '@/components/ui/separator';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import RiverhacksNavbar from '@/components/navbar';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function RiverhacksLanding() {


	return (
		<div className="relative flex min-h-screen flex-col bg-gradient-to-b from-indigo-200 to-orange-500 dark:from-purple-950 dark:to-orange-300">
			<NavbarHackathon />
			<main
				className="container flex-1 px-5"
				style={{ height: 'calc(100vh)-80px' }}>
				<div className="container relative">
					<div className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
						<section
							className="h-screen text-center"
							id="hero">
							<div className="flex flex-col items-center justify-center px-5 space-y-10 md:mx-16 md:flex-row md:space-x-20 md:space-y-0">
								<div className="flex flex-col space-y-4 md:w-1/2">
									<Badge>
										<p>
											🎉 We&apos;ve changed names! -&gt;</p>
									</Badge>
									<TypographyH1>Riverhacks 2024</TypographyH1>
									<TypographyMuted className='text-left'>
										24 Hours<br />
										ACC Rio Grande Campus<br />
										April 13 - 14, 2024
									</TypographyMuted>
									<Link href="/riverhacks/register"><Button variant="outline">Register Now</Button></Link>
								</div>
								<div className="md:w-1/2">
									{/* <Image
										src={`/logo${resolvedTheme === 'dark' ? 'Dark' : 'Light'
											}.svg`}
										alt="Riverhacks"
										width={512}
										height={512}
										className='hidden md:inline'
									/> */}
								</div>
							</div>
						</section>

						<Separator className="my-8" />

						<section
							id="about"
							className="min-h-screen container px-5">
							<TypographyH2>About Riverhacks</TypographyH2>
							<TypographyP>
								Riverhacks is an annual hackathon event hosted by ACM at ACC. It
								brings together students, developers, and innovators for a
								weekend of coding, collaboration, and creativity.
							</TypographyP>
						</section>

						<Separator className="my-8" />

						<section
							id="schedule"
							className="min-h-screen px-5">
							<TypographyH3>Schedule</TypographyH3>
							<div className="columns-2">
								<TypographyH2 className='break-after-column'>Day 1</TypographyH2>
								<TypographyP></TypographyP>
								<TypographyH2>Day 2</TypographyH2>
							</div>
						</section>

						<Separator className="my-8" />

						<section
							id="faq"
							className="min-h-screen px-5">
							<TypographyH2>FAQ</TypographyH2>
							{/* Add frequently asked questions */}
						</section>

						<Separator className="my-8" />

						<section
							id="sponsors"
							className="min-h-screen px-5">
							<TypographyH2>Sponsors</TypographyH2>
							{/* Add sponsor logos or details */}
						</section>
					</div>
				</div >
			</main >
			<Footer />
		</div >
	);
}

