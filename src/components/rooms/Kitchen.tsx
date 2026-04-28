import { RoomStats } from '../status/RoomStats';
import { DeviceCard } from '../devices/DeviceCard';
import { LiveIndicator } from '../status/LiveIndicator';
import { SafeImage } from '../common/SafeImage';

const devices = [
  {
    id: 'k1',
    name: 'Smart Oven',
    type: 'thermostat' as const,
    status: 'on' as const,
    room: 'Kitchen',
    usedSince: '07:30',
    image: '/images/devices/smart-oven.jpg',
  },
  {
    id: 'k2',
    name: 'Coffee Maker',
    type: 'thermostat' as const,
    status: 'off' as const,
    room: 'Kitchen',
    usedSince: '06:15',
    image: '/images/devices/coffee-maker.jpg',
  },
  {
    id: 'k3',
    name: 'Kitchen Lights',
    type: 'light' as const,
    status: 'on' as const,
    room: 'Kitchen',
    usedSince: '05:45',
    image: '/images/devices/kitchen-lights.jpg',
  },
];

export function Kitchen() {
  const handleDeviceStatusChange = (deviceId: string, status: 'on' | 'off') => {
    console.log(`Device ${deviceId} status changed to ${status}`);
  };

  return (
    <div className="space-y-8">
      <div className="aspect-video rounded-3xl overflow-hidden relative bg-gray-900">
        <SafeImage
          src="/images/rooms/kitchen.jpg"
          alt="Kitchen"
          fill
          fallbackSrc="/images/logo.png"
          className="object-cover opacity-90"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 900px"
        />
        
        <LiveIndicator />
        
        <RoomStats
          temperature={23}
          humidity={45}
          power={450}
          efficiency={75}
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {devices.map(device => (
          <DeviceCard 
            key={device.id} 
            device={device}
            onStatusChange={handleDeviceStatusChange}
          />
        ))}
      </div>
    </div>
  );
}
