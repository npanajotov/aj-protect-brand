import {
    IconBoxSeam,
    IconChecklist,
    IconLayoutDashboard,
    IconRouteAltLeft,
    IconSettings,
    IconTruck,
} from '@tabler/icons-react'

export interface NavLink {
    title: string
    label?: string
    href: string
    icon: JSX.Element
}

export interface SideLink extends NavLink {
    sub?: NavLink[]
}

export const sidelinks: SideLink[] = [
    {
        title: 'sidebar.dashboard',
        label: '',
        href: '/',
        icon: <IconLayoutDashboard size={18}/>,
    },
    {
        title: 'sidebar.tasks',
        label: '3',
        href: '/tasks',
        icon: <IconChecklist size={18}/>,
    },
    {
        title: 'Cases',
        label: '10',
        href: '/requests',
        icon: <IconRouteAltLeft size={18}/>,
        sub: [
            {
                title: 'Open',
                label: '9',
                href: '/x',
                icon: <IconTruck size={18}/>,
            },
            {
                title: 'Resolved',
                label: '1',
                href: '/x',
                icon: <IconBoxSeam size={18}/>,
            },
        ],
    },
    {
        title: 'sidebar.settings',
        label: '',
        href: '/settings',
        icon: <IconSettings size={18}/>,
    },
]
