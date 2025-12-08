import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function VoiceNew({ navigate }: { navigate?: (path: string) => void }) {
  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="space-y-4 lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>Новый голосовой чат</CardTitle>
            <CardDescription>Выберите устройства, режим и запустите первую сессию.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between rounded-md border p-3">
              <div>
                <p className="text-sm font-medium">Входящее устройство</p>
                <p className="text-xs text-muted-foreground">Микрофон или loopback, выбор добавим позже.</p>
              </div>
              <Button variant="outline" size="sm">
                Настроить
              </Button>
            </div>
            <div className="flex items-center justify-between rounded-md border p-3">
              <div>
                <p className="text-sm font-medium">Исходящее устройство</p>
                <p className="text-xs text-muted-foreground">Виртуальный микрофон для звонков.</p>
              </div>
              <Button variant="outline" size="sm">
                Настроить
              </Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between gap-3 rounded-md bg-muted/50 p-3">
              <div>
                <p className="text-sm font-medium">Push-to-Talk</p>
                <p className="text-xs text-muted-foreground">Зажмите кнопку, чтобы имитировать отправку аудио.</p>
              </div>
              <Button size="sm">Зажать</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Лента сообщений</CardTitle>
            <CardDescription>Пока здесь простая заглушка истории диалога.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {["Привет! Чем помочь?", "Запланировать интеграцию аудио?"]
              .map((text, idx) => (
                <div key={text} className="rounded-md border p-3">
                  <p className="text-xs text-muted-foreground">Сообщение {idx + 1}</p>
                  <p className="text-sm">{text}</p>
                </div>
              ))}
            <div className="flex gap-2">
              <Button className="flex-1">Симулировать ответ</Button>
              <Button variant="outline" onClick={() => navigate?.("/voice/history")}>
                Перейти к истории
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4 lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Индикаторы</CardTitle>
            <CardDescription>Заглушка уровня входа/выхода.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {["Вход", "Выход"].map((label) => (
              <div key={label} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>{label}</span>
                  <span className="text-xs text-muted-foreground">-20 dB</span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div className="h-2 w-1/2 rounded-full bg-primary" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Подсказка</CardTitle>
            <CardDescription>Эта секция заменит карточку подготовки аудио.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>Сюда переедут чек-лист и уведомления по виртуальному микрофону.</p>
            <p>
              Навигация уже работает через hash-пути: <code className="font-mono text-xs">#/voice/new</code>,
              <code className="font-mono text-xs">#/voice/history</code> и
              <code className="font-mono text-xs">#/voice/settings</code>.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
