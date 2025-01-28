'use client'

import { useEffect, useState } from 'react';
import SettingsSidebar from '../../item-sidebar';
import AccountPanel from './account-panel'
import { getItemById } from '../../../services/inventoryService';
import { ItemInterface } from '../../../types';
import { useRouter } from 'next/navigation'
import { useAlert } from '@/app/contexts/alertContext';
import NotificationsPanel from '@/app/(default)/settings/notifications/notifications-panel';
export default function AccountSettings({ params }: { params: { id: string } }) {
    const [itemData, setItemData] = useState<ItemInterface | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { alert } = useAlert();

    useEffect(() => {
    const fetchData = async () => {
        try {
        const data = await getItemById(params.id);
        setItemData(data);
        } catch (err) {
        alert({ text: 'Failed to load fleet data', type: 'error' });
        router.push('/inventory/items');
        } finally {
        setLoading(false);
        }
    };

    fetchData();
    }, [params.id]);

return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">

    {/* Page header */}
    <div className="mb-8">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Accounts</h1>
    </div>

    {/* Content */}
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl mb-8">
        <div className="flex flex-col md:flex-row md:-mr-px">

        <SettingsSidebar id={params.id}/>
        <AccountPanel itemId = {params.id} itemData={itemData}/>
        </div>
    </div>

    </div>
)
}