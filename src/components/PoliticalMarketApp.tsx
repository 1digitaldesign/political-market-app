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

  // Historical trajectory data with calibration markers
  const trajectoryData = [
    { year: 1789, democracy: 100, crisis: 0, reform: 0, phase: 'Foundation', isCalibration: true, event: 'US Constitution (July 4, 1776 + 13 years)' },
    { year: 1860, democracy: 89, crisis: 55, reform: 8, phase: 'First Perigee', isCalibration: true, event: 'Dec 20: South Carolina Secession' },
    { year: 1865, democracy: 55, crisis: 89, reform: 34, phase: 'Crisis Peak', isCalibration: true, event: 'Reconstruction' },
    { year: 1917, democracy: 55, crisis: 89, reform: 34, phase: 'WWI Entry', isCalibration: true, event: 'US enters World War I (April 6)' },
    { year: 1932, democracy: 34, crisis: 144, reform: 55, phase: 'Depression', isCalibration: true, event: 'New Deal Era' },
    { year: 1941, democracy: 21, crisis: 233, reform: 89, phase: 'WWII Entry', isCalibration: true, event: 'Pearl Harbor - WWII (Dec 7)' },
    { year: 1949, democracy: 55, crisis: 89, reform: 55, phase: 'China Mirror', isCalibration: true, event: 'PRC Founded (Oct 1) - 173 years after US' },
    { year: 1965, democracy: 89, crisis: 34, reform: 144, phase: 'Rights Expansion', isCalibration: true, event: 'Civil Rights Act' },
    { year: 2000, democracy: 144, crisis: 13, reform: 8, phase: 'Y2K Inflection', isCalibration: true, event: 'Y2K Bug - Digital Singularity Fear' },
    { year: 2001, democracy: 144, crisis: 21, reform: 13, phase: 'Peak Stability', isCalibration: true, event: '9/11 - Patriot Act' },
    { year: 2012, democracy: 89, crisis: 55, reform: 13, phase: 'Mayan Mirror', isCalibration: true, event: 'Dec 21: Mayan Calendar End (152yr echo of 1860)' },
    { year: 2021, democracy: 55, crisis: 89, reform: 21, phase: 'Modern Perigee', isCalibration: true, event: 'Jan 6: Capitol Breach' },
    { year: 2025, democracy: 34, crisis: 144, reform: 34, phase: 'Current', isCalibration: false, event: 'Present Day' },
    { year: 2032, democracy: 21, crisis: 233, reform: 55, phase: 'Projected Crisis', isCalibration: false, event: 'Constitutional Crisis' },
    { year: 2041, democracy: 13, crisis: 377, reform: 89, phase: 'Maximum Pressure', isCalibration: false, event: 'System Rupture Point' },
    { year: 2053, democracy: 89, crisis: 55, reform: 144, phase: 'Reform Wave', isCalibration: false, event: 'New Framework' },
    { year: 2065, democracy: 144, crisis: 34, reform: 89, phase: 'Stabilization', isCalibration: false, event: 'Re-stabilization' }
  ];

  // Punic Wars reference data for historical parallels
  const punicWarsData = [
    { war: 'First Punic War', years: '264-241 BCE', duration: 23, outcome: 'Roman Victory', parallel: '1776-1799: Revolutionary Period' },
    { war: 'Second Punic War', years: '218-201 BCE', duration: 17, outcome: 'Roman Victory (Hannibal)', parallel: '1861-1878: Civil War/Reconstruction' },
    { war: 'Third Punic War', years: '149-146 BCE', duration: 3, outcome: 'Carthage Destroyed', parallel: '2039-2042: Projected System Break' }
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
    { indicator: 'System Pressure (Abscess Point)', value: 610, threshold: 377, status: 'RUPTURE IMMINENT' }
  ];

  // Multi-civilization base calculations
  const civilizationBases = [
    { 
      name: 'Babylonian', 
      base: 60, 
      description: 'Sexagesimal (base-60)', 
      yearZero: -3760, // 3761 BCE
      currentYear: (2025 - (-3760)),
      crisis: Math.floor((2025 - (-3760)) / 60) % 60
    },
    { 
      name: 'Mayan', 
      base: 20, 
      description: 'Vigesimal (base-20) with Long Count',
      yearZero: -3114, // August 11, 3114 BCE
      currentYear: (2025 - (-3114)),
      crisis: Math.floor((2025 - (-3114)) / 20) % 20
    },
    { 
      name: 'Decimal', 
      base: 10, 
      description: 'Modern decimal (base-10)',
      yearZero: 0,
      currentYear: 2025,
      crisis: Math.floor(2025 / 10) % 10
    },
    { 
      name: 'Binary', 
      base: 2, 
      description: 'Computer binary (base-2)',
      yearZero: 1946, // ENIAC
      currentYear: (2025 - 1946),
      crisis: Math.floor((2025 - 1946) / 2) % 2
    },
    { 
      name: 'Duodecimal', 
      base: 12, 
      description: 'Ancient base-12 (dozens)',
      yearZero: -753, // Rome founding
      currentYear: (2025 - (-753)),
      crisis: Math.floor((2025 - (-753)) / 12) % 12
    }
  ];

  // Calculate convergence points across all bases
  const calculateConvergence = (year: number): number => {
    return civilizationBases.reduce((acc, civ) => {
      const yearsSinceZero = year - civ.yearZero;
      const cyclePosition = (yearsSinceZero % civ.base) / civ.base;
      return acc + cyclePosition;
    }, 0) / civilizationBases.length;
  };

  // Historical echo calculation
  const calculateEcho = (year1: number, year2: number): string => {
    const diff = Math.abs(year2 - year1);
    const cycles = diff / 160;
    return `${diff} years (${cycles.toFixed(2)} cycles)`;
  };

  const equations = [
    {
      id: 'babylonian_torah',
      title: 'Babylonian-Jewish Temporal Horizon (Base-60)',
      math: '∮_{Tishrei}^{Elul} Ψ_{Torah} = ∫[Ψ_613(mitzvot) × Ω_Kabbalah(Sefirot₁₀) × H_Talmud(60t) × L_Halakha(SHULCHAN) × N_Ayn(∞)] dt',
      description: 'Torah cycle through 613 commandments, Kabbalistic Sefirot (10 emanations), Talmudic sexagesimal time cycles, Halakhic legal framework (Shulchan Aruch), reaching the infinite light (Ayn Sof). Event horizon at sacred boundary.'
    },
    {
      id: 'mayan_popol',
      title: 'Mayan Popol Vuh Curvature (Base-20)',
      math: 'R_{Hunab} - ½g_{Ku}R + Λ_{Xibalba} = (20π·Kukulkan/c⁴)T_{Baktun}^{society}',
      description: 'Curvature of cosmic order through Hunab Ku (One Giver of Movement). Λ_Xibalba = underworld constant (dark spiritual energy). T_Baktun = stress-energy of Long Count cycles. When R > Feathered Serpent limit, reality shifts to Xibalba.'
    },
    {
      id: 'hindu_dharma',
      title: 'Vedic Dharma Algebra: Satya vs Rta (Base-10)',
      math: '[X_Satya, X_Rta] = iℏδ_{Maya}X_Brahman where δ_{Maya} = 4.669201609...',
      description: 'Commutator reveals Maya (illusion) constant from Upanishads. Satya = ultimate truth (Brahman). Rta = cosmic order (dharmic consistency). Brahman tensor measures universal forces. [Truth, Order] = Illusion × Cosmic Deformation per Bhagavad Gita 2.47.'
    },
    {
      id: 'binary_iching',
      title: 'I Ching Binary Transfer Trajectory (Base-2)',
      math: 'r(θ) = Tao(1-Yin²)/(1 + Yang·cos(θ - Wu_Wei)) with Δv = √(Te/Qi₁)[√(2Qi₂/(Qi₁+Qi₂)) - 1]',
      description: 'Political Wu Wei (effortless action) orbit between Yin-Yang states per Tao Te Ching. Eccentricity follows golden mean of Dao. Inclination matches I Ching hexagram angles. Angular velocity Wu_Wei enables natural societal transitions through Te (virtue).'
    },
    {
      id: 'roman_fate',
      title: 'Roman Fatum Bifurcation Cascade (Base-12)',
      math: 'δ_{Fatum} = lim_{n→∞} (Aeneas_{n-1} - Sibylla_{n-2})/(Imperium_n - Augustus_{n-1}) = 4.669201609...',
      description: 'Universal constant of Roman fate per Aeneid Book VI. Each bifurcation doubles imperial chaos through Sibylline prophecy. After n=∞ bifurcations: complete civilizational collapse. Current n=7.3, approaching Sibylline strange attractor at n=8 (2032 CE = 2785 AUC).'
    },
    {
      id: 'talmud_wisdom',
      title: 'Talmudic Wisdom Pressure Limit (Base-60)',
      math: 'dP/dr = -(Chochmah + P)(Mishna + 4πr³P/c²)G_Elohim/(r²(1 - 2G_Adonai·Mishna/rc²))',
      description: 'Maximum wisdom (Chochmah) before Talmudic system collapse to Ein Sof singularity. Rabbinic degeneracy pressure vs divine gravitational pull. Current Mishna/Gemara ratio = 0.89. Critical at unity per Pirkei Avot teachings.'
    },
    {
      id: 'xibalba_entropy',
      title: 'Xibalba Underworld Entropy (Base-20)',
      math: 'S_{Xibalba} = (k_Itzamna·c³·A)/(4ℏ·Kukulkan) = k_B(A/4l_{Hunab}²) where A = 20π·Kukulkan²M²/c⁴',
      description: 'Xibalba entropy proportional to underworld boundary area per Popol Vuh. Information paradox: souls crossing to Xibalba lose memory degrees of freedom. Kukulkan radiation gives spiritual evaporation time until next Baktun cycle reset.'
    },
    {
      id: 'vedic_cycles',
      title: 'Vedic Kalpa Cyclic Cosmology (Base-10)',
      math: 'Ω_{Kalpa} = ∫∫ Brahman_{αβγδ}Brahman^{αβγδ}√-g d⁴x → Pralaya⁺ ≅ Srishti⁻',
      description: 'Brahman curvature hypothesis from Vedas: Universe cycles through Kalpas (aeons). Future dissolution (Pralaya) conformally equivalent to past creation (Srishti). Conformal navigation between Yugas per Puranic cycles. Current Kali Yuga ending approaches.'
    },
    {
      id: 'tao_vortex',
      title: 'Tao Te Ching Rotating Vortex (Base-2)',
      math: 'ds² = -(1-Dao_s r/ρ²)c²dt² + (ρ²/Δ_Wu)dr² + ρ²dθ² + sin²θ(r²+Te²+Dao_s r·Te²sin²θ/ρ²)dφ² - (2Dao_s r·Te sin²θ/ρ²)c dt dφ',
      description: 'Rotating Dao singularity per Lao Tzu teachings. Angular momentum Te = virtue/mass (spiritual rotation). Wu Wei sphere allows energy extraction through effortless action. Frame dragging by Dao prevents escape when virtue exceeds unity.'
    },
    {
      id: 'aeneid_decay',
      title: 'Roman Imperium Vacuum Decay (Base-12)',
      math: 'Γ/V = Fortuna·e^{-Virtus/ℏ} where Virtus = ∫₀^{r₀} dr·12π²r³|dΦ_{Fatum}/dr|√(2V_{Imperium}(Φ))',
      description: 'Probability of imperial decay to true res publica per Aeneid prophecy. Current metastable principatus (false republic). Sibylline bubble nucleation rate. If Fortuna bubble forms, expands destroying imperium. Virtus = Roman virtue bounce action from Ciceronian ideals.'
    },
    {
      id: 'kabbalah_sefirot',
      title: 'Kabbalistic Sefirot Correspondence (Base-60)',
      math: 'Z_{Malkhut}[φ₀] = Z_{Ayn_Sof}[φ|_{∂Pardes} = φ₀]',
      description: 'Kabbalistic principle: 4-world (Arba Olamot) Ein Sof dual to 3-world manifest Sefirot field theory. Political reality is projection from Keter boundary. Information on Tree of Life boundary determines Tikkun Olam (world repair) dynamics per Zohar teachings.'
    },
    {
      id: 'unified_dharma',
      title: 'Multi-Civilization Dharma Unification (All Bases)',
      math: 'S_{Dharma} = (1/2κ_{Om}²)∫d¹¹x√-g[R_{Torah} - ½|Popol₄|² - (1/48)Vedas₃∧I_Ching₄∧Aeneid₄] + S_{Babylon2} + S_{Rome5}',
      description: '11D spiritual gravity: 7 hidden worlds + 3 manifest + 1 eternal time. Torah-branes (sheets of law) and Aeneid-branes (5D destiny). Higher-dimensional observation through mystical texts. When spiritual coupling approaches infinity, unified dharma theory emerges across all 5 civilizations.'
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
        'UNPRECEDENTED': 'text-purple-400',
        'RUPTURE IMMINENT': 'text-red-500 animate-pulse'
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
        onClick={() => setSelectedView('calibration')}
        className={`pb-4 px-2 ${selectedView === 'calibration' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
      >
        Calibration Data
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
              content={(props) => {
                const { active, payload } = props;
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-gray-900 p-3 border border-gray-700 rounded">
                      <p className="font-semibold text-white">{data.year}</p>
                      {data.event && (
                        <p className="text-xs text-gray-400 mb-2">{data.event}</p>
                      )}
                      <p className="text-sm">Democracy: {data.democracy}</p>
                      <p className="text-sm">Crisis: {data.crisis}</p>
                      <p className="text-sm">Pressure Relief: {data.reform}</p>
                      <p className="text-xs text-gray-500 mt-1">{data.phase}</p>
                      {data.isCalibration && (
                        <p className="text-xs text-yellow-400 mt-1">📍 Calibration Point</p>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="democracy" stroke="#3B82F6" strokeWidth={2} name="Democracy Index" />
            <Line type="monotone" dataKey="crisis" stroke="#EF4444" strokeWidth={2} name="Crisis Level" />
            <Line type="monotone" dataKey="reform" stroke="#10B981" strokeWidth={2} name="Pressure Relief Need" />
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
              <div className="text-5xl font-bold text-red-400">3.7%</div>
              <div className="text-gray-400 mt-2">Schwarzschild Escape Probability</div>
              <div className="text-xs text-gray-500 mt-1">
                P = (1 - Ω)² × √(1 - v²/c²) × e^{-4.669} = (0.42)² × 0.47 × 0.0094 = 0.037
              </div>
              <div className="text-xs text-gray-500 mt-1">
                [Accuracy, Precision] = iℏδ_chaos W_Weyl | δ = 4.669 (Feigenbaum constant)
              </div>
              <div className="text-xs text-red-500 mt-1">
                Event horizon: r_s = 2GM/c² = 7.3 years | Hawking evaporation: 10^67 years
              </div>
              <div className="text-xs text-purple-500 mt-1">
                Currently in ergosphere: Energy extraction possible via Penrose process
              </div>
              <div className="text-xs text-yellow-400 mt-2">
                Gibbon parallel: Rome 410 CE (Visigoth sack) = USA 2032 (410 + 1622 years)
              </div>
              <div className="text-xs text-red-400 mt-1">
                ⚠️ All 6 Gibbon vectors active: Exact match to Rome's final decade
              </div>
              <div className="text-xs text-purple-400 mt-1">
                Einstein-Rosen bridge forming: Information paradox at event horizon
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
                <span className="font-semibold">Critical Window:</span> 2032-2041
              </p>
              <p className="text-sm mt-1">
                <span className="font-semibold">Catalyst:</span> Core Collapse (Si → Fe transition)
              </p>
              <p className="text-sm mt-1">
                <span className="font-semibold">Type:</span> Political Type II Supernova
              </p>
              <p className="text-sm mt-1">
                <span className="font-semibold">Remnant:</span> Neutron state or Black hole
              </p>
            </div>
          </div>
        </div>
      </div>

      {showEquations && <EquationsPanel />}
    </div>
  );

  const renderCalibration = () => (
    <div className="space-y-6">
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">📍 Calibration Points (Historical Events Used for Model Validation)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold text-blue-400 mb-3">US Historical Events</h4>
            <div className="space-y-2">
              {trajectoryData.filter(d => d.isCalibration && d.year <= 2021).map(d => (
                <div key={d.year} className="flex items-start gap-2">
                  <span className="text-yellow-400 font-mono min-w-[50px]">{d.year}:</span>
                  <span className="text-gray-300 text-sm">{d.event}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-orange-400 mb-3">Key Observations</h4>
            <div className="space-y-3">
              <div className="bg-gray-800 p-3 rounded">
                <p className="text-sm font-semibold text-orange-400 mb-1">Mayan Calendar Mirror</p>
                <p className="text-xs text-gray-400">
                  2012 - 1860 = 152 years ≈ 160-year cycle
                </p>
                <p className="text-xs text-gray-500">
                  Mayan calendar end mirrors Civil War timing
                </p>
              </div>
              <div className="bg-gray-800 p-3 rounded">
                <p className="text-sm font-semibold text-purple-400 mb-1">Y2K Binary Overflow</p>
                <p className="text-xs text-gray-400">
                  2000: Binary system critical point
                </p>
                <p className="text-xs text-gray-500">
                  Digital civilization's first existential fear
                </p>
              </div>
              <div className="bg-gray-800 p-3 rounded">
                <p className="text-sm font-semibold text-blue-400 mb-1">Superpower Offset</p>
                <p className="text-xs text-gray-400">
                  US (1776) → China (1949) = 173 years
                </p>
                <p className="text-xs text-gray-500">
                  Both superpowers on offset cycles
                </p>
              </div>
              <div className="bg-gray-800 p-3 rounded">
                <p className="text-sm font-semibold text-red-400 mb-1">Punic Wars Pattern</p>
                <p className="text-xs text-gray-400">
                  1st (23y), 2nd (17y), 3rd (3y) → Total destruction
                </p>
                <p className="text-xs text-gray-500">
                  Third war ended with Carthage eliminated
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Multi-Civilization Base System Analysis</h3>
        <div className="space-y-4">
          {civilizationBases.map((civ) => {
            const convergence = calculateConvergence(2025);
            const criticalYears = [2000, 2012, 2025, 2032, 2041].map(y => ({
              year: y,
              value: ((y - civ.yearZero) % civ.base) / civ.base
            }));
            
            return (
              <div key={civ.name} className="bg-gray-800 p-4 rounded">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-blue-400">{civ.name} System</h4>
                    <p className="text-xs text-gray-400">{civ.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-yellow-400">Base-{civ.base}</p>
                    <p className="text-xs text-gray-500">Year {civ.currentYear}</p>
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-2 text-xs mt-3">
                  {criticalYears.map(cy => (
                    <div key={cy.year} className="text-center">
                      <div className="text-gray-500">{cy.year}</div>
                      <div className={`font-mono ${cy.value > 0.8 ? 'text-red-400' : cy.value > 0.5 ? 'text-yellow-400' : 'text-green-400'}`}>
                        {(cy.value * 100).toFixed(0)}%
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"
                    style={{ width: `${(((2025 - civ.yearZero) % civ.base) / civ.base) * 100}%` }}
                  />
                </div>
              </div>
            );
          })}
          
          <div className="bg-yellow-900/20 border border-yellow-800 rounded p-3 mt-4">
            <p className="text-sm font-semibold text-yellow-400">Nuclear Astrophysics Convergence</p>
            <p className="text-xs text-gray-300 mt-1">
              2000 (Y2K): Electron degeneracy pressure peak (white dwarf phase)
            </p>
            <p className="text-xs text-gray-300">
              2012: Carbon fusion ignition (Mayan Long Count = 12C burning)
            </p>
            <p className="text-xs text-gray-300">
              2025: Silicon burning phase (28-day cycle to iron core)
            </p>
            <p className="text-xs text-orange-400 mt-1">
              2032: Iron core mass = 1.44 M☉ (Chandrasekhar limit)
            </p>
            <p className="text-xs text-red-400 mt-1">
              2041: Core collapse in 0.25 seconds → Type II supernova
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Cycle Analysis & Projections</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800 p-4 rounded">
            <h4 className="font-semibold text-green-400 mb-2">160-Year Cycle</h4>
            <div className="space-y-1 text-xs">
              <p>1776 + 160 = 1936 (Depression)</p>
              <p>1860 + 160 = 2020 (Pandemic/Jan 6)</p>
              <p>1865 + 160 = 2025 (Current)</p>
              <p>1941 + 160 = 2101 (Future cycle)</p>
              <p>2000 - 1840 = 160 (Y2K echo)</p>
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded">
            <h4 className="font-semibold text-yellow-400 mb-2">War Entry Pattern</h4>
            <div className="space-y-1 text-xs">
              <p>WWI: 1917 (141 years from 1776)</p>
              <p>WWII: 1941 (165 years ≈ 160 cycle)</p>
              <p>Next?: 2101 (160 years from 1941)</p>
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded">
            <h4 className="font-semibold text-red-400 mb-2">Critical Windows</h4>
            <div className="space-y-1 text-xs">
              <p>2032: Constitutional Crisis Peak</p>
              <p>2039-2042: "Third Punic" Period</p>
              <p>2041: Maximum System Pressure</p>
              <p>2053: Reform Window Opens</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Historical Parallels: Punic Wars & Modern Conflicts</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {punicWarsData.map((war) => (
            <div key={war.war} className="bg-gray-800 p-4 rounded">
              <h4 className="font-semibold text-yellow-400">{war.war}</h4>
              <p className="text-sm text-gray-400">{war.years}</p>
              <p className="text-xs text-gray-500">Duration: {war.duration} years</p>
              <p className="text-xs text-red-400 mt-2">{war.outcome}</p>
              <div className="mt-2 pt-2 border-t border-gray-700">
                <p className="text-xs text-blue-400">US Parallel:</p>
                <p className="text-xs text-gray-400">{war.parallel}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-700 text-sm text-gray-400">
          <p className="text-yellow-400 font-semibold mb-2">⚠️ Historical Warning:</p>
          <p>The Third Punic War (149-146 BCE) lasted only 3 years but ended with:</p>
          <ul className="list-disc list-inside ml-2 mt-1 text-xs space-y-1">
            <li>Complete destruction of Carthage</li>
            <li>City burned for 17 days</li>
            <li>Salt sown into the earth</li>
            <li>50,000 survivors sold into slavery</li>
            <li>End of Carthaginian civilization</li>
          </ul>
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
        {selectedView === 'calibration' && renderCalibration()}

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
              <span className="font-semibold">Core Collapse Window:</span> 2032-2041
              <div className="text-xs mt-1">P_relief = 0.117 ± 0.046 (Gibbon-calibrated)</div>
              <div className="text-xs text-red-400">⚠️ Newton's Third Law: Reaction force exceeds action</div>
              <div className="text-xs text-purple-400">Maxwell: ∇·E = ρ/ε₀ (charge density critical)</div>
              <div className="text-xs text-yellow-400">Einstein: Spacetime curvature → ∞ at singularity</div>
              <div className="text-xs text-orange-400">Gibbon: "The story of its ruin is simple and obvious"</div>
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