import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  CreateCommentRequest,
  PortfolioComment
} from '../../models/comment.model';

import {
  ContactMessageRequest,
  ContactMessageResponse
} from '../../models/contact-message.model';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PortfolioApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getComments(): Observable<PortfolioComment[]> {
    return this.http.get<PortfolioComment[]>(
      `${this.apiUrl}/comments`
    );
  }

  createComment(
    request: CreateCommentRequest
  ): Observable<PortfolioComment> {
    return this.http.post<PortfolioComment>(
      `${this.apiUrl}/comments`,
      request
    );
  }

  sendContactMessage(
    request: ContactMessageRequest
  ): Observable<ContactMessageResponse> {
    return this.http.post<ContactMessageResponse>(
      `${this.apiUrl}/contact`,
      request
    );
  }
}