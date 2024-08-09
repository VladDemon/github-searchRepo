import axios from 'axios';
import { GitHubApiResponse } from '../util/types/interface';


const BASE_URL = 'https://api.github.com/search/repositories';



export const fetchRepositories = async (
  query: string,
  sort: string = 'stars',
  order: string = 'desc',
  page: number = 1,
  perPage: number = 10
): Promise<GitHubApiResponse> => {
  const response = await axios.get<GitHubApiResponse>(BASE_URL, {
    params: {
      q: query,
      sort,
      order,
      page,
      per_page: perPage,
    },
  });

  return response.data;
};
