
'use client'

import { useEffect, useState } from 'react';
import FormLibrary from '../../add/page';
import { getFleetById } from '../../../services/inventoryService';
import { useAlert } from '@/app/contexts/alertContext';
import { FleetInterface } from '../../../types';
import { useRouter } from 'next/navigation'
export default function EditFleetPage({ params }: { params: { id: string } }) {
  const [fleetData, setFleetData] = useState<FleetInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const { alert } = useAlert();
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFleetById(params.id);
        setFleetData(data);
      } catch (err) {
        alert({ text: 'Failed to load fleet data', type: 'error' });
        router.push('/inventory/fleets');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  if (loading) return <div>Loading...</div>;

  return <FormLibrary editData={fleetData} />;
}