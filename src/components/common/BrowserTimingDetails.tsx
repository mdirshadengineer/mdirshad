"use client";

import React, { useEffect, useState } from "react";

export default function BrowserTimingDetails() {
  const [timingData, setTimingData] = useState<{
    cacheDnsTcp: number;
    server: number;
    unload: number;
    domProcessing: number;
    onLoad: number;
    cssJsParse: number;
    browserProcessing: number;
    domContentToLoadEvent: number;
    addLoadEvent: number;
    other: number;
    totalNetwork: number;
    totalServer: number;
    totalBrowser: number;
    totalTime: number;
  } | null>(null);

  useEffect(() => {
    const calculateTimings = () => {
      const navigationEntries = performance.getEntriesByType(
        "navigation"
      ) as PerformanceNavigationTiming[];

      if (!navigationEntries.length) return;

      const navigation = navigationEntries[0];
      console.log(navigationEntries);
      const {
        startTime,
        fetchStart,
        domainLookupEnd,
        connectEnd,
        responseStart,
        responseEnd,
        domContentLoadedEventStart,
        domInteractive,
        domComplete,
        loadEventEnd,
        loadEventStart
      } = navigation;

      const cacheDnsTcp = fetchStart - startTime;
      const dnsLookup = domainLookupEnd - fetchStart;
      const tcpConnection = connectEnd - domainLookupEnd;
      const server = responseEnd - responseStart;
      const unload = domContentLoadedEventStart - responseEnd;
      const domProcessing = Math.max(
        0,
        domInteractive - domContentLoadedEventStart
      );
      const onLoad = loadEventEnd - loadEventStart;

      const cssJsParse = domComplete - domInteractive;
      const browserProcessing = loadEventEnd - loadEventStart;
      const domContentToLoadEvent = loadEventStart - domInteractive;
      const addLoadEvent = loadEventEnd - domComplete;
      const other = Math.max(0, loadEventEnd - responseEnd);

      const totalNetwork = cacheDnsTcp + dnsLookup + tcpConnection;
      const totalServer = server;
      const totalBrowser =
        unload +
        domProcessing +
        onLoad +
        cssJsParse +
        browserProcessing +
        domContentToLoadEvent +
        addLoadEvent +
        other;
      const totalTime = totalNetwork + totalServer + totalBrowser;

      setTimingData({
        cacheDnsTcp,
        server,
        unload,
        domProcessing,
        onLoad,
        cssJsParse,
        browserProcessing,
        domContentToLoadEvent,
        addLoadEvent,
        other,
        totalNetwork,
        totalServer,
        totalBrowser,
        totalTime
      });
    };

    if (document.readyState === "complete") {
      calculateTimings();
    } else {
      window.addEventListener("load", calculateTimings);
    }

    return () => {
      window.removeEventListener("load", calculateTimings);
    };
  }, []);

  if (!timingData) {
    return <div>Loading timing details...</div>;
  }

  const {
    cacheDnsTcp,
    server,
    unload,
    domProcessing,
    onLoad,
    cssJsParse,
    browserProcessing,
    domContentToLoadEvent,
    addLoadEvent,
    other,
    totalNetwork,
    totalServer,
    totalBrowser,
    totalTime
  } = timingData;

  return (
    <div className='bg-white dark:bg-black p-6 rounded-lg shadow-md mt-8 border border-solid border-[hsla(0,0%,100%,0.14)]'>
      <h2 className='text-2xl font-bold mb-6'>Browser Response Time Details</h2>

      <div className='space-y-6'>
        {/* Response Time Breakdown */}
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <h3 className='text-lg font-semibold mb-3 text-foreground'>
              Response Time Breakdown
            </h3>
            <div className='space-y-2'>
              {[
                {
                  label: "Cache/DNS/TCP",
                  value: cacheDnsTcp,
                  color: "#ef4444"
                },
                { label: "Server", value: server, color: "#f97316" },
                { label: "Unload", value: unload, color: "#eab308" },
                {
                  label: "DOM Processing",
                  value: domProcessing,
                  color: "#22c55e"
                },
                { label: "onLoad", value: onLoad, color: "#14b8a6" }
              ].map(({ label, value, color }) => (
                <div className='flex items-center' key={label}>
                  <div className='w-32 text-foreground'>{label}:</div>
                  <div className='relative overflow-hidden flex-1 bg-[#ededed] dark:bg-[#292828] rounded-full h-4'>
                    <div
                      className='absolute top-0 left-0 h-4 rounded-full'
                      style={{
                        width: `${Math.min((value / totalTime) * 100, 100)}%`,
                        backgroundColor: color
                      }}></div>
                  </div>
                  <div className='ml-2 w-20 text-right font-medium'>
                    {value.toFixed(2)}ms
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Browser Timing Details */}
          <div>
            <h3 className='text-lg font-semibold mb-3'>
              Browser Timing Details
            </h3>
            <div className='space-y-2'>
              {[
                { label: "CSS and JS Parse", value: cssJsParse },
                {
                  label: "Browser processing before onLoad",
                  value: browserProcessing
                },
                {
                  label: "DOMContentLoaded to LoadEventEnd",
                  value: domContentToLoadEvent
                },
                { label: "Add LoadEvent functions", value: addLoadEvent },
                { label: "Other", value: other }
              ].map(({ label, value }) => (
                <div className='flex justify-between' key={label}>
                  <span className='text-foreground'>{label}</span>
                  <span className='font-medium'>{value.toFixed(2)}ms</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Total Response Time */}
      <div className='mt-4 p-4 bg-[#1f1f1f] rounded-lg'>
        <h3 className='text-lg font-semibold mb-2'>Total Response Time</h3>
        <div className='flex justify-between items-center'>
          <div className=''>
            <span className='text-foreground'>Network: </span>
            <span className='font-medium'>{totalNetwork.toFixed(2)}ms</span>
          </div>
          <div>
            <span className='text-foreground'>Server: </span>
            <span className='font-medium'>{totalServer.toFixed(2)}ms</span>
          </div>
          <div>
            <span className='text-foreground'>Browser: </span>
            <span className='font-medium'>{totalBrowser.toFixed(2)}ms</span>
          </div>
          <div>
            <span className='text-foreground'>Total: </span>
            <span className='font-medium'>{totalTime.toFixed(2)}ms</span>
          </div>
        </div>
      </div>
    </div>
  );
}
