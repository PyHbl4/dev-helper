import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const MOCK_SESSIONS = [
  { id: "sess-01", title: "Звонок в поддержку", date: "2024-12-01", duration: "05:12" },
  { id: "sess-02", title: "Демо ассистента", date: "2024-12-03", duration: "02:45" },
  { id: "sess-03", title: "Тест VAD", date: "2024-12-10", duration: "08:10" },
];

export function VoiceHistory() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>История голосовых сессий</CardTitle>
          <CardDescription>Пока отображаем моковые записи. Позже сюда переедут реальные логи.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {MOCK_SESSIONS.map((session, index) => (
            <div key={session.id} className="rounded-md border p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{session.title}</p>
                  <p className="text-xs text-muted-foreground">ID: {session.id}</p>
                </div>
                <p className="text-xs text-muted-foreground">{session.date}</p>
              </div>
              <Separator className="my-2" />
              <div className="flex items-center justify-between text-sm">
                <span>Длительность</span>
                <span className="text-muted-foreground">{session.duration}</span>
              </div>
              {index < MOCK_SESSIONS.length - 1 ? <Separator className="mt-3" /> : null}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
