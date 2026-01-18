// components/TradingChart.jsx - SVG Version (Simpler)
import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { binanceService } from '../services/binanceService';

const TradingChart = ({ activeMarket, timeFrame = '1d', chartType = 'Candle' }) => {
  const { data: candleData, isLoading, error } = useQuery({
    queryKey: ['candleData', activeMarket, timeFrame],
    queryFn: () => binanceService.getKlines(activeMarket, timeFrame, 50), // Reduced for better performance
    refetchInterval: 30000,
  });

  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 450 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height: 450 });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  if (error) {
    return (
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
        <div className="h-[450px] flex flex-col items-center justify-center">
          <div className="text-red-500 mb-2">Error loading chart data</div>
          <div className="text-slate-400 text-sm">Using sample data</div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
        <div className="h-[450px] flex items-center justify-center">
          <div className="text-slate-400">Loading chart data...</div>
        </div>
      </div>
    );
  }

  if (!candleData || candleData.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
        <div className="h-[450px] flex items-center justify-center">
          <div className="text-slate-400">No chart data available</div>
        </div>
      </div>
    );
  }

  // Calculate chart dimensions
  const { width, height } = dimensions;
  const margin = { top: 30, right: 60, bottom: 30, left: 60 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  // Calculate price range
  const prices = candleData.flatMap(candle => [candle.high, candle.low]);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = maxPrice - minPrice;

  // Scale functions
  const xScale = (index) => margin.left + (index / (candleData.length - 1)) * chartWidth;
  const yScale = (price) => margin.top + chartHeight - ((price - minPrice) / priceRange) * chartHeight;

  // Generate grid lines
  const gridLines = [];
  for (let i = 0; i <= 5; i++) {
    const y = margin.top + (i / 5) * chartHeight;
    const price = maxPrice - (i / 5) * priceRange;
    gridLines.push({
      y,
      price: `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    });
  }

  // Generate chart points
  let chartElements = [];
  if (chartType === 'Candle') {
    const candleWidth = Math.min(15, chartWidth / candleData.length * 0.8);
    
    chartElements = candleData.map((candle, i) => {
      const x = xScale(i);
      const openY = yScale(candle.open);
      const closeY = yScale(candle.close);
      const highY = yScale(candle.high);
      const lowY = yScale(candle.low);
      const isUp = candle.close >= candle.open;
      const color = isUp ? '#10B981' : '#EF4444';
      const bodyTop = Math.min(openY, closeY);
      const bodyHeight = Math.abs(closeY - openY) || 1;
      
      return (
        <g key={i}>
          {/* Wick */}
          <line
            x1={x}
            y1={highY}
            x2={x}
            y2={lowY}
            stroke={color}
            strokeWidth="1"
          />
          {/* Candle body */}
          <rect
            x={x - candleWidth/2}
            y={bodyTop}
            width={candleWidth}
            height={bodyHeight}
            fill={color}
          />
        </g>
      );
    });
  } else if (chartType === 'Line') {
    const points = candleData.map((candle, i) => 
      `${xScale(i)},${yScale(candle.close)}`
    ).join(' ');
    
    chartElements.push(
      <polyline
        key="line"
        points={points}
        fill="none"
        stroke="#3B82F6"
        strokeWidth="2"
      />
    );
  } else if (chartType === 'Area') {
    const areaPoints = [
      `${margin.left},${margin.top + chartHeight}`,
      ...candleData.map((candle, i) => `${xScale(i)},${yScale(candle.close)}`),
      `${margin.left + chartWidth},${margin.top + chartHeight}`
    ].join(' ');
    
    const linePoints = candleData.map((candle, i) => 
      `${xScale(i)},${yScale(candle.close)}`
    ).join(' ');
    
    chartElements.push(
      <polygon
        key="area"
        points={areaPoints}
        fill="rgba(139, 92, 246, 0.1)"
        stroke="none"
      />
    );
    
    chartElements.push(
      <polyline
        key="area-line"
        points={linePoints}
        fill="none"
        stroke="#8B5CF6"
        strokeWidth="2"
      />
    );
  }

  // Current price line
  const lastClose = candleData[candleData.length - 1].close;
  const lastY = yScale(lastClose);

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
      <div className="h-[450px]" ref={containerRef}>
        <svg width={width} height={height} className="w-full h-full">
          {/* Grid background */}
          <rect
            x={margin.left}
            y={margin.top}
            width={chartWidth}
            height={chartHeight}
            fill="white"
          />
          
          {/* Grid lines */}
          {gridLines.map((line, i) => (
            <g key={i}>
              <line
                x1={margin.left}
                y1={line.y}
                x2={width - margin.right}
                y2={line.y}
                stroke="#f1f5f9"
                strokeWidth="1"
              />
              <text
                x={width - margin.right + 5}
                y={line.y + 4}
                fill="#94a3b8"
                fontSize="12"
                textAnchor="start"
                alignmentBaseline="middle"
              >
                {line.price}
              </text>
            </g>
          ))}
          
          {/* Vertical grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
            const x = margin.left + ratio * chartWidth;
            return (
              <line
                key={i}
                x1={x}
                y1={margin.top}
                x2={x}
                y2={height - margin.bottom}
                stroke="#f1f5f9"
                strokeWidth="1"
              />
            );
          })}
          
          {/* Chart elements */}
          {chartElements}
          
          {/* Current price line */}
          <line
            x1={margin.left}
            y1={lastY}
            x2={width - margin.right}
            y2={lastY}
            stroke="#10B981"
            strokeWidth="1"
            strokeDasharray="5,3"
          />
          
          {/* Current price label */}
          <rect
            x={width - margin.right}
            y={lastY - 12}
            width="60"
            height="24"
            fill="#10B981"
            rx="4"
          />
          <text
            x={width - margin.right + 30}
            y={lastY}
            fill="white"
            fontSize="12"
            fontWeight="bold"
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            ${lastClose.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </text>
          
          {/* Chart borders */}
          <rect
            x={margin.left}
            y={margin.top}
            width={chartWidth}
            height={chartHeight}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="1"
          />
        </svg>
        
        {/* Chart type indicator */}
        <div className="absolute top-4 left-4">
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">
            {chartType} Chart • {timeFrame}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TradingChart;