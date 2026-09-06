"use client";

import dynamic from "next/dynamic";
import { useRequestQuote } from "@/components/request-quote-context";

// Lazily import the heavy modal UI (DatePickerEn + SizeQuantityPicker + form
// state). The chunk is only fetched the first time the user opens the modal,
// not on initial page load.
const RequestQuoteModal = dynamic(
  () => import("@/components/request-quote-modal").then((m) => m.RequestQuoteModal),
  { ssr: false }
);

export function RequestQuoteMount() {
  const { state } = useRequestQuote();
  // Only mount the modal when it's actually open. This keeps the heavy
  // form-state code out of every page's initial bundle.
  if (!state.open) return null;
  return <RequestQuoteModal />;
}
