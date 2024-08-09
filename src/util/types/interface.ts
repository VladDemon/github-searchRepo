export interface GitHubRepository {
    id: number;
    name: string;
    language: string;
    forks_count: number;
    stargazers_count: number;
    updated_at: string;
    description?: string;
    license?: {
      name: string;
    };
}
 
export interface GitHubApiResponse {
    items: GitHubRepository[];
    total_count: number;
}
