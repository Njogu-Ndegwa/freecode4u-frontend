
'use client'

import { useEffect, useState } from 'react';
import FormLibrary from '../../add/page';
import { getItemById } from '../../../services/inventoryService';
import { useAlert } from '@/app/contexts/alertContext';
import { ItemInterface } from '../../../types';
import { useRouter } from 'next/navigation'

export default function EditItemPage({ params }: { params: { id: string } }) {
  const [itemData, setItemData] = useState<ItemInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const { alert } = useAlert();
  const router = useRouter();
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

  if (loading) return <div>Loading...</div>;

  return <FormLibrary editData={itemData} />;
}