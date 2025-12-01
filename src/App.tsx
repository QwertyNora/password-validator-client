
import { useState } from 'react'
import type { PasswordRule, ValidationResponse } from './types/types';
import { CheckCircle, Eye, EyeOff, Lock, XCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

const PASSWORD_RULES: PasswordRule[] = [
  { label: "At least 8 characters", test: (p) => p.length >= 8 },
  { label: "At least one uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { label: "At least one lowercase letter", test: (p) => /[a-z]/.test(p) },
  { label: "At least one number", test: (p) => /[0-9]/.test(p) },
  {
    label: "At least one special character",
    test: (p) => /[!@#$%^&*()_+\-=\[\]{};':\"\\|,.<>\/?]/.test(p),
  },
];


function App() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [result, setResult] = useState<ValidationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const validated = PASSWORD_RULES.map((rule) => ({
    label: rule.label,
    valid: rule.test(password),
  }));

  const allPasswordValid = validated.every((item) => item.valid);

  const handleValidate = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5094/api/password/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error validating password:', error);
      alert('Failed to validate password. Make sure the API is running!');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 p-8 rounded-xl shadow-md bg-white">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-800">Password Validator</h1>
          <p className="text-gray-600">Check if your password meets security requirements</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleValidate();
          }}
          className="space-y-5"
          >
          <div className="relative">
            <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              placeholder="Enter your password"
              className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>

            <AnimatePresence>
              {isFocused && password.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute left-0 mt-2 w-full rounded-lg shadow-lg p-4 border text-sm z-10 ${
                    allPasswordValid
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <ul className="space-y-2">
                    {validated.map((item) => (
                      <li
                        key={item.label}
                        className={`flex items-center gap-2 transition-colors ${
                          item.valid ? 'text-green-700' : 'text-gray-500'
                        }`}
                      >
                        {item.valid ? (
                          <CheckCircle size={16} className="text-green-600" />
                        ) : (
                          <XCircle size={16} className="text-red-500" />
                        )}
                        {item.label}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button
            type="submit"
            disabled={!password || loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
          >
            {loading ? 'Validating...' : 'Validate Password'}
          </button>

          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-4 rounded-lg ${
                result.isValid
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-red-50 border border-red-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{result.isValid ? '✅' : '❌'}</span>
                <h3
                  className={`font-semibold ${
                    result.isValid ? 'text-green-800' : 'text-red-800'
                  }`}
                >
                  {result.isValid ? 'Password is Valid!' : 'Password is Invalid'}
                </h3>
              </div>

              {!result.isValid && result.errors.length > 0 && (
                <ul className="space-y-1 mt-3">
                  {result.errors.map((error, index) => (
                    <li key={index} className="text-sm text-red-700 flex items-start gap-2">
                      <span className="text-red-500 mt-0.5">•</span>
                      <span>{error}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          )}
        </form>
      </div>
    </div>
  )
}

export default App
