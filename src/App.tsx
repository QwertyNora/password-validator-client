
import { useState } from 'react'
import type { PasswordRule, ValidationResponse } from './types/types';


function App() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [result, setResult] = useState<ValidationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

 

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

  const handleValidate = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/password/validate', {
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
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Password Validator</h1>
        <p className="text-gray-600 mb-6">Check if your password meets security requirements</p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleValidate();
        }}
        className="space-y-5">

      </form>
    </div>
  )
}

export default App
