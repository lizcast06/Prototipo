// src/utils/mockDB.ts
interface User {
  id: string;
  nombre: string;
  email: string;
  password: string;
}

// "Base de datos" en memoria
let mockUsers: User[] = [];
let mockInscripciones: any[] = [];

export const mockDB = {
  // Usuarios
  users: {
    create: (user: Omit<User, 'id'>): Promise<User> => {
      const newUser = {
        ...user,
        id: Math.random().toString(36).substr(2, 9)
      };
      mockUsers.push(newUser);
      return Promise.resolve(newUser);
    },
    
    findByEmail: (email: string): Promise<User | null> => {
      const user = mockUsers.find(u => u.email === email);
      return Promise.resolve(user || null);
    },
    
    getAll: (): Promise<User[]> => {
      return Promise.resolve(mockUsers);
    }
  },

  // Inscripciones
  inscripciones: {
    create: (inscripcion: Omit<any, 'id'>): Promise<any> => {
      const newItem = {
        ...inscripcion,
        id: Math.random().toString(36).substr(2, 9),
        fecha: new Date().toISOString()
      };
      mockInscripciones.push(newItem);
      return Promise.resolve(newItem);
    },
    
    getAll: (): Promise<any[]> => {
      return Promise.resolve(mockInscripciones);
    }
  }
};