import React, { useState, useEffect } from 'react';
import {
  User,
  MapPin,
  Calendar,
  ShoppingBag,
  Activity,
  BarChart2,
  RefreshCw,
  Sparkles,
  Palette,
  Flame
} from 'lucide-react';

// --- MOCK DATA & LOGIC ---
// In a real production environment, this logic would be handled by the Python backend
// we trained earlier. Here, we simulate that logic to create a responsive UI.

const LOCATIONS = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", 
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", 
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", 
  "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", 
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", 
  "New Hampshire", "New Jersey", "New Mexico", "New York", 
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", 
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", 
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", 
  "West Virginia", "Wisconsin", "Wyoming"
];

const SEASONS = ["Spring", "Summer", "Fall", "Winter"];
const GENDERS = ["Male", "Female"];
const COLORS = ["Gray", "Maroon", "Turquoise", "White", "Charcoal", "Peach", "Violet", "Olive", "Black", "Silver"];

const App = () => {
  // State for form inputs
  const [inputs, setInputs] = useState({
    age: 30,
    gender: "Male",
    location: "New York",
    season: "Spring",
    color: "Gray",
    subscription: "No"
  });

  // State for prediction results
  const [prediction, setPrediction] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Simulation of the Random Forest Logic
  // This function mimics the decision weights a model might learn
  const calculatePrediction = () => {
    setIsAnimating(true);
    
    // Artificial delay to simulate API call
    setTimeout(() => {
      const { age, gender, season } = inputs;
      
      // Base Scores (Clothing is usually dominant in this dataset)
      let scores = {
        "Clothing": 0.40,
        "Footwear": 0.20,
        "Accessories": 0.20,
        "Outerwear": 0.20
      };

      // --- Heuristic Logic (Simulating Model Features) ---
      
      // SEASONAL IMPACT
      if (season === "Winter") {
        scores["Outerwear"] += 0.25;
        scores["Clothing"] += 0.10;
        scores["Footwear"] -= 0.10;
      } else if (season === "Summer") {
        scores["Footwear"] += 0.15; // Sandals/Sneakers
        scores["Accessories"] += 0.15; // Sunglasses/Hats
        scores["Outerwear"] -= 0.20;
      } else if (season === "Spring") {
        scores["Clothing"] += 0.15;
        scores["Footwear"] += 0.05;
      }

      // GENDER IMPACT
      if (gender === "Male") {
        scores["Clothing"] += 0.05;
        scores["Footwear"] += 0.05;
      } else {
        scores["Accessories"] += 0.10; // Jewelry/Handbags often categorize here
        scores["Clothing"] += 0.05;
      }

      // AGE IMPACT
      if (age < 25) {
        scores["Footwear"] += 0.15; // Trend: Younger people buy more shoes
        scores["Accessories"] += 0.05;
      } else if (age > 50) {
        scores["Clothing"] += 0.15; // Trend: Older demographic buys staples
        scores["Accessories"] -= 0.05;
      }

      // Normalize scores to sum to 100%
      const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
      const normalized = {};
      let maxScore = -1;
      let winner = "";

      for (const [cat, score] of Object.entries(scores)) {
        const percent = (score / totalScore) * 100;
        normalized[cat] = percent;
        if (percent > maxScore) {
          maxScore = percent;
          winner = cat;
        }
      }

      setPrediction({
        category: winner,
        confidence: normalized
      });
      setIsAnimating(false);
    }, 600);
  };

  // Auto-predict on load
  useEffect(() => {
    calculatePrediction();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const topConfidence = prediction
    ? Math.max(...Object.values(prediction.confidence || {}))
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-emerald-900 text-slate-100 font-sans selection:bg-emerald-200 selection:text-emerald-900 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,_rgba(120,119,198,0.25),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.28),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(217,70,239,0.22),_transparent_30%)]" />

      {/* Navbar */}
      <nav className="bg-white/10 backdrop-blur-xl border-b border-white/10 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 text-emerald-100">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-emerald-800/40">
              <Activity className="w-6 h-6 text-slate-900" />
            </div>
            <div>
              <span className="font-bold text-xl tracking-tight block leading-tight">PredictAI</span>
              <span className="text-xs text-emerald-200/80">Customer Signal Studio</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm font-medium text-emerald-50">
            <span className="bg-white/10 px-3 py-1 rounded-full border border-white/10 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Aurora Palette v2
            </span>
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-300 to-fuchsia-400 opacity-70 blur-xl" />
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-4 py-10 grid lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: INPUT FORM */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white/10 border border-white/15 rounded-2xl shadow-xl shadow-emerald-900/30 p-6 backdrop-blur-xl">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
              <User className="w-5 h-5 text-emerald-300" />
              Customer Demographics
            </h2>
            
            <div className="space-y-4">
              {/* Age Input */}
              <div>
                <label className="block text-[11px] font-semibold text-emerald-100 uppercase tracking-[0.2em] mb-1.5">
                  Age
                </label>
                <div className="flex items-center gap-4">
                  <input 
                    type="range" 
                    name="age" 
                    min="18" 
                    max="70" 
                    value={inputs.age} 
                    onChange={handleInputChange}
                    className="w-full h-2 bg-gradient-to-r from-emerald-500/30 via-indigo-500/30 to-fuchsia-500/30 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  />
                  <span className="text-emerald-200 font-bold w-10 text-right text-lg">{inputs.age}</span>
                </div>
              </div>

              {/* Gender Select */}
              <div>
                <label className="block text-[11px] font-semibold text-emerald-100 uppercase tracking-[0.2em] mb-1.5">
                  Gender
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {GENDERS.map(g => (
                    <button
                      key={g}
                      onClick={() => setInputs({...inputs, gender: g})}
                      className={`py-2.5 rounded-xl text-sm font-semibold transition-all border ${
                        inputs.gender === g
                          ? 'bg-gradient-to-r from-emerald-400 via-indigo-400 to-fuchsia-400 text-slate-900 shadow-lg shadow-emerald-900/40 border-transparent'
                          : 'bg-white/5 text-emerald-100 hover:bg-white/10 border-white/10'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location Select */}
              <div>
                <label className="block text-[11px] font-semibold text-emerald-100 uppercase tracking-[0.2em] mb-1.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> Location
                </label>
                <select
                  name="location"
                  value={inputs.location}
                  onChange={handleInputChange}
                  className="w-full p-2.5 bg-white/5 border border-white/15 rounded-xl text-sm text-white focus:ring-2 focus:ring-emerald-300 focus:border-emerald-300 outline-none transition-all"
                >
                  {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white/10 border border-white/15 rounded-2xl shadow-xl shadow-emerald-900/30 p-6 backdrop-blur-xl">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
              <ShoppingBag className="w-5 h-5 text-emerald-300" />
              Context & Preferences
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {/* Season */}
              <div>
                <label className="block text-[11px] font-semibold text-emerald-100 uppercase tracking-[0.2em] mb-1.5 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Season
                </label>
                <select
                  name="season"
                  value={inputs.season}
                  onChange={handleInputChange}
                  className="w-full p-2.5 bg-white/5 border border-white/15 rounded-xl text-sm text-white focus:ring-2 focus:ring-emerald-300 outline-none"
                >
                  {SEASONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Color Preference */}
              <div>
                <label className="block text-[11px] font-semibold text-emerald-100 uppercase tracking-[0.2em] mb-1.5 flex items-center gap-1">
                  <Palette className="w-3 h-3" /> Favorite Color
                </label>
                <select
                  name="color"
                  value={inputs.color}
                  onChange={handleInputChange}
                  className="w-full p-2.5 bg-white/5 border border-white/15 rounded-xl text-sm text-white focus:ring-2 focus:ring-emerald-300 outline-none"
                >
                  {COLORS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={calculatePrediction}
            disabled={isAnimating}
            className="w-full py-3.5 bg-gradient-to-r from-emerald-400 via-indigo-400 to-fuchsia-400 hover:from-emerald-300 hover:via-indigo-300 hover:to-fuchsia-300 active:scale-[0.98] transition-all text-slate-900 font-semibold rounded-2xl shadow-xl shadow-emerald-900/30 flex items-center justify-center gap-3 border border-emerald-100/50"
          >
            {isAnimating ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <Activity className="w-5 h-5" />
            )}
            Run Prediction Model
          </button>
        </div>

        {/* RIGHT COLUMN: PREDICTION RESULTS */}
        <div className="lg:col-span-7">
          {prediction ? (
            <div className="h-full flex flex-col gap-6">

              {/* Main Result Card */}
              <div className="bg-gradient-to-br from-slate-900 via-indigo-900 to-emerald-900 text-white rounded-3xl p-8 relative overflow-hidden shadow-2xl border border-white/10">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 -mt-6 -mr-10 w-48 h-48 bg-white opacity-10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -mb-8 -ml-10 w-44 h-44 bg-fuchsia-500 opacity-20 rounded-full blur-3xl"></div>

                <div className="relative z-10">
                  <p className="text-emerald-100 font-medium mb-1 text-sm uppercase tracking-[0.3em]">Model Prediction</p>
                  <h1 className="text-4xl font-extrabold mb-3 text-white drop-shadow-xl">
                    {prediction.category}
                  </h1>
                  <p className="text-emerald-50/80 max-w-2xl leading-relaxed text-lg">
                    Based on demographics and seasonality, the model predicts this customer is highly likely to purchase
                    <span className="font-semibold text-white"> {prediction.category.toLowerCase()}</span>.
                  </p>

                  <div className="mt-6 grid grid-cols-3 gap-3 text-sm">
                    <div className="bg-white/10 border border-white/10 rounded-2xl p-3 flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-200 text-slate-900 flex items-center justify-center font-bold">
                        {Math.round(topConfidence)}%
                      </div>
                      <div>
                        <p className="text-emerald-100/80 text-xs">Peak Confidence</p>
                        <p className="font-semibold text-white">Signal Strength</p>
                      </div>
                    </div>
                    <div className="bg-white/10 border border-white/10 rounded-2xl p-3 flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-400 to-fuchsia-300 text-slate-900 flex items-center justify-center">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-emerald-100/80 text-xs">Palette Mood</p>
                        <p className="font-semibold text-white capitalize">{inputs.color.toLowerCase()}</p>
                      </div>
                    </div>
                    <div className="bg-white/10 border border-white/10 rounded-2xl p-3 flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-amber-300 to-rose-300 text-slate-900 flex items-center justify-center">
                        <Flame className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-emerald-100/80 text-xs">Season Driver</p>
                        <p className="font-semibold text-white">{inputs.season}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Confidence Metrics */}
              <div className="bg-white/10 border border-white/10 rounded-3xl shadow-xl shadow-emerald-900/20 p-6 flex-1 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <BarChart2 className="w-5 h-5 text-emerald-300" />
                    Class Probability Distribution
                  </h3>
                  <span className="text-xs font-medium bg-white/10 text-emerald-100 px-2 py-1 rounded-full border border-white/10">Random Forest Estimator</span>
                </div>

                <div className="space-y-5">
                  {Object.entries(prediction.confidence)
                    .sort(([,a], [,b]) => b - a)
                    .map(([key, value], index) => (
                    <div key={key} className="group">
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className={`font-semibold ${index === 0 ? 'text-emerald-200' : 'text-emerald-50/80'}`}>
                          {key}
                        </span>
                        <span className="font-bold text-white">{value.toFixed(1)}%</span>
                      </div>
                      <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ease-out ${
                            index === 0 ? 'shadow-[0_0_20px_rgba(52,211,153,0.6)]' : 'shadow-[0_0_14px_rgba(255,255,255,0.2)]'
                          }`}
                          style={{
                            width: `${value}%`,
                            background: index === 0
                              ? 'linear-gradient(90deg, #34d399 0%, #6366f1 50%, #f472b6 100%)'
                              : 'linear-gradient(90deg, rgba(255,255,255,0.35) 0%, rgba(148,163,184,0.4) 100%)'
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-300" />
                    Why this result?
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {inputs.season === "Winter" && (
                      <span className="text-xs bg-white/10 text-emerald-100 px-3 py-1 rounded-full border border-white/15 backdrop-blur">
                        ❄️ Season (Winter)
                      </span>
                    )}
                    {inputs.season === "Summer" && (
                      <span className="text-xs bg-white/10 text-emerald-100 px-3 py-1 rounded-full border border-white/15 backdrop-blur">
                        ☀️ Season (Summer)
                      </span>
                    )}
                     {inputs.age < 25 && (
                      <span className="text-xs bg-white/10 text-emerald-100 px-3 py-1 rounded-full border border-white/15 backdrop-blur">
                        🎓 Young Demographic
                      </span>
                    )}
                    <span className="text-xs bg-white/10 text-emerald-100 px-3 py-1 rounded-full border border-white/15 backdrop-blur">
                      📍 {inputs.location} Trend
                    </span>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="h-full flex items-center justify-center bg-white/5 rounded-2xl border border-dashed border-white/20 text-emerald-100">
              Click "Run Prediction" to see results
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;