import BottomNav from "./BottomNav";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen pb-20">
      <main className="max-w-md mx-auto px-4 py-6">{children}</main>
      <BottomNav />
    </div>
  );
}