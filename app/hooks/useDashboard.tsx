"use client";
import { useState, useEffect } from "react";

export type Aluno = {
  id?: number | string;
  name?: string;
  [key: string]: unknown;
};

export function useDashboard() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown | null>(null);

  const normalizeAlunos = (data: unknown): Aluno[] => {
    if (Array.isArray(data)) return data;
    if (data && typeof data === 'object') {
      const obj = data as Record<string, unknown>;
      if (Array.isArray(obj.data)) return obj.data as Aluno[];
      if (Array.isArray(obj.permissions)) return obj.permissions as Aluno[];
      return [obj as Aluno];
    }
    return [];
  };

  useEffect(() => {
    let mounted = true;

    const fetchPermissions = async () => {
      setLoading(true);
      setError(null);
      try {
        const r = await fetch('http://localhost:3001/api/permissions');
        const data = await r.json();
        if (!mounted) return;
        setAlunos(normalizeAlunos(data));
      } catch (err) {
        if (!mounted) return;
        setError(err);
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };

    fetchPermissions();

    return () => {
      mounted = false;
    };
  }, []);

  // refetch function to allow manual reloads from components
  const refetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const r = await fetch('http://localhost:3001/api/permissions');
      const data = await r.json();
      setAlunos(normalizeAlunos(data));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { alunos, loading, error, refetch };
}

export default useDashboard;