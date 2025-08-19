/* eslint-disable no-console */
require('dotenv').config();
const mongoose = require('mongoose');
const { connectToDatabase } = require('../config/db');
const User = require('../models/userModel');
const Service = require('../models/serviceModel');

async function seed() {
  await connectToDatabase();

  console.log('Seeding database...');

  // Clean minimal
  await Service.deleteMany({});
  // Keep users if any; create a few providers if none
  let providers = await User.find({ role: 'provider' }).limit(3);
  if (providers.length < 3) {
    const missing = 3 - providers.length;
    const base = [
      { firstName: 'Erin', lastName: 'Kim', email: `erin.provider@example.com`, password: 'Password123!', role: 'provider' },
      { firstName: 'Hans', lastName: 'Park', email: `hans.provider@example.com`, password: 'Password123!', role: 'provider' },
      { firstName: 'Mina', lastName: 'Lee', email: `mina.provider@example.com`, password: 'Password123!', role: 'provider' }
    ];
    const toCreate = base.slice(0, missing);
    const created = await User.insertMany(toCreate);
    providers = [...providers, ...created];
  }

  const cities = [
    { city: 'Berlin', postalCode: '10115', lat: 52.520008, lng: 13.404954 },
    { city: 'Munich', postalCode: '80331', lat: 48.137154, lng: 11.576124 },
    { city: 'Frankfurt', postalCode: '60311', lat: 50.110924, lng: 8.682127 },
    { city: 'Hamburg', postalCode: '20095', lat: 53.551086, lng: 9.993682 },
    { city: 'Cologne', postalCode: '50667', lat: 50.937531, lng: 6.960279 },
    { city: 'Dusseldorf', postalCode: '40213', lat: 51.227741, lng: 6.773456 }
  ];

  const catalog = [
    { title: '안멜둥 동행 및 서류 준비', category: 'anmeldung', priceEUR: 80, description: '구청 동행, 서류 번역 및 제출 대행까지 원스톱 지원합니다.' },
    { title: '비자 연장 서류 검토/예약 대행', category: 'visa_extension', priceEUR: 120, description: '필요 서류 점검과 예약, 동행까지 포함된 패키지.' },
    { title: '독일어-영어 통번역(공문서 포함)', category: 'translation', priceEUR: 60, description: '공문서/일상/비즈니스 전 영역 통번역 지원.' },
    { title: '생활 정착 코칭(은행/통신/보험)', category: 'life_coaching', priceEUR: 70, description: '은행 계좌, 통신 요금제, 의료보험까지 초기 정착 코칭.' },
    { title: '행정/법률 기본 상담', category: 'legal', priceEUR: 90, description: '일상 행정처리부터 기본 법률 상담까지 친절 안내.' },
    { title: '집 구하기 서포트(템플릿/계약 검토)', category: 'other', priceEUR: 150, description: '서류 템플릿 제공, 중개사 커뮤니케이션, 계약서 검토.' }
  ];

  const servicesToInsert = catalog.map((item, idx) => {
    const provider = providers[idx % providers.length];
    const city = cities[idx % cities.length];
    return {
      title: item.title,
      description: item.description,
      category: item.category,
      priceEUR: item.priceEUR,
      provider: provider._id,
      isActive: true,
      city: city.city,
      postalCode: city.postalCode,
      geo: { type: 'Point', coordinates: [city.lng, city.lat] }
    };
  });

  await Service.insertMany(servicesToInsert);
  console.log('Seed completed.');
  await mongoose.connection.close();
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});


