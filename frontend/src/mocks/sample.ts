import type { MonthlySummary, Transaction, YearlyPoint } from '../types/spending'

export const sampleSummary: MonthlySummary = {
  yearMonth: '2026-01',
  totalAmount: 850_000,
  categories: [
    { name: '식비', amount: 350_000, color: '#60a5fa' },
    { name: '쇼핑', amount: 180_000, color: '#fb7185' },
    { name: '교통', amount: 90_000, color: '#34d399' },
    { name: '생활', amount: 140_000, color: '#f59e0b' },
    { name: '기타', amount: 90_000, color: '#a78bfa' },
  ],
}

export const sampleTransactions: Transaction[] = [
  { id: 't1', date: '2026-01-01', category: '식비', memo: '점심 식사', amount: 15000 },
  { id: 't2', date: '2026-01-01', category: '쇼핑', memo: '생필품 구매', amount: 15500 },
  { id: 't3', date: '2026-01-03', category: '교통', memo: '대중교통', amount: 1350 },
  { id: 't4', date: '2026-01-05', category: '생활', memo: '카페', amount: 5200 },
  { id: 't5', date: '2026-01-10', category: '식비', memo: '저녁 식사', amount: 23000 },
  { id: 't6', date: '2026-01-18', category: '기타', memo: '구독 서비스', amount: 10900 },
]

export const sampleYearly: YearlyPoint[] = [
  { month: '1', totalAmount: 850_000 },
  { month: '2', totalAmount: 620_000 },
  { month: '3', totalAmount: 710_000 },
  { month: '4', totalAmount: 540_000 },
  { month: '5', totalAmount: 760_000 },
  { month: '6', totalAmount: 1_050_000 },
  { month: '7', totalAmount: 820_000 },
  { month: '8', totalAmount: 690_000 },
  { month: '9', totalAmount: 980_000 },
  { month: '10', totalAmount: 1_200_000 },
  { month: '11', totalAmount: 880_000 },
  { month: '12', totalAmount: 930_000 },
]

