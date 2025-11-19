import React, { useState, useEffect } from 'react';
import { User, MapPin, Calendar, ShoppingBag, Activity, BarChart2, RefreshCw } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-800">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-600">
            <Activity className="w-6 h-6" />
            <span className="font-bold text-xl tracking-tight">PredictAI</span>
          </div>
          <div className="text-sm font-medium text-slate-500">
            Shopping Behavior Model v1.0
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8 grid lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: INPUT FORM */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-500" />
              Customer Demographics
            </h2>
            
            <div className="space-y-4">
              {/* Age Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
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
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <span className="text-indigo-600 font-bold w-8 text-right">{inputs.age}</span>
                </div>
              </div>

              {/* Gender Select */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  Gender
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {GENDERS.map(g => (
                    <button
                      key={g}
                      onClick={() => setInputs({...inputs, gender: g})}
                      className={`py-2 rounded-lg text-sm font-medium transition-all ${
                        inputs.gender === g 
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location Select */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> Location
                </label>
                <select 
                  name="location" 
                  value={inputs.location} 
                  onChange={handleInputChange}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                >
                  {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-indigo-500" />
              Context & Preferences
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Season */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Season
                </label>
                <select 
                  name="season" 
                  value={inputs.season} 
                  onChange={handleInputChange}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  {SEASONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Color Preference */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  Favorite Color
                </label>
                <select 
                  name="color" 
                  value={inputs.color} 
                  onChange={handleInputChange}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  {COLORS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>

          <button 
            onClick={calculatePrediction}
            disabled={isAnimating}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition-all text-white font-semibold rounded-xl shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
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
              <div className="bg-indigo-900 text-white rounded-2xl p-8 relative overflow-hidden shadow-xl">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-indigo-400 opacity-20 rounded-full blur-xl"></div>

                <div className="relative z-10">
                  <p className="text-indigo-200 font-medium mb-1 text-sm uppercase tracking-widest">Model Prediction</p>
                  <h1 className="text-4xl font-bold mb-2 text-white">
                    {prediction.category}
                  </h1>
                  <p className="text-indigo-200 max-w-md leading-relaxed">
                    Based on demographics and seasonality, the model predicts this customer is highly likely to purchase 
                    <span className="font-semibold text-white"> {prediction.category.toLowerCase()}</span>.
                  </p>
                </div>
              </div>

              {/* Confidence Metrics */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex-1">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <BarChart2 className="w-5 h-5 text-indigo-500" />
                    Class Probability Distribution
                  </h3>
                  <span className="text-xs font-medium bg-slate-100 text-slate-500 px-2 py-1 rounded">Random Forest Estimator</span>
                </div>

                <div className="space-y-5">
                  {Object.entries(prediction.confidence)
                    .sort(([,a], [,b]) => b - a)
                    .map(([key, value], index) => (
                    <div key={key} className="group">
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className={`font-medium ${index === 0 ? 'text-indigo-600' : 'text-slate-600'}`}>
                          {key}
                        </span>
                        <span className="font-bold text-slate-700">{value.toFixed(1)}%</span>
                      </div>
                      <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ease-out ${
                            index === 0 ? 'bg-indigo-500' : 'bg-slate-300 group-hover:bg-slate-400'
                          }`}
                          style={{ width: `${value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100">
                  <h4 className="text-sm font-bold text-slate-800 mb-3">Why this result?</h4>
                  <div className="flex flex-wrap gap-2">
                    {inputs.season === "Winter" && (
                      <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-100">
                        ❄️ Season (Winter)
                      </span>
                    )}
                    {inputs.season === "Summer" && (
                      <span className="text-xs bg-orange-50 text-orange-700 px-3 py-1 rounded-full border border-orange-100">
                        ☀️ Season (Summer)
                      </span>
                    )}
                     {inputs.age < 25 && (
                      <span className="text-xs bg-purple-50 text-purple-700 px-3 py-1 rounded-full border border-purple-100">
                        🎓 Young Demographic
                      </span>
                    )}
                    <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full border border-slate-200">
                      📍 {inputs.location} Trend
                    </span>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="h-full flex items-center justify-center bg-white rounded-2xl border border-dashed border-slate-300 text-slate-400">
              Click "Run Prediction" to see results
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;