import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function greet() {
    setIsSaving(true);
    try {
      setGreetMsg(await invoke("greet", { name }));
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b">
        <div className="container flex items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-3">
            <img src="/tauri.svg" alt="Tauri" className="h-8 w-8" />
            <div>
              <p className="text-xs uppercase text-muted-foreground">Dev Helper</p>
              <p className="text-base font-semibold">Tauri + React + Tailwind</p>
            </div>
          </div>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Ресурсы</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3 h-full">
                      <Card className="h-full bg-gradient-to-br from-primary/15 to-primary/5">
                        <CardHeader>
                          <CardTitle>Готово к работе</CardTitle>
                          <CardDescription>Настроенный стек Vite + Tauri на Tailwind v4.</CardDescription>
                        </CardHeader>
                      </Card>
                    </li>
                    <li>
                      <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "justify-start gap-2")} href="https://tauri.app">
                        Документация Tauri
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "justify-start gap-2")} href="https://ui.shadcn.com">
                        Компоненты shadcn/ui
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "justify-start gap-2")} href="https://tailwindcss.com/docs">
                        Руководство Tailwind
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary">Справка</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Shadcn/ui готов</DialogTitle>
                <DialogDescription>Базовые UI-компоненты на Tailwind v4 подключены и готовы к использованию в окне Tauri.</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogPrimitiveClose />
                <Button asChild>
                  <a href="https://ui.shadcn.com" target="_blank" rel="noreferrer">
                    Открыть библиотеку
                  </a>
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <main className="container flex flex-col gap-8 py-10">
        <Card>
          <CardHeader className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Приветствие через Tauri</CardTitle>
              <CardDescription>Введите имя и отправьте команду в бэкенд.</CardDescription>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Панель действий</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Быстрые ссылки</SheetTitle>
                  <SheetDescription>Полезные ресурсы для разработки.</SheetDescription>
                </SheetHeader>
                <div className="space-y-3">
                  <Button asChild className="w-full">
                    <a href="https://vite.dev" target="_blank" rel="noreferrer">
                      Сайт Vite
                    </a>
                  </Button>
                  <Button asChild className="w-full" variant="secondary">
                    <a href="https://react.dev" target="_blank" rel="noreferrer">
                      Документация React
                    </a>
                  </Button>
                  <Button asChild className="w-full" variant="ghost">
                    <a href="https://tauri.app" target="_blank" rel="noreferrer">
                      Узнать о Tauri
                    </a>
                  </Button>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button variant="secondary">Закрыть</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </CardHeader>

          <CardContent className="space-y-6">
            <form
              className="grid gap-4 sm:grid-cols-[1fr_auto]"
              onSubmit={(e) => {
                e.preventDefault();
                void greet();
              }}
            >
              <label className="space-y-2">
                <span className="text-sm font-medium">Имя</span>
                <Input
                  id="greet-input"
                  value={name}
                  onChange={(e) => setName(e.currentTarget.value)}
                  placeholder="Введите имя..."
                  required
                />
              </label>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Отправка..." : "Поздороваться"}
              </Button>
            </form>

            <Tabs defaultValue="result" className="w-full">
              <TabsList>
                <TabsTrigger value="result">Результат</TabsTrigger>
                <TabsTrigger value="tips">Подсказки</TabsTrigger>
              </TabsList>
              <TabsContent value="result">
                <CardDescription className="rounded-md border bg-muted/40 p-4">
                  {greetMsg || "Сообщение появится после вызова команды."}
                </CardDescription>
              </TabsContent>
              <TabsContent value="tips">
                <ul className="list-disc space-y-2 pl-6 text-sm text-muted-foreground">
                  <li>Tailwind v4 подключен без префикса — можно использовать утилиты напрямую.</li>
                  <li>Компоненты shadcn/ui находятся в каталоге <code>src/components/ui</code>.</li>
                  <li>Глобальные стили определены в <code>src/index.css</code>.</li>
                </ul>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function DialogPrimitiveClose() {
  return (
    <DialogClose asChild>
      <Button variant="ghost">Закрыть</Button>
    </DialogClose>
  );
}

export default App;
