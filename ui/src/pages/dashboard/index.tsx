import {Layout} from '@/components/custom/layout'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {Search} from '@/components/search'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import ThemeSwitch from '@/components/theme-switch'
import {UserNav} from '@/components/user-nav'
import {RecentSales} from './components/recent-sales'
import {Overview} from './components/overview'
import {useTranslations} from 'use-intl'
import LanguageSwitch from '@/components/language-switch'

export default function Dashboard() {
    const t = useTranslations('dashboard')
    return (
        <Layout>
            {/* ===== Top Heading ===== */}
            <Layout.Header>
                <div>
                    <div className='mb-2 flex items-center justify-between space-y-2'>
                        <h1 className='text-2xl font-bold tracking-tight'>
                            {t('dashboard')}
                        </h1>
                    </div>
                </div>
                <div className='ml-auto flex items-center space-x-4'>
                    <Search/>
                    <ThemeSwitch/>
                    <LanguageSwitch/>
                    <UserNav/>
                </div>
            </Layout.Header>

            {/* ===== Main ===== */}
            <Layout.Body>

                <Tabs
                    orientation='vertical'
                    defaultValue='overview'
                    className='space-y-4'
                >
                    <div className='w-full overflow-x-auto pb-2'>
                        <TabsList>
                            <TabsTrigger value='overview'>{t('overview')}</TabsTrigger>
                            <TabsTrigger value='analytics'>{t('analytics')}</TabsTrigger>
                            <TabsTrigger value='reports'>{t('reports')}</TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value='analytics' className='space-y-4'>
                        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                            <Card>
                                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                    <CardTitle className='text-sm font-medium'>
                                       Total saved
                                    </CardTitle>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        stroke='currentColor'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        className='h-4 w-4 text-muted-foreground'
                                    >
                                        <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'/>
                                    </svg>
                                </CardHeader>
                                <CardContent>
                                    <div className='text-2xl font-bold'>$10,505.90</div>
                                    <p className='text-xs text-muted-foreground'>
                                        {t('from_last_month', {amount: '+5.1%'})}
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                    <CardTitle className='text-sm font-medium'>
                                        Total cases
                                    </CardTitle>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        stroke='currentColor'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        className='h-4 w-4 text-muted-foreground'
                                    >
                                        <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2'/>
                                        <circle cx='9' cy='7' r='4'/>
                                        <path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75'/>
                                    </svg>
                                </CardHeader>
                                <CardContent>
                                    <div className='text-2xl font-bold'>450</div>
                                    <p className='text-xs text-muted-foreground'>
                                        {t('from_last_month', {amount: '+10.12%'})}
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                    <CardTitle className='text-sm font-medium'>
                                       Total reduced ads
                                    </CardTitle>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        stroke='currentColor'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        className='h-4 w-4 text-muted-foreground'
                                    >
                                        <rect width='20' height='14' x='2' y='5' rx='2'/>
                                        <path d='M2 10h20'/>
                                    </svg>
                                </CardHeader>
                                <CardContent>
                                    <div className='text-2xl font-bold'>+45</div>
                                    <p className='text-xs text-muted-foreground'>
                                        {t('from_last_month', {amount: '+10'})}
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                    <CardTitle className='text-sm font-medium'>
                                       Open cases
                                    </CardTitle>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        stroke='currentColor'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        className='h-4 w-4 text-muted-foreground'
                                    >
                                        <path d='M22 12h-4l-3 9L9 3l-3 9H2'/>
                                    </svg>
                                </CardHeader>
                                <CardContent>
                                    <div className='text-2xl font-bold'>201</div>
                                    <p className='text-xs text-muted-foreground'>
                                        {t('since_last_hour', {amount: '+2'})}
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                        <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
                            <Card className='col-span-1 lg:col-span-4'>
                                <CardHeader>
                                    <CardTitle>{t('overview')}</CardTitle>
                                </CardHeader>
                                <CardContent className='pl-2'>
                                    <Overview/>
                                </CardContent>
                            </Card>
                            <Card className='col-span-1 lg:col-span-3'>
                                <CardHeader>
                                    <CardTitle>Recent agents</CardTitle>
                                    <CardDescription>
                                       You decreased fake products this month by 10.15%
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <RecentSales/>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </Layout.Body>
        </Layout>
    )
}