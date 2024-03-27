import * as React from 'react';
import { Button } from '@/components/ui/button';
import { TypographyH1, TypographyP } from '@/components/typography/typography';
import { Input } from '@/components/ui/input';
import RegistrationForm from '@/components/form';
import { useTheme } from 'next-themes';
import { NavbarHackathon } from '@/components/navbar';
import { HackerDashboard } from '@/components/hacker-dashboard';



export default function RegisterPage() {




	return (
		<div className="relative flex min-h-screen flex-col bg-gradient-to-b from-indigo-200 to-orange-500 dark:from-purple-950 dark:to-orange-300">
			<NavbarHackathon />
			<main className="container flex-1 px-5"
				style={{ height: 'calc(100vh)-80px' }}>
				<div className='container relative'>
					<HackerDashboard />

				</div>
			</main>
		</div>

	);
}
