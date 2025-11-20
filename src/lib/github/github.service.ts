// src/lib/github/github.service.ts
import axios from 'axios';
import { prisma } from '../prisma/client';

export class GitHubService {
  static async linkAccount(code: string, userId: string) {
    try {
      const tokenResponse = await axios.post(
        'https://github.com/login/oauth/access_token',
        {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        {
          headers: { Accept: 'application/json' },
        }
      );

      const accessToken = tokenResponse.data.access_token;

      // Obtener información del usuario de GitHub
      const userResponse = await axios.get('https://api.github.com/user', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const githubUser = userResponse.data;

      // Obtener repositorios del usuario
      const reposResponse = await axios.get('https://api.github.com/user/repos', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      // Crear o actualizar la cuenta de GitHub
      const githubAccount = await prisma.githubAccount.upsert({
        where: { userId },
        create: {
          githubId: githubUser.id.toString(),
          accessToken,
          username: githubUser.login,
          userId,
        },
        update: {
          accessToken,
          username: githubUser.login,
        },
        include: {
          repositories: true
        }
      });

      // Crear o actualizar repositorios
      const repositories = await Promise.all(
        reposResponse.data.map(async (repo: { id: number; name: string; description: string; html_url: string; private: boolean }) => {
          return prisma.repository.upsert({
        where: {
          id: repo.id.toString()
        },
        create: {
          id: repo.id.toString(),
          name: repo.name,
          description: repo.description,
          url: repo.html_url,
          isPublic: !repo.private,
          githubAccountId: githubAccount.id,
        },
        update: {
          name: repo.name,
          description: repo.description,
          url: repo.html_url,
          isPublic: !repo.private,
        },
          });
        })
      );

      console.log(`Synchronized ${repositories.length} repositories`);

      return {
        ...githubAccount,
        repositories
      };
    } catch (error) {
      console.error('Error in linkAccount:', error);
      throw new Error('Failed to link GitHub account');
    }
  }

  static async getRepositories(userId: string) {
    try {
      const githubAccount = await prisma.githubAccount.findUnique({
        where: { userId },
        include: {
          repositories: {
            orderBy: {
              name: 'asc'
            }
          }
        },
      });

      if (!githubAccount) {
        throw new Error('GitHub account not found');
      }

      // Actualizar repositorios desde GitHub
      const response = await axios.get('https://api.github.com/user/repos', {
        headers: { Authorization: `Bearer ${githubAccount.accessToken}` },
      });

      // Actualizar repositorios en la base de datos
      const updatedRepos = await Promise.all(
        response.data.map(async (repo: { id: number; name: string; description: string; html_url: string; private: boolean }) => {
          return prisma.repository.upsert({
        where: {
          id: repo.id.toString()
        },
        create: {
          id: repo.id.toString(),
          name: repo.name,
          description: repo.description,
          url: repo.html_url,
          isPublic: !repo.private,
          githubAccountId: githubAccount.id,
        },
        update: {
          name: repo.name,
          description: repo.description,
          url: repo.html_url,
          isPublic: !repo.private,
        },
          });
        })
      );

      return updatedRepos;
    } catch (error) {
      console.error('Error in getRepositories:', error);
      throw new Error('Failed to fetch repositories');
    }
  }
}