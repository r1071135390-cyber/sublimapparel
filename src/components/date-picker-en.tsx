"use client";

import { useEffect, useId, useState } from "react";

import { cn } from "@/lib/utils";

type DatePickerProps = {
  value: string; // YYYY-MM-DD
  onChange: (value: string) => void;
  minDate?: Date;
  name?: string;
  required?: boolean;
  className?: string;
  inputClassName?: string;
};

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

const DAYS_31 = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0"));

function parseYMD(value: string): { y: string; m: string; d: string } {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return { y: "", m: "", d: "" };
  }
  const [y, m, d] = value.split("-");
  return { y, m, d };
}

function formatYMD(y: string, m: string, d: string): string {
  if (!y || !m || !d) return "";
  return `${y}-${m}-${d}`;
}

function maxDayForMonth(year: number, month: number): number {
  if (!year || !month) return 31;
  // month is 1-12
  return new Date(year, month, 0).getDate();
}

export function DatePickerEn({
  value,
  onChange,
  minDate,
  name = "deadline",
  required = false,
  className,
  inputClassName,
}: DatePickerProps) {
  const reactId = useId();
  const baseId = `dp-${reactId.replace(/[:]/g, "")}`;
  const { y, m, d } = parseYMD(value);

  // 2026-09-13 (R62): Year options depend on minDate which may differ
  // between server (build time) and client (hydration time) when the
  // parent computes it at module load. We render an empty year list
  // on the server and the initial client render (identical), then
  // populate it in useEffect on the client. This eliminates the
  // React #418 text-content hydration mismatch that came from
  // `<option>{new Date().getFullYear()}</option>` differing between
  // SSR and client.
  const [yearOptions, setYearOptions] = useState<number[]>([]);
  const [dayCount, setDayCount] = useState(31);

  useEffect(() => {
    // Compute on the client only — values are stable within a session
    // so re-running on minDate changes is safe.
    const start = minDate ? minDate.getFullYear() : new Date().getFullYear();
    const end = start + 3;
    const years: number[] = [];
    for (let yy = start; yy <= end; yy++) years.push(yy);
    setYearOptions(years);
  }, [minDate]);

  useEffect(() => {
    const yy = Number(y) || (minDate ? minDate.getFullYear() : new Date().getFullYear());
    const mm = Number(m) || 1;
    setDayCount(maxDayForMonth(yy, mm));
  }, [y, m, minDate]);

  const handleY = (yy: string) => {
    const nextD = Number(d) > maxDayForMonth(Number(yy), Number(m) || 1) ? "" : d;
    onChange(formatYMD(yy, m, nextD));
  };
  const handleM = (mm: string) => {
    const nextD = Number(d) > maxDayForMonth(Number(y) || 0, Number(mm) || 0) ? "" : d;
    onChange(formatYMD(y, mm, nextD));
  };
  const handleD = (dd: string) => onChange(formatYMD(y, m, dd));

  // Min helpers
  const isDateDisabled = (yy: number, mm: number, dd: number): boolean => {
    if (!minDate) return false;
    const candidate = new Date(yy, mm - 1, dd);
    return candidate.getTime() < minDate.getTime();
  };

  const yearMin = minDate ? minDate.getFullYear() : undefined;
  const monthMin = minDate && y && Number(y) === minDate.getFullYear() ? minDate.getMonth() + 1 : 1;
  const dayMin = minDate && y && Number(y) === minDate.getFullYear() && Number(m) === minDate.getMonth() + 1 ? minDate.getDate() : 1;

  return (
    <div className={cn("flex gap-2", className)}>
      <select
        id={`${baseId}-m`}
        aria-label="Month"
        name={`${name}_month`}
        value={m}
        onChange={(e) => handleM(e.target.value)}
        required={required}
        className={cn(
          "w-full border-b-2 border-[#0a0a0a] bg-transparent py-2 text-sm font-medium text-[#0a0a0a] focus:border-[#ff4d00] focus:outline-none",
          inputClassName,
        )}
      >
        <option value="">Month</option>
        {MONTHS.map((label, idx) => {
          const mm = String(idx + 1).padStart(2, "0");
          if (yearMin && Number(y) && Number(y) < yearMin) return null;
          if (Number(y) === yearMin && idx + 1 < monthMin) return null;
          return (
            <option key={mm} value={mm}>
              {label}
            </option>
          );
        })}
      </select>

      <select
        id={`${baseId}-d`}
        aria-label="Day"
        name={`${name}_day`}
        value={d}
        onChange={(e) => handleD(e.target.value)}
        required={required}
        className={cn(
          "w-full border-b-2 border-[#0a0a0a] bg-transparent py-2 text-sm font-medium text-[#0a0a0a] focus:border-[#ff4d00] focus:outline-none",
          inputClassName,
        )}
      >
        <option value="">Day</option>
        {DAYS_31.slice(0, dayCount).map((dd) => {
          if (yearMin && Number(y) === yearMin && Number(m) === monthMin && Number(dd) < dayMin) return null;
          return (
            <option key={dd} value={dd}>
              {dd}
            </option>
          );
        })}
      </select>

      <select
        id={`${baseId}-y`}
        aria-label="Year"
        name={`${name}_year`}
        value={y}
        onChange={(e) => handleY(e.target.value)}
        required={required}
        className={cn(
          "w-full border-b-2 border-[#0a0a0a] bg-transparent py-2 text-sm font-medium text-[#0a0a0a] focus:border-[#ff4d00] focus:outline-none",
          inputClassName,
        )}
      >
        <option value="">Year</option>
        {yearOptions.map((yy) => (
          <option key={yy} value={String(yy)}>
            {yy}
          </option>
        ))}
      </select>
    </div>
  );
}
