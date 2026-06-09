"use client";
import React from "react";
import { useDashboard, Aluno } from "../../hooks/useDashboard";

export default function Page() {
  const { alunos, loading, error, refetch } = useDashboard();

  return (
    <main style={{ color: 'black' }}>
      <h1>Exemplo: `useDashboard`</h1>

      <p>Contagem: {alunos.length}</p>

      <div>
        <button onClick={() => refetch()} disabled={loading}>
          {loading ? "Recarregando..." : "Recarregar"}
        </button>
      </div>

      {loading && <p>Carregando dados...</p>}
      {error ? <p>Erro: {String(error)}</p> : null}

      {alunos.length === 0 ? (
        !loading && <p>Nenhum aluno encontrado.</p>
      ) : (
        <ul>
          {alunos.map((a: Aluno, i: number) => (
            <li key={a.id ?? i}>{a.name ?? JSON.stringify(a)} </li>
          ))}
        </ul>
      )}

      <h2>Dados brutos</h2>
      <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(alunos, null, 2)}</pre>
    </main>
  );
}
