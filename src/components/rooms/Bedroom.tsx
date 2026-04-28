import { RoomStats } from '../status/RoomStats';
import { DeviceCard } from '../devices/DeviceCard';
import { LiveIndicator } from '../status/LiveIndicator';
import { SafeImage } from '../common/SafeImage';

const devices = [
  {
    id: 'br1',
    name: 'Bedside Lamp',
    type: 'light' as const,
    status: 'off' as const,
    room: 'Bedroom',
    usedSince: '22:00',
    image: '/images/devices/bedside-lamp.jpg',
  },
  {
    id: 'br2',
    name: 'Air Purifier',
    type: 'humidifier' as const,
    status: 'on' as const,
    room: 'Bedroom',
    usedSince: '20:00',
    image: '/images/devices/air-purifier.jpg',
  },
  {
    id: 'br3',
    name: 'Smart Curtains',
    type: 'light' as const,
    status: 'on' as const,
    room: 'Bedroom',
    usedSince: '06:00',
    image: '/images/devices/smart-curtains.jpg',
  },
];

export function Bedroom() {
  const handleDeviceStatusChange = (deviceId: string, status: 'on' | 'off') => {
    console.log(`Device ${deviceId} status changed to ${status}`);
  };

  return (
    <div className="space-y-8">
      <div className="aspect-video rounded-3xl overflow-hidden relative bg-gray-900">
        <SafeImage
          src="/images/rooms/bedroom.jpg"
          alt="Bedroom"
          fill
          fallbackSrc="/images/logo.png"
          className="object-cover opacity-90"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 900px"
        />
        
        <LiveIndicator />
        
        <RoomStats
          temperature={21}
          humidity={40}
          power={150}
          efficiency={90}
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
