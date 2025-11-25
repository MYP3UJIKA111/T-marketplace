import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    });
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('API Error:', error);
    
    if (error.status === 401) {
      // Неавторизован - редирект на логин
      localStorage.removeItem('authToken');
      localStorage.removeItem('currentUser');
      window.location.href = '/auth/login';
    } else if (error.status === 403) {
      // Нет прав доступа
      return throwError(() => new Error('У вас нет прав для выполнения этого действия'));
    } else if (error.status === 404) {
      // Ресурс не найден
      return throwError(() => new Error('Ресурс не найден'));
    } else if (error.status >= 500) {
      // Ошибка сервера
      return throwError(() => new Error('Внутренняя ошибка сервера. Попробуйте позже'));
    }
    
    // Общая ошибка
    const errorMessage = error.error?.message || 'Произошла неизвестная ошибка';
    return throwError(() => new Error(errorMessage));
  }

  // GET запрос
  get<T>(endpoint: string, params?: any): Observable<ApiResponse<T>> {
    const options = {
      headers: this.getHeaders(),
      params: this.createParams(params)
    };

    return this.http.get<ApiResponse<T>>(`${this.baseUrl}${endpoint}`, options)
      .pipe(catchError(this.handleError));
  }

  // POST запрос
  post<T>(endpoint: string, data: any): Observable<ApiResponse<T>> {
    return this.http.post<ApiResponse<T>>(
      `${this.baseUrl}${endpoint}`,
      data,
      { headers: this.getHeaders() }
    ).pipe(catchError(this.handleError));
  }

  // PUT запрос
  put<T>(endpoint: string, data: any): Observable<ApiResponse<T>> {
    return this.http.put<ApiResponse<T>>(
      `${this.baseUrl}${endpoint}`,
      data,
      { headers: this.getHeaders() }
    ).pipe(catchError(this.handleError));
  }

  // DELETE запрос
  delete<T>(endpoint: string): Observable<ApiResponse<T>> {
    return this.http.delete<ApiResponse<T>>(
      `${this.baseUrl}${endpoint}`,
      { headers: this.getHeaders() }
    ).pipe(catchError(this.handleError));
  }

  // PATCH запрос
  patch<T>(endpoint: string, data: any): Observable<ApiResponse<T>> {
    return this.http.patch<ApiResponse<T>>(
      `${this.baseUrl}${endpoint}`,
      data,
      { headers: this.getHeaders() }
    ).pipe(catchError(this.handleError));
  }

  // Создание HttpParams из объекта
  private createParams(params: any): HttpParams {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        const value = params[key];
        if (value !== null && value !== undefined && value !== '') {
          httpParams = httpParams.append(key, value.toString());
        }
      });
    }
    return httpParams;
  }

  // Метод для загрузки файлов
  uploadFile<T>(endpoint: string, file: File): Observable<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);

    const headers = new HttpHeaders();
    const token = localStorage.getItem('authToken');
    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }

    return this.http.post<ApiResponse<T>>(
      `${this.baseUrl}${endpoint}`,
      formData,
      { headers }
    ).pipe(catchError(this.handleError));
  }
}