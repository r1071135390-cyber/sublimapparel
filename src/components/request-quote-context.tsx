"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

export type QuoteSource = {
  label: string;
  path: string;
  prefill?: {
    productName?: string;
    productCategory?: string;
    productNumber?: string;
  };
};

type QuoteState = {
  open: boolean;
  source: QuoteSource;
};

type QuoteContextValue = {
  state: QuoteState;
  openQuote: (source?: Partial<QuoteSource>) => void;
  closeQuote: () => void;
};

const defaultSource: QuoteSource = {
  label: "this page",
  path: "/",
};

const QuoteContext = React.createContext<QuoteContextValue | null>(null);

export function useRequestQuote() {
  const ctx = React.useContext(QuoteContext);
  if (!ctx) {
    throw new Error("useRequestQuote must be used within <RequestQuoteProvider>");
  }
  return ctx;
}

export function RequestQuoteProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [state, setState] = React.useState<QuoteState>({
    open: false,
    source: { ...defaultSource, path: pathname || "/" },
  });

  React.useEffect(() => {
    setState((prev) => ({ ...prev, source: { ...prev.source, path: pathname || "/" } }));
  }, [pathname]);

  const openQuote = React.useCallback(
    (source?: Partial<QuoteSource>) => {
      setState((prev) => ({
        open: true,
        source: {
          label: source?.label || prev.source.label,
          path: source?.path || pathname || "/",
          prefill: source?.prefill || prev.source.prefill,
        },
      }));
    },
    [pathname]
  );

  const closeQuote = React.useCallback(() => {
    setState((prev) => ({ ...prev, open: false }));
  }, []);

  const value = React.useMemo(
    () => ({ state, openQuote, closeQuote }),
    [state, openQuote, closeQuote]
  );

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}
