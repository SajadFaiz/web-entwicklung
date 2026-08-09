export interface PortfolioComment {
  id: number;
  authorName: string;
  content: string;
  createdAt: string;
}

export interface CreateCommentRequest {
  authorName: string;
  content: string;
}