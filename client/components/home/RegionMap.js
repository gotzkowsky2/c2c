import { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';

function Recenter({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, 6);
  }, [center, map]);
  return null;
}

const germanCities = [
  { nameKo: '베를린', name: 'Berlin', lat: 52.52, lng: 13.405 },
  { nameKo: '뮌헨', name: 'Munich', lat: 48.137, lng: 11.575 },
  { nameKo: '프랑크푸르트', name: 'Frankfurt', lat: 50.1109, lng: 8.6821 },
  { nameKo: '함부르크', name: 'Hamburg', lat: 53.5511, lng: 9.9937 },
  { nameKo: '쾰른', name: 'Cologne', lat: 50.9375, lng: 6.9603 },
  { nameKo: '뒤셀도르프', name: 'Dusseldorf', lat: 51.2277, lng: 6.7735 }
];

export default function RegionMap() {
  const [center, setCenter] = useState([51.1657, 10.4515]); // Germany center
  const [geoAllowed, setGeoAllowed] = useState(false);

  useEffect(() => {
    // Leaflet 기본 아이콘 경로 설정 (Next 환경에서 아이콘 누락 방지)
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
    });

    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      setCenter([pos.coords.latitude, pos.coords.longitude]);
      setGeoAllowed(true);
    });
  }, []);

  const cityMarkers = useMemo(() => germanCities, []);

  return (
    <div className="card p-0 overflow-hidden">
      <div className="flex items-center justify-between p-4">
        <div>
          <div className="text-xl font-semibold">지역별로 찾아보세요</div>
          <div className="text-slate-600 text-sm">독일 지도에서 원하는 도시를 선택하거나, 내 위치를 기반으로 주변 전문가를 추천받으세요.</div>
        </div>
        <button className="btn" onClick={() => {
          if (!navigator.geolocation) return alert('이 브라우저는 위치 정보를 지원하지 않습니다.');
          navigator.geolocation.getCurrentPosition((pos) => setCenter([pos.coords.latitude, pos.coords.longitude]));
        }}>내 위치로 이동</button>
      </div>
      <MapContainer center={center} zoom={6} style={{ height: 420, width: '100%' }} scrollWheelZoom>
        <Recenter center={center} />
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cityMarkers.map((c) => (
          <Marker key={c.name} position={[c.lat, c.lng]} eventHandlers={{
            click: () => {
              window.location.href = `/search?city=${encodeURIComponent(c.name)}`;
            }
          }} />
        ))}
      </MapContainer>
    </div>
  );
}


