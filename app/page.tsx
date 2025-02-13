import HabitList from "@/components/HabitList";


export default function Home() {
  const today = new Date();
  const format1: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'short', day: 'numeric', weekday: 'short'}
  const format2: Intl.DateTimeFormatOptions = {year: 'numeric', month: '2-digit', day: '2-digit'}
  

  return (
    <div>
      <header className="flex justify-between">
        <div>←昨日</div>
        <h1 className="text-center text-2xl font-bold text-gray-500">{today.toLocaleDateString('ja-JP', format1).replaceAll('/', '-')}</h1>
        <div>翌日→</div>
      </header>
      <HabitList />
    </div>
  );
}
