export type Bank = 'KB' | 'SHINHAN' | 'WOORI'

export type CategorySpend = {
  name: string
  amount: number
  color: string
}

export type MonthlySummary = {
  yearMonth: string // YYYY-MM
  totalAmount: number
  categories: CategorySpend[]
}

export type Transaction = {
  id: string
  date: string // YYYY-MM-DD
  category: string
  memo: string
  amount: number
}

export type YearlyPoint = {
  month: string // 1~12
  totalAmount: number
}

