import { useMemo, useRef, useState } from 'react'
import type { Bank } from '../types/spending'

type Props = {
  mode: 'guest' | 'member'
  onUploaded?: (args: { yearMonth: string; bank: Bank; fileName: string }) => void
}

const bankOptions: { label: string; value: Bank }[] = [
  { label: '국민은행', value: 'KB' },
  { label: '신한은행', value: 'SHINHAN' },
  { label: '우리은행', value: 'WOORI' },
]

function currentYearMonth() {
  const d = new Date()
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  return `${yyyy}-${mm}`
}

export function UploadCard({ mode, onUploaded }: Props) {
  const [bank, setBank] = useState<Bank>('KB')
  const [yearMonth, setYearMonth] = useState<string>(currentYearMonth())
  const [fileName, setFileName] = useState<string>('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  const subtitle = useMemo(() => {
    if (mode === 'guest') return '비회원은 업로드 즉시 해당 월 합산 결과를 확인할 수 있어요.'
    return '회원은 월별로 저장하여 마이페이지에서 1년 그래프까지 확인할 수 있어요.'
  }, [mode])

  return (
    <div className="card glass">
      <p className="card-title">.csv 파일 업로드</p>
      <p className="card-desc">{subtitle}</p>

      <div className="upload">
        <div className="upload-row">
          <div className="field">
            <label>은행 선택</label>
            <select value={bank} onChange={(e) => setBank(e.target.value as Bank)}>
              {bankOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>월 선택</label>
            <input
              type="month"
              value={yearMonth}
              onChange={(e) => setYearMonth(e.target.value)}
            />
          </div>
        </div>

        <div className="dropzone">
          <div>
            <div style={{ fontWeight: 800 }}>
              {fileName ? fileName : '드래그 앤 드롭 또는 파일 선택'}
            </div>
            <small>은행별 1개월치 지출 내역(.csv)을 업로드하세요</small>
          </div>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input
              ref={inputRef}
              type="file"
              accept=".csv,text/csv"
              style={{ display: 'none' }}
              onChange={(e) => {
                const f = e.target.files?.[0]
                if (!f) return
                setFileName(f.name)
              }}
            />
            <button className="btn" onClick={() => inputRef.current?.click()}>
              파일 선택
            </button>
            <button
              className="btn btn-primary"
              disabled={!fileName}
              onClick={() => {
                // TODO: 백엔드 API 연결: 업로드 후 분석 결과(guest) 또는 저장(member) 처리
                onUploaded?.({ yearMonth, bank, fileName })
              }}
            >
              업로드
            </button>
          </div>
        </div>

        <p className="muted" style={{ margin: '10px 0 0', fontSize: 12 }}>
          ※ 지금은 UI 틀만 구현되어 있어요. 업로드 버튼을 누르면 “업로드 완료(미리보기)”로만 처리됩니다.
        </p>
      </div>
    </div>
  )
}

