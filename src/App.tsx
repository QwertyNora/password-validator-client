
import { useState } from 'react'
import type { PasswordRule } from './types/types';


function App() {
  const [password, setPassword] = useState('');

 

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


  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Password Validator</h1>
        <p className="text-gray-600 mb-6">Check if your password meets security requirements</p>
      </div>
    </div>
  )
}

export default App
