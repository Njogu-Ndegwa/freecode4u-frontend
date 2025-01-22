
'use client'

import { useEffect, useState } from 'react';
import FormLibrary from '../../add/page';
import { getManufacturerById } from '../../../services/inventoryService';
import { useAlert } from '@/app/contexts/alertContext';
import { ManufacturerInterface } from '../../../types';
import { useRouter } from 'next/navigation'
export default function EditManufacturerPage({ params }: { params: { id: string } }) {
  const [manufacturerData, setManufacturerData] = useState<ManufacturerInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const { alert } = useAlert();
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getManufacturerById(params.id);
        setManufacturerData(data);
      } catch (err) {
        alert({ text: 'Failed to load manufacturer data', type: 'error' });
        router.push('/inventory/manufacturers');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  if (loading) return <div>Loading...</div>;

  return <FormLibrary editData={manufacturerData} />;
}