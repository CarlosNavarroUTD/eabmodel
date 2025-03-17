'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

export default function GitHubIntegration() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPath, setCurrentPath] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  const linkGitHubAccount = useCallback(async (code: string) => {
    try {
      setIsLoading(true);
      setError('');
      
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('No authentication token found. Please login first.');
        return;
      }

      console.log('Linking GitHub account with code:', code);
      const response = await fetch('/api/github/link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ code })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to link GitHub account');
      }

      console.log('GitHub account linked successfully');
      router.push('/dashboard/profile');
    } catch (error: unknown) {
      console.error('Error linking GitHub account:', error);
      if (error instanceof Error) {
        setError(error.message || 'An error occurred while linking your GitHub account');
      } else {
        setError('An unknown error occurred while linking your GitHub account');
      }
    } finally {
      setIsLoading(false);
    }
  }, [router]); // Include router in dependencies since it's used inside the function

  useEffect(() => {
    // Establecer el path actual
    setCurrentPath(window.location.pathname);

    // Manejar el código de GitHub si existe
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const errorParam = urlParams.get('error');

    if (errorParam) {
      setError('GitHub authorization was denied');
      return;
    }

    if (code) {
      console.log('Received GitHub code:', code);
      linkGitHubAccount(code);
    }
  }, [linkGitHubAccount]); // Now this dependency won't change on every render

  const handleGitHubLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
    
    if (!clientId) {
      setError('GitHub Client ID is not configured');
      console.error('Missing NEXT_PUBLIC_GITHUB_CLIENT_ID environment variable');
      return;
    }

    // Usar el pathname actual para construir la URL de redirección
    const redirectUri = `${window.location.origin}${pathname}`;
    
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: 'repo user',
      state: generateUUID()
    });

    console.log('Redirecting to GitHub with redirect URI:', redirectUri);
    const githubUrl = `https://github.com/login/oauth/authorize?${params.toString()}`;
    window.location.href = githubUrl;
  };

  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">GitHub Integration</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Instructions</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Make sure you have a GitHub account</li>
          <li>Click the &quot;Connect with GitHub&quot; button below</li>
          <li>Authorize the application on GitHub</li>
          <li>Your repositories will be automatically synchronized</li>
        </ol>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <button
          onClick={handleGitHubLogin}
          disabled={isLoading}
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
        >
          {isLoading ? 'Connecting...' : 'Connect with GitHub'}
        </button>

        <div className="text-sm">
          <p>Debug Information:</p>
          <p>Client ID: {process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID ? 'Configured' : 'Not configured'}</p>
          {currentPath && <p>Current Path: {currentPath}</p>}
        </div>
      </div>
    </div>
  );
}