import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function VoiceSettings() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Настройки голосового ассистента</CardTitle>
          <CardDescription>Пока только макет. Позже здесь появятся формы сохранения в конфиг.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md border p-3">
            <p className="text-sm font-medium">API ключ OpenAI</p>
            <p className="text-xs text-muted-foreground">Добавим ввод и валидацию после бэкенда.</p>
          </div>
          <div className="rounded-md border p-3">
            <p className="text-sm font-medium">Режим</p>
            <p className="text-xs text-muted-foreground">Switch между Push-to-Talk и авто-VAD.</p>
          </div>
          <div className="rounded-md border p-3">
            <p className="text-sm font-medium">Голос и язык</p>
            <p className="text-xs text-muted-foreground">Плейсхолдер выбора модели TTS.</p>
          </div>
          <Separator />
          <div className="rounded-md border p-3">
            <p className="text-sm font-medium">Логи и история</p>
            <p className="text-xs text-muted-foreground">Флажок сохранения стенограмм и путь к папке логов.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
