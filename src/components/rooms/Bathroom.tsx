import { RoomStats } from '../status/RoomStats';
import { DeviceCard } from '../devices/DeviceCard';
import { LiveIndicator } from '../status/LiveIndicator';
import { SafeImage } from '../common/SafeImage';

const devices = [
  {
    id: 'b1',
    name: 'Smart Mirror',
    type: 'light' as const,
    status: 'on' as const,
    room: 'Bathroom',
    usedSince: '07:00',
    image: '/images/devices/smart-mirror.jpg',
  },
  {
    id: 'b2',
    name: 'Heated Floor',
    type: 'thermostat' as const,
    status: 'on' as const,
    room: 'Bathroom',
    usedSince: '06:30',
    image: '/images/devices/heated-floor.jpg',
  },
  {
    id: 'b3',
    name: 'Towel Warmer',
    type: 'thermostat' as const,
    status: 'off' as const,
    room: 'Bathroom',
    usedSince: '06:45',
    image: '/images/devices/towel-warmer.jpg',
  },
];

export function Bathroom() {
  const handleDeviceStatusChange = (deviceId: string, status: 'on' | 'off') => {
    console.log(`Device ${deviceId} status changed to ${status}`);
  };

  return (
    <div className="space-y-8">
      <div className="aspect-video rounded-3xl overflow-hidden relative bg-gray-900">
        <SafeImage
          src="/images/rooms/bathroom.jpg"
          alt="Bathroom"
          fill
          fallbackSrc="/images/logo.png"
          className="object-cover opacity-90"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 900px"
        />
        
        <LiveIndicator />
        
        <RoomStats
          temperature={24}
          humidity={65}
          power={300}
          efficiency={80}
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
