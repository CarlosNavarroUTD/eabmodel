// src/app/dashboard/profile/page.tsx
'use client';
import { useState, useEffect } from 'react';

interface Repository {
  id: string;
  name: string;
  description: string | null;
  url: string;
  isPublic: boolean;
}

export default function Profile() {
  const [user, setUser] = useState<{ email: string; name: string | null; position?: string; phone?: string } | null>(null);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProfileAndRepos();
  }, []);

  const fetchProfileAndRepos = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');

      if (!token) {
        setError('No authentication token found');
        return;
      }

      // Obtener perfil
      const profileResponse = await fetch('/api/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!profileResponse.ok) {
        throw new Error('Failed to fetch profile');
      }

      const profileData = await profileResponse.json();
      setUser(profileData.user);

      // Si hay cuenta de GitHub, obtener repositorios
      if (profileData.githubAccount) {
        const reposResponse = await fetch('/api/github/repositories', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (reposResponse.ok) {
          const reposData = await reposResponse.json();
          setRepositories(reposData.repositories);
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user data found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      
      {/* Información del usuario */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">User Information</h2>
        <div className="space-y-2">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Name:</strong> {user.name || 'Not set'}</p>
          {user.position && <p><strong>Position:</strong> {user.position}</p>}
          {user.phone && <p><strong>Phone:</strong> {user.phone}</p>}
        </div>
      </div>

      {/* Repositorios */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">GitHub Repositories</h2>
        {repositories.length > 0 ? (
          <div className="grid gap-4">
            {repositories.map((repo) => (
              <div key={repo.id} className="border p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{repo.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    repo.isPublic ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {repo.isPublic ? 'Public' : 'Private'}
                  </span>
                </div>
                {repo.description && (
                  <p className="text-gray-600 mb-2">{repo.description}</p>
                )}
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  View on GitHub →
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-600">No repositories found</p>
            <a
              href="/dashboard/github-integration"
              className="text-blue-600 hover:underline mt-2 inline-block"
            >
              Connect your GitHub account
            </a>
          </div>
        )}
      </div>
    </div>
  );
}