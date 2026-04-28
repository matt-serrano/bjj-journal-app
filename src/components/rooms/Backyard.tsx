import { RoomStats } from '../status/RoomStats';
import { DeviceCard } from '../devices/DeviceCard';
import { LiveIndicator } from '../status/LiveIndicator';
import { SafeImage } from '../common/SafeImage';

const devices = [
  {
    id: 'by1',
    name: 'Garden Lights',
    type: 'light' as const,
    status: 'on' as const,
    room: 'Backyard',
    usedSince: '19:30',
    image: '/images/devices/garden-lights.jpg',
  },
  {
    id: 'by2',
    name: 'Irrigation System',
    type: 'humidifier' as const,
    status: 'off' as const,
    room: 'Backyard',
    usedSince: '06:00',
    image: '/images/devices/irrigation-system.jpg',
  },
  {
    id: 'by3',
    name: 'Security Camera',
    type: 'camera' as const,
    status: 'on' as const,
    room: 'Backyard',
    usedSince: '00:00',
    image: '/images/devices/security-camera.jpg',
  },
];

export function Backyard() {
  const handleDeviceStatusChange = (deviceId: string, status: 'on' | 'off') => {
    console.log(`Device ${deviceId} status changed to ${status}`);
  };

  return (
    <div className="space-y-8">
      <div className="aspect-video rounded-3xl overflow-hidden relative bg-gray-900">
        <SafeImage
          src="/images/rooms/backyard.jpg"
          alt="Backyard"
          fill
          fallbackSrc="/images/logo.png"
          className="object-cover opacity-90"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 900px"
        />
        
        <LiveIndicator />
        
        <RoomStats
          temperature={18}
          humidity={55}
          power={200}
          efficiency={85}
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
