"use client";

import { useEffect, useState } from "react";
import { onCLS, onFID, onLCP, onFCP, onTTFB, onINP } from "web-vitals";
import { NextWebVitalsMetric } from "next/app";
import BrowserTimingDetails from "./BrowserTimingDetails";

interface MetricData {
  name: string;
  value: number;
  description: string;
  rating?: "good" | "needs-improvement" | "poor";
}

const INITIAL_METRICS = {
  CLS: { name: "CLS", description: "Cumulative Layout Shift", value: -1 },
  FID: { name: "FID", description: "First Input Delay", value: -1 },
  LCP: { name: "LCP", description: "Largest Contentful Paint", value: -1 },
  FCP: { name: "FCP", description: "First Contentful Paint", value: -1 },
  TTFB: { name: "TTFB", description: "Time to First Byte", value: -1 },
  INP: { name: "INP", description: "Interaction to Next Paint", value: -1 }
};

export default function WebVitalsMetrics() {
  const [metrics, setMetrics] =
    useState<Record<string, MetricData>>(INITIAL_METRICS);

  const thresholds: Record<string, { good: number; poor: number }> = {
    LCP: { good: 2500, poor: 4000 },
    FID: { good: 100, poor: 300 },
    CLS: { good: 0.1, poor: 0.25 },
    TTFB: { good: 800, poor: 1800 },
    FCP: { good: 1800, poor: 3000 },
    INP: { good: 200, poor: 500 }
  };
  const getRating = (
    name: keyof typeof thresholds,
    value: number
  ): "good" | "needs-improvement" | "poor" | undefined => {
    const threshold = thresholds[name];
    if (!threshold) return undefined;

    if (value <= threshold.good) return "good";
    if (value <= threshold.poor) return "needs-improvement";
    return "poor";
  };

  useEffect(() => {
    const handlers = [
      {
        handler: onCLS,
        name: "CLS",
        description: "Cumulative Layout Shift"
      },
      {
        handler: onFID,
        name: "FID",
        description: "First Input Delay"
      },
      {
        handler: onLCP,
        name: "LCP",
        description: "Largest Contentful Paint"
      },
      {
        handler: onFCP,
        name: "FCP",
        description: "First Contentful Paint"
      },
      {
        handler: onTTFB,
        name: "TTFB",
        description: "Time to First Byte"
      },
      {
        handler: onINP,
        name: "INP",
        description: "Interaction to Next Paint"
      }
    ];

    handlers.forEach(({ handler, name, description }) => {
      handler(({ value, rating }) => {
        setMetrics(prev => ({
          ...prev,
          [name]: {
            name,
            value,
            description,
            rating: rating || getRating(name, value)
          }
        }));
      });
    });

    // Report Next.js specific metrics
    if (typeof window !== "undefined") {
      const reportNextWebVitals = (metric: NextWebVitalsMetric) => {
        if (
          [
            "Next.js-hydration",
            "Next.js-route-change-to-render",
            "Next.js-render"
          ].includes(metric.name)
        ) {
          setMetrics(prev => ({
            ...prev,
            [metric.name]: {
              name: metric.name,
              value: metric.value,
              description: "Next.js Specific Metric"
            }
          }));
        }
      };

      // @ts-ignore - Adding to window for Next.js to pick up
      window.reportWebVitals = reportNextWebVitals;
    }
  }, []);

  const formatValue = (name: string, value: number) => {
    if (value === -1) {
      if (name === "CLS" || name === "INP" || name === "LCP") {
        return (
          <div className='flex items-center space-x-2'>
            <div className='animate-pulse flex space-x-2'>
              <div className='h-4 w-4 bg-[#1f1f1f] dark:bg-white rounded-full'></div>
              <div className='h-4 w-4 bg-[#1f1f1f] dark:bg-white rounded-full'></div>
              <div className='h-4 w-4 bg-[#1f1f1f] dark:bg-white rounded-full'></div>
            </div>
            <span className='text-foreground text-sm'>Calculating...</span>
          </div>
        );
      }
      return "Waiting for data...";
    }
    if (name === "CLS") {
      return value.toFixed(3);
    }
    return `${value.toFixed(0)}ms`;
  };

  const getRatingColor = (rating: "good" | "needs-improvement" | "poor") => {
    switch (rating) {
      case "good":
        return "text-green-600";
      case "needs-improvement":
        return "text-yellow-600";
      case "poor":
        return "text-red-600";
      default:
        return "text-indigo-600";
    }
  };

  return (
    <>
      <div className='p-6 bg-white dark:bg-black rounded-lg shadow-md border border-solid border-[hsla(0,0%,100%,0.14)]'>
        <h2 className='text-2xl font-bold mb-6'>Web Vitals Metrics</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {Object.values(metrics).map(
            ({ name, value, description, rating }) => (
              <div
                key={name}
                className='border p-4 overflow-hidden rounded border-solid hover:shadow-xl hover:cursor-not-allowed ease-in-out transition-all bg-white dark:bg-[#1f1f1f] border-[hsl(0deg 0% 0% / 8%)] dark:border-[hsla(0,0%,100%,0.14)]'>
                <div className='text-lg font-semibold select-none'>{name}</div>
                <div className='text-sm text-foreground mb-2 select-none'>
                  {description}
                </div>
                <div
                  className={`text-2xl font-bold select-none ${value === -1 ? "text-foreground" : rating ? getRatingColor(rating) : "text-indigo-600"}`}>
                  {formatValue(name, value)}
                </div>
                {rating && value !== -1 && (
                  <div
                    className={`text-sm mt-1 select-none ${getRatingColor(rating)}`}>
                    Rating: {rating.replace("-", " ")}
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>
      <BrowserTimingDetails />
    </>
  );
}
