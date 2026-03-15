import Link from "next/link";

export default function Home() {

  return (
    <div>

      <h1>Task Manager</h1>

      <Link href="/register">Register</Link>
      <br/>
      <Link href="/login">Login</Link>
      <br/>
      <Link href="/dashboard">Dashboard</Link>

    </div>
  );
}