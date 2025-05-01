import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  getUsers() {
    // Later: Fetch from Supabase
    return [
      { id: 'user1', name: 'Alice' },
      { id: 'user2', name: 'Bob' },
      { id: 'user3', name: 'Charlie' },
    ];
  }
}
