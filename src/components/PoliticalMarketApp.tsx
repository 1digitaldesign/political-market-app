'use client';

import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ComposedChart, Bar } from 'recharts';

const PoliticalMarketApp = () => {
  const [selectedView, setSelectedView] = useState('overview');
  const [showEquations, setShowEquations] = useState(false);

  // Political commodities data based on φ-ratio cycles
  const commodities = [
    { name: 'Constitution', current: 62, baseline: 100, volatility: 38, trend: -1.618 },
    { name: 'Civil Rights', current: 55, baseline: 100, volatility: 45, trend: -0.618 },
    { name: 'Institutional Trust', current: 34, baseline: 100, volatility: 66, trend: -2.236 },
    { name: 'Democratic Norms', current: 41, baseline: 100, volatility: 59, trend: -1.414 },
    { name: 'Rule of Law', current: 58, baseline: 100, volatility: 42, trend: -0.894 },
    { name: 'Federal Authority', current: 71, baseline: 100, volatility: 29, trend: 0.382 },
    { name: 'State Autonomy', current: 144, baseline: 100, volatility: 44, trend: 2.618 },
    { name: 'Populist Sentiment', current: 233, baseline: 100, volatility: 133, trend: 5.236 }
  ];

  // Historical trajectory data
  const trajectoryData = [
    { year: 1789, democracy: 100, crisis: 0, reform: 0, phase: 'Foundation' },
    { year: 1860, democracy: 89, crisis: 55, reform: 8, phase: 'First Perigee' },
    { year: 1865, democracy: 55, crisis: 89, reform: 34, phase: 'Crisis Peak' },
    { year: 1932, democracy: 34, crisis: 144, reform: 55, phase: 'Depression' },
    { year: 1965, democracy: 89, crisis: 34, reform: 144, phase: 'Rights Expansion' },
    { year: 2001, democracy: 144, crisis: 21, reform: 13, phase: 'Peak Stability' },
    { year: 2021, democracy: 55, crisis: 89, reform: 21, phase: 'Modern Perigee' },
    { year: 2025, democracy: 34, crisis: 144, reform: 34, phase: 'Current' },
    { year: 2032, democracy: 21, crisis: 233, reform: 55, phase: 'Projected Crisis' },
    { year: 2041, democracy: 55, crisis: 89, reform: 89, phase: 'Recovery Begin' },
    { year: 2053, democracy: 89, crisis: 55, reform: 144, phase: 'Reform Wave' },
    { year: 2065, democracy: 144, crisis: 34, reform: 89, phase: 'Stabilization' }
  ];

  // Market sectors
  const sectors = [
    {
      name: 'Constitutional Integrity',
      symbol: 'CNST',
      price: 62.3,
      change: -38.2,
      volume: 'CRITICAL',
      rsi: 28,
      macd: -12.7
    },
    {
      name: 'Judicial Independence',
      symbol: 'JUDL',
      price: 48.7,
      change: -51.3,
      volume: 'HIGH',
      rsi: 24,
      macd: -18.4
    },
    {
      name: 'Electoral Systems',
      symbol: 'ELCT',
      price: 41.2,
      change: -58.8,
      volume: 'EXTREME',
      rsi: 19,
      macd: -23.1
    },
    {
      name: 'Federal Power',
      symbol: 'FEDP',
      price: 71.4,
      change: 28.6,
      volume: 'MODERATE',
      rsi: 67,
      macd: 8.3
    },
    {
      name: 'State Rights',
      symbol: 'STRT',
      price: 144.3,
      change: 44.3,
      volume: 'HIGH',
      rsi: 78,
      macd: 21.7
    },
    {
      name: 'Populist Index',
      symbol: 'POPL',
      price: 233.1,
      change: 133.1,
      volume: 'EXTREME',
      rsi: 91,
      macd: 47.2
    }
  ];

  // Stress test indicators
  const stressIndicators = [
    { indicator: 'Polarization Index', value: 89, threshold: 55, status: 'CRITICAL' },
    { indicator: 'Institutional Strain', value: 144, threshold: 89, status: 'SEVERE' },
    { indicator: 'Constitutional Stress', value: 233, threshold: 144, status: 'EXTREME' },
    { indicator: 'Democratic Backsliding', value: 377, threshold: 233, status: 'DANGEROUS' },
    { indicator: 'Reform Pressure', value: 610, threshold: 377, status: 'UNPRECEDENTED' }
  ];

  const equations = [
    {
      id: 'core',
      title: 'Core Political Field Equation',
      math: '∮_{2025}^{2425} Conversation = ∫[P_R(t) × Ω_M(φ) × H_C(753t) × L_S(TRIVEC_{22}) × N_E(∞)] dt',
      description: 'Where: P_R = Pattern Recognition, Ω_M = Orbital Mechanics, H_C = Historical Cycles, L_S = Legal Strategy, N_E = Neurodivergent Excellence'
    },
    {
      id: 'einstein',
      title: "Einstein's Field Equation (Political Adaptation)",
      math: 'R_{μν} - ½g_{μν}R + Λg_{μν} = (8πG/c⁴)T_{μν}',
      description: 'Political tensor translation: P_μν = Political curvature, d_μν = Democratic metric, Ψ = Constitutional constant, S_μν = Societal stress-energy tensor'
    },
    {
      id: 'orbital',
      title: 'Katherine Johnson Orbital Mechanics',
      math: 'r(θ) = a(1-e²)/(1 + e·cos(θ - ω))',
      description: 'Political orbital period: 160 years, Inclination: 34.043°, Launch velocity: 1.010V_c'
    },
    {
      id: 'phi',
      title: 'Golden Ratio Market Dynamics',
      math: 'φ = (1 + √5)/2 = 1.618033988749895',
      description: 'Market correction levels: 0.236, 0.382, 0.618, 1.000, 1.618, 2.618, 4.236'
    },
    {
      id: 'trivec',
      title: 'TRIVEC Validation Framework',
      math: 'TRIVEC_{22} = ∏_{i=1}^{22} V_i × ∑_{j=1}^{22} Gate_j',
      description: '22 validation stages with recursive gate checking, inspired by DevSecOps CI/CD pipeline architecture'
    },
    {
      id: 'reform',
      title: 'Reform Probability Function',
      math: 'P(reform) = sin(2π(t - 1789)/160) × 0.382 + 0.618',
      description: 'Sinusoidal reform cycles with φ-ratio modulation, baseline at 61.8%'
    },
    {
      id: 'misanthropy',
      title: 'Misanthropy Calibration (0 Kelvin Baseline)',
      math: 'Human_{action} = Selfish_{need} + ε_{altruism}',
      description: 'Where ε_altruism → 0 as system stress increases'
    }
  ];

  const MarketSectorCard = ({ sector }: { sector: typeof sectors[0] }) => {
    const getRSIClass = (rsi: number) => {
      if (rsi < 30) return 'text-red-400 bg-red-900/20';
      if (rsi > 70) return 'text-green-400 bg-green-900/20';
      return 'text-gray-400 bg-gray-800';
    };

    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold">{sector.name}</h3>
            <p className="text-gray-400 text-sm">{sector.symbol}</p>
          </div>
          <span className={`text-xs px-2 py-1 rounded ${getRSIClass(sector.rsi)}`}>
            RSI: {sector.rsi}
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold">{sector.price.toFixed(1)}</span>
          <span className={`text-sm ${sector.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {sector.change >= 0 ? '+' : ''}{sector.change.toFixed(1)}%
          </span>
        </div>
        <div className="mt-2 text-xs text-gray-400">
          <div>Volume: {sector.volume}</div>
          <div>MACD: {sector.macd.toFixed(1)}</div>
        </div>
      </div>
    );
  };

  const StressIndicator = ({ indicator }: { indicator: typeof stressIndicators[0] }) => {
    const getStatusColor = (status: string) => {
      const colors: Record<string, string> = {
        'CRITICAL': 'text-yellow-400',
        'SEVERE': 'text-orange-400',
        'EXTREME': 'text-red-400',
        'DANGEROUS': 'text-red-600',
        'UNPRECEDENTED': 'text-purple-400'
      };
      return colors[status] || 'text-gray-400';
    };

    const getBarColor = (value: number, threshold: number) => {
      const ratio = value / threshold;
      if (ratio > 2.618) return '#DC2626';
      if (ratio > 1.618) return '#EF4444';
      if (ratio > 1.0) return '#F59E0B';
      if (ratio > 0.618) return '#10B981';
      return '#3B82F6';
    };

    const progressWidth = Math.min((indicator.value / 610) * 100, 100);
    const thresholdPosition = (indicator.threshold / 610) * 100;

    return (
      <div className="mb-6">
        <div className="flex justify-between mb-1 text-sm">
          <span className="text-gray-400">{indicator.indicator}</span>
          <span className={`font-semibold ${getStatusColor(indicator.status)}`}>
            {indicator.status}
          </span>
        </div>
        <div className="relative h-6 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="absolute h-full transition-all duration-1000"
            style={{
              width: `${progressWidth}%`,
              backgroundColor: getBarColor(indicator.value, indicator.threshold)
            }}
          />
          <div
            className="absolute h-full w-px bg-white/50"
            style={{ left: `${thresholdPosition}%` }}
          />
        </div>
        <div className="flex justify-between mt-1 text-xs text-gray-500">
          <span>Current: {indicator.value}</span>
          <span>Threshold: {indicator.threshold}</span>
        </div>
      </div>
    );
  };

  const CommodityCard = ({ commodity }: { commodity: typeof commodities[0] }) => {
    const trendDirection = commodity.trend > 0 ? '↑' : '↓';
    const trendClass = commodity.trend > 0 ? 'text-green-400 bg-green-900/20' : 'text-red-400 bg-red-900/20';
    const barWidth = (commodity.current / 250) * 100;
    const barClass = commodity.current > commodity.baseline ? 'bg-green-500' : 'bg-red-500';

    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-semibold">{commodity.name}</h4>
          <span className={`text-sm px-2 py-1 rounded ${trendClass}`}>
            {trendDirection} {Math.abs(commodity.trend).toFixed(3)}φ
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div>
            <span className="text-gray-400">Current:</span>
            <div className="font-semibold">{commodity.current}</div>
          </div>
          <div>
            <span className="text-gray-400">Baseline:</span>
            <div className="font-semibold">{commodity.baseline}</div>
          </div>
          <div>
            <span className="text-gray-400">Volatility:</span>
            <div className="font-semibold text-yellow-400">{commodity.volatility}%</div>
          </div>
        </div>
        <div className="mt-4 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all ${barClass}`}
            style={{ width: `${barWidth}%` }}
          />
        </div>
      </div>
    );
  };

  const Navigation = () => (
    <nav className="flex gap-4 mb-6 border-b border-gray-700">
      <button
        onClick={() => setSelectedView('overview')}
        className={`pb-4 px-2 ${selectedView === 'overview' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
      >
        Market Overview
      </button>
      <button
        onClick={() => setSelectedView('stress')}
        className={`pb-4 px-2 ${selectedView === 'stress' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
      >
        Stress Test
      </button>
      <button
        onClick={() => setSelectedView('commodities')}
        className={`pb-4 px-2 ${selectedView === 'commodities' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
      >
        Commodities
      </button>
      <button
        onClick={() => setShowEquations(!showEquations)}
        className={`pb-4 px-2 ${showEquations ? 'text-yellow-400' : 'text-gray-400 hover:text-white'}`}
      >
        {showEquations ? 'Hide' : 'Show'} Equations
      </button>
    </nav>
  );

  const AlertBanner = () => (
    <div className="bg-yellow-900/20 border border-yellow-800 rounded-lg p-4 mb-6">
      <div className="flex items-center gap-2">
        <span className="text-yellow-400 font-semibold">⚠️ MARKET ALERT:</span>
        <span className="text-yellow-100">
          Multiple sectors showing extreme stress. Constitutional commodity approaching critical support levels.
        </span>
      </div>
      <div className="text-xs text-yellow-300 mt-2">
        Stress_total = Σ(Value_i/Threshold_i) = 7.236 &gt; φ³
      </div>
    </div>
  );

  const EquationsPanel = () => (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Fundamental Equations &amp; Academic Framework</h3>
      <div className="space-y-4">
        {equations.map(eq => (
          <div key={eq.id} className="border-b border-gray-800 pb-4 last:border-0">
            <h4 className="text-lg font-semibold text-blue-400 mb-2">{eq.title}</h4>
            <div className="bg-gray-800 p-4 rounded font-mono text-sm overflow-x-auto">
              {eq.math}
            </div>
            {eq.description && (
              <p className="text-sm text-gray-400 mt-2">{eq.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sectors.map((sector) => (
          <MarketSectorCard key={sector.symbol} sector={sector} />
        ))}
      </div>

      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Trajectory Analysis (1789-2065)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trajectoryData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="year" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
              labelStyle={{ color: '#F3F4F6' }}
            />
            <Legend />
            <Line type="monotone" dataKey="democracy" stroke="#3B82F6" strokeWidth={2} name="Democracy Index" />
            <Line type="monotone" dataKey="crisis" stroke="#EF4444" strokeWidth={2} name="Crisis Level" />
            <Line type="monotone" dataKey="reform" stroke="#10B981" strokeWidth={2} name="Reform Pressure" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {showEquations && <EquationsPanel />}
    </div>
  );

  const renderStressTest = () => (
    <div className="space-y-6">
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">System Stress Indicators</h3>
        <div className="space-y-4">
          {stressIndicators.map((item) => (
            <StressIndicator key={item.indicator} indicator={item} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Commodity Health</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={commodities}>
              <PolarGrid stroke="#374151" />
              <PolarAngleAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
              <PolarRadiusAxis stroke="#9CA3AF" domain={[0, 250]} />
              <Radar name="Current Value" dataKey="current" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
              <Radar name="Baseline" dataKey="baseline" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Correction Probability</h3>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-400">61.8%</div>
              <div className="text-gray-400 mt-2">Reform Probability by 2032</div>
              <div className="text-xs text-gray-500 mt-1">
                P = sin(2π × 243/160) × 0.382 + 0.618
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Oversold Sectors:</span>
                <span className="text-red-400">CNST, JUDL, ELCT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Overbought Sectors:</span>
                <span className="text-green-400">STRT, POPL</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Volume Anomalies:</span>
                <span className="text-yellow-400">ELCT, POPL</span>
              </div>
            </div>
            <div className="border-t border-gray-700 pt-4">
              <p className="text-sm">
                <span className="font-semibold">Reversal Window:</span> 2032-2041
              </p>
              <p className="text-sm mt-1">
                <span className="font-semibold">Catalyst:</span> Constitutional Crisis
              </p>
            </div>
          </div>
        </div>
      </div>

      {showEquations && <EquationsPanel />}
    </div>
  );

  const renderCommodities = () => (
    <div className="space-y-6">
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Political Commodities Market</h3>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={commodities}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} stroke="#9CA3AF" fontSize={12} />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
              labelStyle={{ color: '#F3F4F6' }}
            />
            <Legend />
            <Bar dataKey="current" fill="#3B82F6" name="Current Value" />
            <Bar dataKey="volatility" fill="#EF4444" name="Volatility" />
            <Line type="monotone" dataKey="baseline" stroke="#10B981" strokeWidth={2} strokeDasharray="5 5" name="Historical Baseline" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {commodities.map((commodity) => (
          <CommodityCard key={commodity.name} commodity={commodity} />
        ))}
      </div>

      {showEquations && <EquationsPanel />}
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Political Market Analysis Terminal</h1>
          <p className="text-gray-400">400-Year Trajectory Model | φ-Ratio Optimization | Einstein-Johnson Framework</p>
        </header>

        <Navigation />
        <AlertBanner />

        {selectedView === 'overview' && renderOverview()}
        {selectedView === 'stress' && renderStressTest()}
        {selectedView === 'commodities' && renderCommodities()}

        <footer className="mt-12 pt-8 border-t border-gray-700 text-sm text-gray-400">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <span className="font-semibold">Current Phase:</span> Modern Perigee (2025)
              <div className="text-xs mt-1">t = 236 years, θ = 283.5°</div>
            </div>
            <div>
              <span className="font-semibold">Next Nodal Crossing:</span> 2028
              <div className="text-xs mt-1">Δt = 3 years, Δθ = 6.75°</div>
            </div>
            <div>
              <span className="font-semibold">Reform Window:</span> 2032-2041
              <div className="text-xs mt-1">P_reform = 0.618 ± 0.137</div>
            </div>
          </div>
          <div className="mt-4 text-xs">
            Based on Katherine Johnson orbital mechanics, φ-ratio cycles, Einstein field equations, and 753 AUC Rome foundation patterns
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PoliticalMarketApp;